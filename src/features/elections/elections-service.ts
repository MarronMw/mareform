import { ELECTIONS } from './sample-data';
import type { Election, ElectionDetail, Selections } from './types';

const votedIds = new Set<string>();
const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

const withVoteState = (election: ElectionDetail): ElectionDetail => ({
  ...election,
  hasVoted: votedIds.has(election.id),
});

export async function fetchElections(): Promise<Election[]> {
  await delay();
  return ELECTIONS.map(withVoteState).map(({ positions, ...summary }) => summary);
}

export async function fetchElection(id: string): Promise<ElectionDetail> {
  await delay();
  const election = ELECTIONS.find((item) => item.id === id);
  if (!election) throw new Error('Election not found.');
  return withVoteState(election);
}

export async function submitVotes(electionId: string, selections: Selections): Promise<void> {
  await delay(800);
  const election = await fetchElection(electionId);
  if (election.status !== 'open') throw new Error('This election is not open for voting.');
  if (election.hasVoted) throw new Error('You have already voted in this election.');
  votedIds.add(electionId);
}
