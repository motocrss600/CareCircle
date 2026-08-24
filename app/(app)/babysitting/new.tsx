import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@/components/shared/Button';
import { Card } from '@/components/shared/Card';
import { colors, spacing, typography } from '@/lib/theme';

export default function NewBabysittingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.card}>
          <Text style={styles.title}>Schedule Babysitting Night</Text>
          <Text style={styles.text}>Full integration coming in Phase 4</Text>
        </Card>
        <Button label="Back" onPress={() => router.back()} variant="secondary" />
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
