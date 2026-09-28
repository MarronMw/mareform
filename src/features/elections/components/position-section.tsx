import { StyleSheet, Text, View } from 'react-native';

import { useThemeColors } from '@/hooks/use-theme-colors';

import type { Position } from '../types';
import { CandidateOption } from './candidate-option';

type Props = {
  position: Position;
  selectedId: string | undefined;
  disabled: boolean;
  onSelect: (positionId: string, candidateId: string) => void;
};

export function PositionSection({ position, selectedId, disabled, onSelect }: Props) {
  const colors = useThemeColors();

  return (
    <View style={styles.section}>
      <Text style={[styles.title, { color: colors.text }]}>{position.title}</Text>
      {position.candidates.map((candidate) => (
        <CandidateOption
          key={candidate.id}
          candidate={candidate}
          selected={candidate.id === selectedId}
          disabled={disabled}
          onPress={() => onSelect(position.id, candidate.id)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: 10 },
  title: { fontSize: 20, fontWeight: '700' },
});
