import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/hooks/useAuth';
import { useBabysittingNights } from '@/hooks/useBabysittingNights';
import { Button } from '@/components/shared/Button';
import { Card } from '@/components/shared/Card';
import { Badge } from '@/components/shared/Badge';
import { colors, spacing, typography } from '@/lib/theme';

export default function BabysittingScreen() {
  const { user } = useAuth();
  const { sessions, isLoading, error } = useBabysittingNights(user?.id);
  const router = useRouter();

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'default';
      case 'in_progress':
        return 'success';
      case 'completed':
        return 'warning';
      default:
        return 'default';
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {error && <Card style={[styles.card, styles.errorCard]}><Text style={styles.errorText}>{error}</Text></Card>}
        {sessions.length === 0 ? (
          <Card style={styles.card}>
            <Text style={styles.emptyText}>No babysitting nights scheduled</Text>
            <Button label="Schedule a Night" onPress={() => router.push('/babysitting/new')} size="md" />
          </Card>
        ) : (
          <FlatList data={sessions} keyExtractor={(item) => item.id} renderItem={({ item }) => (
            <TouchableOpacity onPress={() => router.push(`/babysitting/${item.id}`)}>
              <Card style={styles.sessionCard}>
                <View style={styles.sessionHeader}>
                  <Text style={styles.sitterName}>{item.sitter_name}</Text>
                  <Badge label={item.status} variant={getStatusVariant(item.status)} />
                </View>
                <Text style={styles.sessionDate}>{new Date(item.scheduled_start).toLocaleDateString()} at {new Date(item.scheduled_start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                {item.parent_instructions && <Text style={styles.instructions} numberOfLines={2}>{item.parent_instructions}</Text>}
              </Card>
            </TouchableOpacity>
          )} scrollEnabled={false} />
        )}
        <Button label="+ Schedule Night" onPress={() => router.push('/babysitting/new')} size="md" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgLight },
  content: { padding: spacing.lg, paddingBottom: spacing.xl },
  centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { marginBottom: spacing.lg },
  sessionCard: { marginBottom: spacing.md },
  sessionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  sitterName: { ...typography.h3, color: colors.text },
  sessionDate: { ...typography.small, color: colors.textLight, marginBottom: spacing.sm },
  instructions: { ...typography.small, color: colors.textLight, fontStyle: 'italic' },
  errorCard: { backgroundColor: '#FEE2E2', borderColor: colors.danger },
  errorText: { color: colors.danger, ...typography.body },
  emptyText: { ...typography.body, color: colors.textLight, textAlign: 'center', marginBottom: spacing.lg },
});
