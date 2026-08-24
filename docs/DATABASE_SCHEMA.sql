-- CareCircle Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Kids table
CREATE TABLE kids (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  birthdate DATE NOT NULL,
  allergies TEXT,
  medical_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Routines table
CREATE TABLE routines (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  kid_id UUID NOT NULL REFERENCES kids(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('meal', 'bath', 'bedtime', 'medicine', 'custom')),
  name TEXT NOT NULL,
  scheduled_time TIME NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Babysitting Sessions table
CREATE TABLE babysitting_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  kid_id UUID NOT NULL REFERENCES kids(id) ON DELETE CASCADE,
  sitter_name TEXT NOT NULL,
  parent_instructions TEXT,
  scheduled_start TIMESTAMP WITH TIME ZONE NOT NULL,
  scheduled_end TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'in_progress', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  started_at TIMESTAMP WITH TIME ZONE,
  ended_at TIMESTAMP WITH TIME ZONE
);

-- Session Activities table
CREATE TABLE session_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID NOT NULL REFERENCES babysitting_sessions(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL CHECK (activity_type IN ('ate', 'bath', 'medicine_given', 'asleep', 'awake', 'custom_note')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by TEXT NOT NULL
);

-- Session Checklists table
CREATE TABLE session_checklists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID NOT NULL REFERENCES babysitting_sessions(id) ON DELETE CASCADE,
  task_id TEXT NOT NULL,
  task_name TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE,
  completed_by TEXT
);

-- Notification Tokens table
CREATE TABLE notification_tokens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  expo_push_token TEXT NOT NULL UNIQUE,
  device_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_kids_parent_id ON kids(parent_id);
CREATE INDEX idx_routines_kid_id ON routines(kid_id);
CREATE INDEX idx_babysitting_sessions_parent_id ON babysitting_sessions(parent_id);
CREATE INDEX idx_babysitting_sessions_kid_id ON babysitting_sessions(kid_id);
CREATE INDEX idx_session_activities_session_id ON session_activities(session_id);
CREATE INDEX idx_session_checklists_session_id ON session_checklists(session_id);
CREATE INDEX idx_notification_tokens_user_id ON notification_tokens(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE kids ENABLE ROW LEVEL SECURITY;
ALTER TABLE routines ENABLE ROW LEVEL SECURITY;
ALTER TABLE babysitting_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_checklists ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_tokens ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Kids
CREATE POLICY "Users can view their own kids"
  ON kids FOR SELECT
  USING (auth.uid() = parent_id);

CREATE POLICY "Users can insert their own kids"
  ON kids FOR INSERT
  WITH CHECK (auth.uid() = parent_id);

CREATE POLICY "Users can update their own kids"
  ON kids FOR UPDATE
  USING (auth.uid() = parent_id)
  WITH CHECK (auth.uid() = parent_id);

CREATE POLICY "Users can delete their own kids"
  ON kids FOR DELETE
  USING (auth.uid() = parent_id);

-- RLS Policies for Routines
CREATE POLICY "Users can view routines for their kids"
  ON routines FOR SELECT
  USING (EXISTS (SELECT 1 FROM kids WHERE kids.id = routines.kid_id AND kids.parent_id = auth.uid()));

CREATE POLICY "Users can insert routines for their kids"
  ON routines FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM kids WHERE kids.id = routines.kid_id AND kids.parent_id = auth.uid()));

CREATE POLICY "Users can update routines for their kids"
  ON routines FOR UPDATE
  USING (EXISTS (SELECT 1 FROM kids WHERE kids.id = routines.kid_id AND kids.parent_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM kids WHERE kids.id = routines.kid_id AND kids.parent_id = auth.uid()));

CREATE POLICY "Users can delete routines for their kids"
  ON routines FOR DELETE
  USING (EXISTS (SELECT 1 FROM kids WHERE kids.id = routines.kid_id AND kids.parent_id = auth.uid()));

-- RLS Policies for Babysitting Sessions
CREATE POLICY "Users can view their own babysitting sessions"
  ON babysitting_sessions FOR SELECT
  USING (auth.uid() = parent_id);

CREATE POLICY "Users can insert their own babysitting sessions"
  ON babysitting_sessions FOR INSERT
  WITH CHECK (auth.uid() = parent_id);

CREATE POLICY "Users can update their own babysitting sessions"
  ON babysitting_sessions FOR UPDATE
  USING (auth.uid() = parent_id)
  WITH CHECK (auth.uid() = parent_id);

CREATE POLICY "Users can delete their own babysitting sessions"
  ON babysitting_sessions FOR DELETE
  USING (auth.uid() = parent_id);

-- RLS Policies for Session Activities
CREATE POLICY "Users can view activities for their sessions"
  ON session_activities FOR SELECT
  USING (EXISTS (SELECT 1 FROM babysitting_sessions WHERE babysitting_sessions.id = session_activities.session_id AND babysitting_sessions.parent_id = auth.uid()));

CREATE POLICY "Users can insert activities for their sessions"
  ON session_activities FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM babysitting_sessions WHERE babysitting_sessions.id = session_activities.session_id AND babysitting_sessions.parent_id = auth.uid()));

CREATE POLICY "Users can update activities for their sessions"
  ON session_activities FOR UPDATE
  USING (EXISTS (SELECT 1 FROM babysitting_sessions WHERE babysitting_sessions.id = session_activities.session_id AND babysitting_sessions.parent_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM babysitting_sessions WHERE babysitting_sessions.id = session_activities.session_id AND babysitting_sessions.parent_id = auth.uid()));

-- RLS Policies for Session Checklists
CREATE POLICY "Users can view checklists for their sessions"
  ON session_checklists FOR SELECT
  USING (EXISTS (SELECT 1 FROM babysitting_sessions WHERE babysitting_sessions.id = session_checklists.session_id AND babysitting_sessions.parent_id = auth.uid()));

CREATE POLICY "Users can insert checklists for their sessions"
  ON session_checklists FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM babysitting_sessions WHERE babysitting_sessions.id = session_checklists.session_id AND babysitting_sessions.parent_id = auth.uid()));

CREATE POLICY "Users can update checklists for their sessions"
  ON session_checklists FOR UPDATE
  USING (EXISTS (SELECT 1 FROM babysitting_sessions WHERE babysitting_sessions.id = session_checklists.session_id AND babysitting_sessions.parent_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM babysitting_sessions WHERE babysitting_sessions.id = session_checklists.session_id AND babysitting_sessions.parent_id = auth.uid()));

-- RLS Policies for Notification Tokens
CREATE POLICY "Users can view their own notification tokens"
  ON notification_tokens FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own notification tokens"
  ON notification_tokens FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own notification tokens"
  ON notification_tokens FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own notification tokens"
  ON notification_tokens FOR DELETE
  USING (auth.uid() = user_id);
