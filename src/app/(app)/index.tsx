import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text } from 'react-native';

import { ErrorView, LoadingView } from '@/components/status-views';
import { ElectionCard } from '@/features/elections/components/election-card';
import { useElections } from '@/features/elections/use-elections';
import { useThemeColors } from '@/hooks/use-theme-colors';

export default function VoteScreen() {
  const colors = useThemeColors();
  const router = useRouter();
  const { data, isPending, isError, refetch, isRefetching } = useElections();

  const openElection = useCallback(
    (id: string) => router.push({ pathname: '/election/[id]', params: { id } }),
    [router]
  );

  if (isPending) return <LoadingView />;
  if (isError) return <ErrorView onRetry={() => refetch()} />;

  return (
    <FlatList
      data={data}
      keyExtractor={(election) => election.id}
      renderItem={({ item }) => <ElectionCard election={item} onPress={openElection} />}
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.list}
      refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={() => refetch()} />}
      ListEmptyComponent={<Text style={[styles.empty, { color: colors.mutedText }]}>No elections available yet.</Text>}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 16, gap: 12 },
  empty: { textAlign: 'center', marginTop: 48 },
});
