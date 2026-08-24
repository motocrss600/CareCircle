import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Card } from '@/components/shared/Card';
import { colors, spacing, typography } from '@/lib/theme';

export default function BabysittingSessionScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.card}>
          <Text style={styles.title}>Session Details</Text>
          <Text style={styles.text}>Session ID: {id}</Text>
          <Text style={styles.text}>Timeline, checklist, and real-time updates coming in Phase 5</Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgLight },
  content: { padding: spacing.lg },
  card: { marginBottom: spacing.lg },
  title: { ...typography.h2, color: colors.text, marginBottom: spacing.md },
  text: { ...typography.body, color: colors.textLight },
});
