import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';

import { useThemeColors } from '@/hooks/use-theme-colors';

type Props = { title: string; onPress: () => void; disabled?: boolean; loading?: boolean };

export function PrimaryButton({ title, onPress, disabled, loading }: Props) {
  const colors = useThemeColors();
  const inactive = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={inactive}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: colors.accent, opacity: inactive ? 0.5 : pressed ? 0.85 : 1 },
      ]}
    >
      {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.label}>{title}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { height: 50, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  label: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
