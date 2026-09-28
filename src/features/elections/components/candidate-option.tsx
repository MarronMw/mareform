import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useThemeColors } from '@/hooks/use-theme-colors';

import type { Candidate } from '../types';

type Props = {
  candidate: Candidate;
  selected: boolean;
  disabled: boolean;
  onPress: () => void;
};

export function CandidateOption({ candidate, selected, disabled, onPress }: Props) {
  const colors = useThemeColors();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="radio"
      accessibilityState={{ selected, disabled }}
      style={[
        styles.option,
        { backgroundColor: colors.card, borderColor: selected ? colors.accent : colors.border },
      ]}
    >
      <View style={styles.info}>
        <Text style={[styles.name, { color: colors.text }]}>{candidate.name}</Text>
        <Text style={[styles.small, { color: colors.mutedText }]}>{candidate.program}</Text>
        <Text style={[styles.small, { color: colors.mutedText }]}>{candidate.manifesto}</Text>
      </View>
      {!disabled && (
        <Ionicons
          name={selected ? 'radio-button-on' : 'radio-button-off'}
          size={24}
          color={selected ? colors.accent : colors.tabInactive}
        />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  option: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderRadius: 14, borderWidth: 2 },
  info: { flex: 1, gap: 2 },
  name: { fontSize: 16, fontWeight: '600' },
  small: { fontSize: 13 },
});
