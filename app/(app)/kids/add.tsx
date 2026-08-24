import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { useKids } from '@/hooks/useKids';
import { Button } from '@/components/shared/Button';
import { Input } from '@/components/shared/Input';
import { colors, spacing, typography } from '@/lib/theme';

export default function AddKidScreen() {
  const { user } = useAuth();
  const { addKid } = useKids(user?.id);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', birthdate: '', allergies: '', medical_notes: '' });

  const handleAddKid = async () => {
    if (!form.name || !form.birthdate) {
      Alert.alert('Error', 'Name and birthdate are required');
      return;
    }
    try {
      setLoading(true);
      await addKid({ parent_id: user!.id, name: form.name, birthdate: form.birthdate, allergies: form.allergies || null, medical_notes: form.medical_notes || null });
      Alert.alert('Success', 'Kid added successfully');
      router.back();
    } catch (error) {
      Alert.alert('Error', 'Failed to add kid');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Add a Kid</Text>
        <Input label="Name *" placeholder="e.g., Emma" value={form.name} onChangeText={(text) => setForm({ ...form, name: text })} editable={!loading} />
        <Input label="Birthdate (YYYY-MM-DD) *" placeholder="2020-01-15" value={form.birthdate} onChangeText={(text) => setForm({ ...form, birthdate: text })} editable={!loading} />
        <Input label="Allergies" placeholder="e.g., Peanuts, Dairy" value={form.allergies} onChangeText={(text) => setForm({ ...form, allergies: text })} editable={!loading} />
        <Input label="Medical Notes" placeholder="Any medical conditions or medications" value={form.medical_notes} onChangeText={(text) => setForm({ ...form, medical_notes: text })} multiline editable={!loading} />
        <Button label="Add Kid" onPress={handleAddKid} loading={loading} disabled={loading} />
        <Button label="Cancel" onPress={() => router.back()} variant="secondary" disabled={loading} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgLight },
  content: { padding: spacing.lg, paddingBottom: spacing.xl },
  title: { ...typography.h2, color: colors.text, marginBottom: spacing.xl },
});
