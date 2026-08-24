import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/shared/Button';
import { Card } from '@/components/shared/Card';
import { colors, spacing, typography } from '@/lib/theme';

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.card}>
          <Text style={styles.greeting}>Welcome, {user?.email?.split('@')[0]}!</Text>
          <Text style={styles.subtitle}>Manage your babysitting coordination here.</Text>
        </Card>
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Getting Started</Text>
          <Text style={styles.description}>1. Add your kids in the Kids tab{String.fromCharCode(10)}2. Set up their routines{String.fromCharCode(10)}3. Create a babysitting night{String.fromCharCode(10)}4. Coordinate with your sitter</Text>
        </Card>
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Quick Links</Text>
          <Button label="Go to Kids" onPress={() => {}} size="sm" variant="secondary" />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgLight },
  content: { padding: spacing.lg },
  card: { marginBottom: spacing.lg },
  greeting: { ...typography.h2, color: colors.text, marginBottom: spacing.sm },
  subtitle: { ...typography.body, color: colors.textLight },
  sectionTitle: { ...typography.h3, color: colors.text, marginBottom: spacing.md },
  description: { ...typography.body, color: colors.textLight, lineHeight: 24 },
});
