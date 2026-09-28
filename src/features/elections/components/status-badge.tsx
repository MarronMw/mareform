import { StyleSheet, Text, View } from 'react-native';

import { useThemeColors } from '@/hooks/use-theme-colors';

import type { ElectionStatus } from '../types';

const LABELS: Record<ElectionStatus, string> = { open: 'Open', upcoming: 'Upcoming', closed: 'Closed' };

export function StatusBadge({ status }: { status: ElectionStatus }) {
  const colors = useThemeColors();
  const color = { open: colors.success, upcoming: colors.warning, closed: colors.mutedText }[status];

  return (
    <View style={[styles.badge, { backgroundColor: `${color}22` }]}> 
      <Text style={[styles.label, { color }]}>{LABELS[status]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  label: { fontSize: 12, fontWeight: '700' },
});
