import type { ElectionDetail } from './types';

export const ELECTIONS: ElectionDetail[] = [
  {
    id: 'src-2026',
    title: 'SRC General Elections 2026',
    description: 'Elect the Student Representative Council for the 2026/27 academic year.',
    status: 'open',
    hasVoted: false,
    startsAt: '2026-09-25T08:00:00+02:00',
    endsAt: '2026-10-05T17:00:00+02:00',
    positions: [
      {
        id: 'president',
        title: 'President',
        candidates: [
          {
            id: 'c1',
            name: 'Chikondi Banda',
            program: 'BSc ICT',
            manifesto: 'Reliable campus Wi-Fi and a transparent SRC budget.',
          },
          {
            id: 'c2',
            name: 'Tadala Phiri',
            program: 'BBA Accounting',
            manifesto: 'Better student welfare and faster support services.',
          },
          {
            id: 'c3',
            name: 'Mphatso Kachingwe',
            program: 'BEd Sciences',
            manifesto: 'More clubs, more events, and a stronger student voice.',
          },
        ],
      },
      {
        id: 'vice-president',
        title: 'Vice President',
        candidates: [
          {
            id: 'c4',
            name: 'Yamikani Mwale',
            program: 'BSc ICT',
            manifesto: 'Improve library hours and study spaces.',
          },
          {
            id: 'c5',
            name: 'Chisomo Nyirenda',
            program: 'BBA Marketing',
            manifesto: 'Build partnerships for internships and jobs.',
          },
        ],
      },
      {
        id: 'secretary-general',
        title: 'Secretary General',
        candidates: [
          {
            id: 'c6',
            name: 'Thoko Chirwa',
            program: 'BEd Languages',
            manifesto: 'Open minutes and regular student feedback forums.',
          },
          {
            id: 'c7',
            name: 'Limbani Gondwe',
            program: 'BSc ICT',
            manifesto: 'Digitise SRC records and announcements.',
          },
        ],
      },
    ],
  },
  {
    id: 'ict-rep-2026',
    title: 'ICT Class Representative',
    description: 'Choose your class representative for the ICT department.',
    status: 'upcoming',
    hasVoted: false,
    startsAt: '2026-10-12T08:00:00+02:00',
    endsAt: '2026-10-14T17:00:00+02:00',
    positions: [
      {
        id: 'class-rep',
        title: 'Class Representative',
        candidates: [
          {
            id: 'c8',
            name: 'Kondwani Msiska',
            program: 'BSc ICT, Year 3',
            manifesto: 'Clear communication between students and lecturers.',
          },
          {
            id: 'c9',
            name: 'Grace Mtambo',
            program: 'BSc ICT, Year 3',
            manifesto: 'More lab access and practical sessions.',
          },
        ],
      },
    ],
  },
  {
    id: 'sports-2026',
    title: 'Sports Committee Elections',
    description: 'Elect the sports captain for the 2025/26 year.',
    status: 'closed',
    hasVoted: false,
    startsAt: '2026-03-10T08:00:00+02:00',
    endsAt: '2026-03-12T17:00:00+02:00',
    positions: [
      {
        id: 'sports-captain',
        title: 'Sports Captain',
        candidates: [
          {
            id: 'c10',
            name: 'Blessings Kamanga',
            program: 'BBA Accounting',
            manifesto: 'Inter-college tournaments every semester.',
          },
          {
            id: 'c11',
            name: 'Fatsani Zimba',
            program: 'BEd Sciences',
            manifesto: 'Better equipment and fair team selection.',
          },
        ],
      },
    ],
  },
];
