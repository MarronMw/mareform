import type { Election, ElectionStatus } from './types';

const STATUS_ORDER: Record<ElectionStatus, number> = { open: 0, upcoming: 1, closed: 2 };

export const sortElections = (elections: Election[]) =>
  [...elections].sort((a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status]);

const formatDateTime = (iso: string) =>
  new Date(iso).toLocaleString(undefined, {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });

export function getStatusLine({ status, startsAt, endsAt }: Pick<Election, 'status' | 'startsAt' | 'endsAt'>) {
  switch (status) {
    case 'open':
      return `Closes ${formatDateTime(endsAt)}`;
    case 'upcoming':
      return `Opens ${formatDateTime(startsAt)}`;
    case 'closed':
      return `Closed ${formatDateTime(endsAt)}`;
  }
}

export function getVotingNotice({ status, hasVoted }: Pick<Election, 'status' | 'hasVoted'>) {
  if (hasVoted) return 'You have already voted in this election.';
  if (status === 'upcoming') return 'Voting has not opened yet.';
  if (status === 'closed') return 'Voting has closed.';
  return null;
}
