# CareCircle Setup Instructions

## Prerequisites
- Node.js 18+
- Expo CLI (`npm install -g expo-cli`)
- Supabase account (free at https://supabase.com)
- Mobile device or emulator for testing

## Step 1: Clone & Install

```bash
# Clone the repository
git clone https://github.com/motocrss600/CareCircle.git
cd CareCircle

# Check out the initial setup branch
git checkout setup/initial-project

# Install dependencies
npm install
```

## Step 2: Configure Supabase

### 2a. Set up the Database

1. Log in to your [Supabase Dashboard](https://app.supabase.com)
2. Create a new project (or use an existing one)
3. Go to the **SQL Editor** on the left sidebar
4. Click **New Query**
5. Copy the entire contents of `docs/DATABASE_SCHEMA.sql`
6. Paste it into the SQL Editor
7. Click **Run** (this creates all tables and sets up Row Level Security)

### 2b. Create Environment Variables

1. In your Supabase project, go to **Settings → API**
2. Copy your:
   - **Project URL** (format: `https://xxxx.supabase.co`)
   - **anon public key** (long string starting with `eyJ...`)
3. In the root of your project, create `.env.local`:

```bash
EXPO_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE
```

4. **Never commit `.env.local` to Git** (it's in `.gitignore`)

## Step 3: Run the App

```bash
# Start the Expo development server
npm start

# For iOS (macOS only)
npm run ios

# For Android
npm run android

# For Web
npm run web
```

Or scan the QR code with the **Expo Go** app on your phone.

## Step 4: Test the App

### Create a Test Account
1. Sign up with any email (e.g., `test@example.com`)
2. Check your email for verification (or just sign in if already verified)
3. You're logged in!

### Add a Kid
1. Navigate to the **Kids** tab
2. Click **+ Add Kid**
3. Fill in:
   - Name: `Emma`
   - Birthdate: `2020-01-15`
   - Allergies: `Peanuts` (optional)
   - Medical Notes: Any notes (optional)
4. Click **Add Kid**

### Schedule a Babysitting Night (coming soon)
1. Navigate to the **Babysitting** tab
2. Click **+ Schedule Night**
3. Full implementation in Phase 4

## Project Structure

```
CareCircle/
├── app/                      # Expo Router app structure
│   ├── (auth)/              # Auth screens (login/signup)
│   └── (app)/               # Main app screens
│       ├── index.tsx        # Home screen
│       ├── kids/            # Kids management
│       └── babysitting/     # Babysitting coordination
├── components/
│   └── shared/              # Reusable UI components
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Card.tsx
│       └── Badge.tsx
├── hooks/                    # Custom React hooks
│   ├── useAuth.ts           # Authentication logic
│   ├── useKids.ts           # Kids data management
│   └── useBabysittingNights.ts
├── lib/
│   ├── supabase.ts          # Supabase client
│   ├── theme.ts             # Colors, spacing, typography
│   ├── types.ts             # TypeScript types
│   └── database.types.ts    # Supabase auto-generated types
├── package.json
├── tsconfig.json
└── .env.example
```

## Key Features Implemented (Phase 1)

✅ **Authentication**
- Sign up with email/password
- Sign in to existing account
- Automatic logout
- Auth state persistence

✅ **Kids Management**
- Add kids with birthdate, allergies, medical notes
- View list of kids
- RLS policies ensure parents only see their own kids

✅ **UI Components**
- Reusable Button, Input, Card, Badge components
- Consistent theme and color scheme
- Error handling and loading states

## Coming in Future Phases

**Phase 2:** Routines & Schedules
- Create routine templates (meal, bath, bedtime, medicine)
- Set scheduled times for routines
- View routines per kid

**Phase 3:** Babysitting Session Setup
- Create babysitting sessions
- Invite sitters by email
- Share parent instructions with sitters

**Phase 4:** Real-time Coordination
- Timeline of activities during session
- Session checklist (meal given, bath done, etc.)
- Sitter updates in real-time

**Phase 5:** Notifications & History
- Push notifications to parents
- Session history and activity logs
- Parent feedback and ratings

## Troubleshooting

### "Cannot find module '@supabase/supabase-js'"
```bash
npm install
```

### "EXPO_PUBLIC_SUPABASE_URL is not set"
- Check that `.env.local` exists in the root directory
- Verify the env variables match exactly (case-sensitive)
- Restart the Expo server

### "User not found" when signing in
- Sign up first if you haven't already
- Check that your email verification is complete

### Database query errors
- Verify RLS policies are enabled (check `docs/DATABASE_SCHEMA.sql`)
- Ensure you ran the full SQL schema
- Check that your user is authenticated

## Development Tips

1. **Hot Reload:** Save any file and the app reloads automatically
2. **Debug:** Open the Expo Go app menu and enable "Fast Refresh"
3. **TypeScript:** Run `npm run type-check` to catch errors
4. **Testing:** Test on real device or emulator frequently

## Next Steps

1. Customize the app colors and theme in `lib/theme.ts`
2. Add your app logo to `assets/icon.png` and `assets/splash.png`
3. Update `app.json` with your app name and details
4. Start Phase 2 implementation (routines)

## Support

- Expo docs: https://docs.expo.dev
- Supabase docs: https://supabase.com/docs
- React Native docs: https://reactnative.dev

## License

MIT
