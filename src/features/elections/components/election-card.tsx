import { Ionicons } from '@expo/vector-icons';
import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useThemeColors } from '@/hooks/use-theme-colors';

import { getStatusLine } from '../election-utils';
import type { Election } from '../types';
import { StatusBadge } from './status-badge';

type Props = { election: Election; onPress: (id: string) => void };

export const ElectionCard = memo(function ElectionCard({ election, onPress }: Props) {
  const colors = useThemeColors();

  return (
    <Pressable
      onPress={() => onPress(election.id)}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.85 : 1 },
      ]}
    >
      <View style={styles.header}>
        <StatusBadge status={election.status} />
        {election.hasVoted && (
          <View style={styles.voted}>
            <Ionicons name="checkmark-circle" size={18} color={colors.success} />
            <Text style={[styles.votedText, { color: colors.success }]}>Voted</Text>
          </View>
        )}
      </View>
      <Text style={[styles.title, { color: colors.text }]}>{election.title}</Text>
      <Text style={[styles.text, { color: colors.mutedText }]} numberOfLines={2}>
        {election.description}
      </Text>
      <Text style={[styles.text, { color: colors.mutedText }]}>{getStatusLine(election)}</Text>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  card: { padding: 16, borderRadius: 16, borderWidth: 1, gap: 8 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  voted: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  votedText: { fontSize: 13, fontWeight: '600' },
  title: { fontSize: 18, fontWeight: '700' },
  text: { fontSize: 14 },
});
