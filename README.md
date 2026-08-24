# README

# CareCircle 👶

A mobile babysitting coordination app built with Expo, React Native, and Supabase.

**CareCircle** helps parents coordinate babysitting sessions with real-time activity tracking, routine management, and secure scheduling.

## Features

✅ **Phase 1: Foundation (Complete)**
- User authentication (email/password)
- Kid profiles with allergies & medical notes
- Secure database with Row Level Security
- Beautiful, responsive UI

📋 **Phase 2-5: Coming Soon**
- Routines & schedules
- Babysitting session coordination
- Real-time activity tracking
- Session history & feedback

## Quick Start

### Prerequisites
- Node.js 18+
- Supabase account (free)
- Expo Go app (for mobile testing)

### Setup

```bash
# Clone & install
git clone https://github.com/motocrss600/CareCircle.git
cd CareCircle
git checkout setup/initial-project
npm install

# Configure Supabase
# 1. Create .env.local with your Supabase credentials
# 2. Run docs/DATABASE_SCHEMA.sql in Supabase SQL Editor

# Start the app
npm start
```

**Full setup instructions:** See `docs/SETUP.md`

## Project Structure

```
app/                   # Screens & routing (Expo Router)
components/           # Reusable UI components
hooks/                # Custom React hooks
lib/                  # Utilities (theme, types, Supabase client)
docs/                 # Documentation
```

## Tech Stack

- **Frontend:** Expo, React Native, TypeScript
- **Backend:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Navigation:** Expo Router, React Navigation

## Roadmap

| Phase | Focus | Status |
|-------|-------|--------|
| 1 | Foundation | ✅ |
| 2 | Routines | 📋 |
| 3 | Sessions | ⏳ |
| 4 | Real-time | ⏳ |
| 5 | History | ⏳ |

See `docs/ROADMAP.md` for details.

## Contributing

We welcome contributions! See `docs/CONTRIBUTING.md`

## License

MIT

## Support

- Issues: [GitHub Issues](https://github.com/motocrss600/CareCircle/issues)
- Docs: `docs/` folder
- Email: Your contact info
