import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PrimaryButton } from '@/components/primary-button';
import { ErrorView, LoadingView } from '@/components/status-views';
import { PositionSection } from '@/features/elections/components/position-section';
import { StatusBadge } from '@/features/elections/components/status-badge';
import { getVotingNotice } from '@/features/elections/election-utils';
import type { Selections } from '@/features/elections/types';
import { useElection, useSubmitVotes } from '@/features/elections/use-elections';
import { useThemeColors } from '@/hooks/use-theme-colors';

export default function BallotScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colors = useThemeColors();
  const insets = useSafeAreaInsets();
  const { data: election, isPending, isError, refetch } = useElection(id);
  const { mutate, isPending: isSubmitting } = useSubmitVotes(id);
  const [selections, setSelections] = useState<Selections>({});

  const handleSelect = useCallback((positionId: string, candidateId: string) => {
    setSelections((prev) => ({ ...prev, [positionId]: candidateId }));
  }, []);

  if (isPending) return <LoadingView />;
  if (isError) return <ErrorView onRetry={() => refetch()} />;

  const notice = getVotingNotice(election);
  const canVote = !notice;
  const isComplete = election.positions.every((position) => selections[position.id]);

  const submit = () =>
    mutate(selections, {
      onSuccess: () =>
        Alert.alert('Vote recorded', 'Thank you for voting.', [
          { text: 'Done', onPress: () => router.back() },
        ]),
      onError: (error) => Alert.alert('Could not submit', error.message),
    });

  const confirmSubmit = () =>
    Alert.alert('Submit your votes?', 'You cannot change your votes after submitting.', [
      { text: 'Review', style: 'cancel' },
      { text: 'Submit', onPress: submit },
    ]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}> 
      <ScrollView contentContainerStyle={styles.content}>
        <StatusBadge status={election.status} />
        <Text style={[styles.title, { color: colors.text }]}>{election.title}</Text>
        {notice && <Text style={[styles.notice, { color: colors.warning }]}>{notice}</Text>}

        {election.positions.map((position) => (
          <PositionSection
            key={position.id}
            position={position}
            selectedId={selections[position.id]}
            disabled={!canVote}
            onSelect={handleSelect}
          />
        ))}
      </ScrollView>

      {canVote && (
        <View
          style={[
            styles.footer,
            {
              backgroundColor: colors.background,
              borderTopColor: colors.border,
              paddingBottom: insets.bottom + 12,
            },
          ]}
        >
          <PrimaryButton
            title="Submit votes"
            onPress={confirmSubmit}
            disabled={!isComplete}
            loading={isSubmitting}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, gap: 24 },
  title: { fontSize: 24, fontWeight: '800' },
  notice: { fontSize: 14, fontWeight: '600' },
  footer: { padding: 12, borderTopWidth: StyleSheet.hairlineWidth },
});
