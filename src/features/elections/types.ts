export type ElectionStatus = 'upcoming' | 'open' | 'closed';

export type Candidate = {
  id: string;
  name: string;
  program: string;
  manifesto: string;
};

export type Position = {
  id: string;
  title: string;
  candidates: Candidate[];
};

export type Election = {
  id: string;
  title: string;
  description: string;
  status: ElectionStatus;
  hasVoted: boolean;
  startsAt: string;
  endsAt: string;
};

export type ElectionDetail = Election & { positions: Position[] };

export type Selections = Record<string, string>;
