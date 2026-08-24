# CareCircle Project Roadmap

## Overview
CareCircle is a mobile-first babysitting coordination app built with Expo, React Native, and Supabase. The roadmap outlines features in phases, each building on previous functionality.

---

## Phase 1: Foundation ✅ (COMPLETE)
**Focus:** Core infrastructure, authentication, and basic kid management

### Features
- ✅ User authentication (sign up/sign in)
- ✅ Email-based identity
- ✅ Secure session management
- ✅ Kids profile management (name, birthdate, allergies, medical notes)
- ✅ UI component library (Button, Input, Card, Badge)
- ✅ Theme and design system
- ✅ Navigation structure (auth & app stacks)
- ✅ Database schema and Row Level Security policies

### What's Working
```
App Screens:
├── Sign In (with sign up link)
├── Sign Up (with validation)
├── Home Dashboard
├── Kids List (view, add, delete)
└── Babysitting Overview (empty state)
```

---

## Phase 2: Routines & Schedules 📋 (NEXT)
**Focus:** Setting up daily/weekly routines for kids

### Features to Build
- [ ] Create routine templates (Meal, Bath, Bedtime, Medicine, Custom)
- [ ] Set scheduled times (HH:MM format)
- [ ] Assign routines to specific kids
- [ ] View routines per kid
- [ ] Edit/delete routines
- [ ] Routine notes (dietary restrictions, preferences)

### Database Tables
- `routines` (already created)

### New Screens
- `app/(app)/kids/[id]/routines.tsx` - View kid's routines
- `app/(app)/kids/[id]/add-routine.tsx` - Add new routine

### Hooks
- `hooks/useRoutines.ts` - CRUD operations for routines

### Example Flow
```
Parent taps on "Emma" in Kids tab
→ View Emma's profile
→ Tap "Add Routine"
→ Select type (Meal)
→ Set time (6:00 PM)
→ Add notes ("Mac and cheese")
→ Routine saved and displayed on Emma's schedule
```

---

## Phase 3: Babysitting Session Setup 🎯
**Focus:** Creating sessions and inviting sitters

### Features to Build
- [ ] Create babysitting session
- [ ] Select date/time range
- [ ] Choose which kid(s)
- [ ] Add parent instructions
- [ ] Generate sitter invite link/QR code
- [ ] Sitter accepts invitation
- [ ] Pre-populate sitter info
- [ ] Session status tracking (scheduled → in_progress → completed)

### Database Tables
- `babysitting_sessions` (already created)
- `notification_tokens` (already created)

### New Screens
- `app/(app)/babysitting/new.tsx` - Create session
- `app/(app)/babysitting/[id]/instructions.tsx` - Parent instructions
- `app/(app)/babysitting/[id]/sitter-invite.tsx` - Invite sitter

### Hooks
- Already have `hooks/useBabysittingNights.ts`

### Example Flow
```
Parent taps "+ Schedule Night"
→ Select date/time (Sep 15, 6:00 PM - 11:00 PM)
→ Choose Emma
→ Add instructions ("Bedtime at 8 PM")
→ Generate invite code
→ Send link to sitter
```

---

## Phase 4: Real-time Coordination 📱
**Focus:** Live updates during babysitting session

### Features to Build
- [ ] Session timeline (HH:MM activity logs)
- [ ] Activity types (Ate, Bath, Medicine Given, Asleep, Awake, Custom Note)
- [ ] Session checklist (Dinner ✓, Bath ✓, Bedtime ✓)
- [ ] Real-time sync (Supabase subscriptions)
- [ ] Parent notifications
- [ ] Sitter app view (read-only for parents)
- [ ] Start/end session buttons

### Database Tables
- `session_activities` (already created)
- `session_checklists` (already created)

### New Screens
- `app/(app)/babysitting/[id]/live-session.tsx` - Active session view
- `app/(app)/babysitting/[id]/timeline.tsx` - Activity timeline

### Hooks
- `hooks/useSessionActivities.ts` - Activity logging
- `hooks/useSessionChecklist.ts` - Checklist management
- `hooks/useRealtimeSync.ts` - Real-time Supabase subscriptions

### Example Flow
```
Session starts (6:00 PM)
→ Sitter logs "Emma ate dinner" (6:15 PM)
→ Parent gets notification
→ Sitter checks off "Dinner" on checklist
→ Timeline shows: "6:15 PM - Ate dinner"
→ Parent can see live updates in real-time
```

---

## Phase 5: History & Analytics 📊
**Focus:** Session records, feedback, and insights

### Features to Build
- [ ] Session history (past babysitting sessions)
- [ ] Full activity logs
- [ ] Duration tracking (total time, idle time)
- [ ] Parent feedback/ratings (1-5 stars)
- [ ] Sitter notes summary
- [ ] Export session report
- [ ] Photo/video support (optional)
- [ ] Incident reporting

### New Screens
- `app/(app)/babysitting/history.tsx` - Past sessions
- `app/(app)/babysitting/[id]/report.tsx` - Session summary/feedback

### Hooks
- `hooks/useSessionHistory.ts`
- `hooks/useSessionReports.ts`

### Example Flow
```
Session ends (11:00 PM)
→ Parent views final report
→ Shows timeline: Dinner → Bath → Bedtime
→ Parent rates Sitter (⭐⭐⭐⭐⭐)
→ Session archived in history
```

---

## Phase 6: Advanced Features 🚀 (Optional)

### Sitter App
- [ ] Separate mobile app for sitters
- [ ] Accept/decline invitations
- [ ] Real-time activity logging
- [ ] Photo sharing during session
- [ ] Emergency contact button

### Analytics
- [ ] Babysitting trends (most active times)
- [ ] Cost tracking (hourly rate)
- [ ] Sitter performance metrics
- [ ] Parent spending dashboard

### Social Features
- [ ] Find nearby sitters
- [ ] Sitter reviews/ratings
- [ ] Community recommendations
- [ ] Chat with sitters

### Accessibility
- [ ] Dark mode
- [ ] Text size settings
- [ ] Voice commands
- [ ] Screen reader support

---

## Technical Debt & Improvements

### Code Quality
- [ ] Add Jest tests for hooks
- [ ] Add E2E tests with Detox
- [ ] Type all Supabase responses
- [ ] Add error boundaries

### Performance
- [ ] Lazy load screens
- [ ] Optimize image sizes
- [ ] Cache frequently accessed data
- [ ] Pagination for long lists

### DevOps
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Automated testing on PR
- [ ] EAS Build integration
- [ ] Staging vs production environments

---

## Timeline

| Phase | Focus | Est. Duration | Status |
|-------|-------|---------------|--------|
| 1 | Foundation | ✅ Complete | ✅ |
| 2 | Routines | 1-2 weeks | 📋 |
| 3 | Sessions | 2-3 weeks | ⏳ |
| 4 | Real-time | 2-3 weeks | ⏳ |
| 5 | History | 1-2 weeks | ⏳ |
| 6 | Advanced | Ongoing | 🚀 |

---

## How to Contribute

1. Pick a feature from the current phase
2. Create a branch: `git checkout -b feature/phase-2-routines`
3. Follow the code structure from Phase 1
4. Test on real device
5. Submit PR with description

## Questions?

Refer to:
- `docs/SETUP.md` - Getting started
- `docs/DATABASE_SCHEMA.sql` - Data structure
- Code comments in `hooks/` and `screens/`
