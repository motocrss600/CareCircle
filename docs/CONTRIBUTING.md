# CareCircle Contributing Guide

## Code Style

### TypeScript
- Always define types/interfaces
- Use strict mode
- Avoid `any` type

### React/React Native
- Use functional components + hooks
- Extract components over 200 lines
- Use custom hooks for logic
- Memoize expensive calculations with `useMemo`

### Naming
- Components: PascalCase (`<Button />`)
- Files: kebab-case (`use-auth.ts`) or PascalCase for components (`Button.tsx`)
- Variables/functions: camelCase (`handleSignIn`)
- Constants: UPPER_SNAKE_CASE (`DEFAULT_TIMEOUT`)

## File Structure

```
New Feature Example:

feature/user-profiles/
├── screens/
│   ├── ProfileScreen.tsx
│   └── EditProfileScreen.tsx
├── hooks/
│   └── useUserProfile.ts
└── types/
    └── profile.types.ts
```

## Git Workflow

1. Create feature branch from `setup/initial-project`:
   ```bash
   git checkout -b feature/phase-2-routines
   ```

2. Make commits with clear messages:
   ```bash
   git commit -m "feat: add routine creation screen"
   git commit -m "fix: handle timezone conversion in scheduled_time"
   ```

3. Push and create Pull Request

## Testing Checklist

Before submitting PR:
- [ ] Tested on iOS device/simulator
- [ ] Tested on Android device/emulator
- [ ] No TypeScript errors (`npm run type-check`)
- [ ] No console warnings
- [ ] Loading states work
- [ ] Error handling works
- [ ] RLS policies tested (can't access other users' data)

## Common Tasks

### Adding a New Hook

```typescript
// hooks/useMyFeature.ts
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useMyFeature(userId?: string) {
  const [data, setData] = useState<DataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch
  const fetch = async () => {
    if (!userId) return;
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('table_name')
        .select('*')
        .eq('user_id', userId);
      if (error) throw error;
      setData(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error');
    } finally {
      setIsLoading(false);
    }
  };

  // CRUD operations
  const create = async (item: DataType) => { /* ... */ };
  const update = async (id: string, updates: Partial<DataType>) => { /* ... */ };
  const delete_ = async (id: string) => { /* ... */ };

  useEffect(() => { fetch(); }, [userId]);

  return { data, isLoading, error, create, update, delete: delete_, refetch: fetch };
}
```

### Adding a New Screen

```typescript
// app/(app)/feature/index.tsx
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Button } from '@/components/shared/Button';
import { Card } from '@/components/shared/Card';
import { colors, spacing, typography } from '@/lib/theme';

export default function FeatureScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.card}>
          <Text style={styles.title}>Feature Title</Text>
        </Card>
        <Button label="Action" onPress={() => {}} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgLight },
  content: { padding: spacing.lg },
  card: { marginBottom: spacing.lg },
  title: { ...typography.h2, color: colors.text },
});
```

## Debugging

### Network Requests
```typescript
// Add to hook before query
const { data, error } = await supabase
  .from('table')
  .select('*');

if (error) {
  console.error('Supabase error:', error);
}
console.log('Data:', data);
```

### RLS Policy Issues
- Check Supabase dashboard → Authentication → Row Level Security
- Verify user is authenticated
- Test SQL directly in Supabase SQL Editor

### Performance
- Use React DevTools Profiler
- Check for unnecessary re-renders
- Memoize expensive operations

## Resources

- [Expo Router Docs](https://expo.github.io/router/)
- [Supabase JS Docs](https://supabase.com/docs/reference/javascript)
- [React Native StyleSheet](https://reactnative.dev/docs/stylesheet)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
