
import React from 'react';
import { Platform } from 'react-native';
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import { Stack } from 'expo-router';

export default function TabLayout() {
  // Use NativeTabs for iOS without any tabs
  if (Platform.OS === 'ios') {
    return (
      <NativeTabs>
      </NativeTabs>
    );
  }

  // For Android and Web, use Stack navigation without tab bar
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'none',
      }}
    >
      <Stack.Screen name="(home)" />
      <Stack.Screen name="profile" />
    </Stack>
  );
}
