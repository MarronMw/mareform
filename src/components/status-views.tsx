import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { PrimaryButton } from '@/components/primary-button';
import { useThemeColors } from '@/hooks/use-theme-colors';

export function LoadingView() {
  const colors = useThemeColors();
  return (
    <View style={[styles.center, { backgroundColor: colors.background }]}> 
      <ActivityIndicator size="large" color={colors.accent} />
    </View>
  );
}

export function ErrorView({ onRetry }: { onRetry: () => void }) {
  const colors = useThemeColors();
  return (
    <View style={[styles.center, { backgroundColor: colors.background }]}> 
      <Text style={[styles.message, { color: colors.text }]}>Something went wrong.</Text>
      <View style={styles.button}>
        <PrimaryButton title="Try again" onPress={onRetry} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 16 },
  message: { fontSize: 16 },
  button: { width: 160 },
});
