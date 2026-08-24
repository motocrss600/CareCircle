import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/hooks/useAuth';
import { useKids } from '@/hooks/useKids';
import { Button } from '@/components/shared/Button';
import { Card } from '@/components/shared/Card';
import { colors, spacing, typography } from '@/lib/theme';

export default function KidsScreen() {
  const { user } = useAuth();
  const { kids, isLoading, error } = useKids(user?.id);
  const router = useRouter();

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
        {kids.length === 0 ? (
          <Card style={styles.card}>
            <Text style={styles.emptyText}>No kids added yet</Text>
            <Button label="Add Your First Kid" onPress={() => router.push('/kids/add')} size="md" />
          </Card>
        ) : (
          <FlatList data={kids} keyExtractor={(item) => item.id} renderItem={({ item }) => (
            <TouchableOpacity onPress={() => router.push(`/kids/${item.id}`)}>
              <Card style={styles.kidCard}>
                <View style={styles.kidHeader}>
                  <Text style={styles.kidName}>{item.name}</Text>
                  <Ionicons name="chevron-forward" size={20} color={colors.textLight} />
                </View>
                <Text style={styles.kidDetails}>DOB: {new Date(item.birthdate).toLocaleDateString()}</Text>
                {item.allergies && <Text style={styles.kidDetails}>Allergies: {item.allergies}</Text>}
              </Card>
            </TouchableOpacity>
          )} scrollEnabled={false} />
        )}
        <Button label="+ Add Kid" onPress={() => router.push('/kids/add')} size="md" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgLight },
  content: { padding: spacing.lg, paddingBottom: spacing.xl },
  centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { marginBottom: spacing.lg },
  kidCard: { marginBottom: spacing.md },
  kidHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  kidName: { ...typography.h3, color: colors.text },
  kidDetails: { ...typography.small, color: colors.textLight, marginBottom: spacing.xs },
  errorCard: { backgroundColor: '#FEE2E2', borderColor: colors.danger },
  errorText: { color: colors.danger, ...typography.body },
  emptyText: { ...typography.body, color: colors.textLight, textAlign: 'center', marginBottom: spacing.lg },
});
