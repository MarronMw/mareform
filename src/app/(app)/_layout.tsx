import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { type ComponentProps } from 'react';

import { useThemeColors } from '@/hooks/use-theme-colors';

type IconName = ComponentProps<typeof Ionicons>['name'];
type TabIconProps = { color: any; size: number; focused: boolean };

const tabIcon =
  (active: IconName, inactive: IconName) =>
  ({ color, size, focused }: TabIconProps) => (
    <Ionicons name={focused ? active : inactive} size={size} color={color ?? '#000000'} />
  );

export default function AppTabsLayout() {
  const colors = useThemeColors();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.tabInactive,
        tabBarStyle: { backgroundColor: colors.background, borderTopColor: colors.border },
        headerStyle: { backgroundColor: colors.background },
        headerTitleStyle: { color: colors.text },
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'Vote', tabBarIcon: tabIcon('checkbox', 'checkbox-outline') }}
      />
      <Tabs.Screen
        name="results"
        options={{ title: 'Results', tabBarIcon: tabIcon('stats-chart', 'stats-chart-outline') }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: 'Profile', tabBarIcon: tabIcon('person', 'person-outline') }}
      />
    </Tabs>
  );
}
