import React from 'react';
import { useRouter } from 'expo-router';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import { colors } from '@/lib/theme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function AppLayout() {
  const { signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      router.replace('/(auth)/sign-in');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <Tab.Navigator screenOptions={{ headerStyle: { backgroundColor: colors.primary }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: '600' }, tabBarActiveTintColor: colors.primary, tabBarInactiveTintColor: colors.textLight, tabBarStyle: { borderTopColor: colors.border, borderTopWidth: 1 } }}>
      <Tab.Screen name="index" options={{ title: 'Home', tabBarLabel: 'Home', tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />, headerRight: () => <TouchableOpacity onPress={handleLogout} style={{ marginRight: 16 }}><Ionicons name="log-out" size={24} color="white" /></TouchableOpacity> }} />
      <Tab.Screen name="kids" options={{ title: 'Kids', tabBarLabel: 'Kids', tabBarIcon: ({ color }) => <Ionicons name="people" size={24} color={color} /> }} />
      <Tab.Screen name="babysitting" options={{ title: 'Babysitting', tabBarLabel: 'Babysitting', tabBarIcon: ({ color }) => <Ionicons name="calendar" size={24} color={color} /> }} />
    </Tab.Navigator>
  );
}
