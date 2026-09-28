import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { sortElections } from './election-utils';
import { fetchElection, fetchElections, submitVotes } from './elections-service';
import type { Selections } from './types';

export const electionKeys = {
  all: ['elections'] as const,
  detail: (id: string) => ['elections', id] as const,
};

export const useElections = () =>
  useQuery({
    queryKey: electionKeys.all,
    queryFn: fetchElections,
    select: sortElections,
  });

export const useElection = (id: string) =>
  useQuery({
    queryKey: electionKeys.detail(id),
    queryFn: () => fetchElection(id),
  });

export function useSubmitVotes(electionId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (selections: Selections) => submitVotes(electionId, selections),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: electionKeys.all }),
  });
}
