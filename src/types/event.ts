export type EventCategory =
  | 'TECH'
  | 'CULTURAL'
  | 'WORKSHOP'
  | 'LECTURE'
  | 'SPORTS'
  | 'E-SPORTS'
  | 'COMPETITION'
  | 'CLUB';

export type MissionRank =
  | 'GRADE_4'
  | 'GRADE_3'
  | 'GRADE_2'
  | 'GRADE_1'
  | 'SPECIAL_GRADE';

export interface Event {
  id: string;
  missionNumber: number;
  title: string;
  category: EventCategory;
  description: string;
  date: string;
  time: string;
  venue: string;
  host: string;
  entryFee: number;
  capacity: number;
  registered: number;
  image: string;
  tags: string[];
  rank: MissionRank;
  popularity: number;
  featured?: boolean;
  trending?: boolean;
  cursedEnergyLevel?: number;
  liveInterest?: number;
}

export interface Club {
  id: string;
  name: string;
  specialization: string;
  memberCount: number;
  upcomingEvents: number;
  description: string;
  logo: string;
  color: string;
}

export interface EvidenceFile {
  id: string;
  fileNumber: string;
  type: 'POSTER' | 'VENUE' | 'NOTICE_BOARD';
  image: string;
  title: string;
  location: string;
  date: string;
  status: 'VERIFIED' | 'PENDING' | 'CLASSIFIED';
  connectedEventId?: string;
  description: string;
}

export interface TimelineEvent {
  id: string;
  eventId: string;
  time: string;
  title: string;
  category: EventCategory;
  venue: string;
  day: 'TODAY' | 'TOMORROW' | 'THIS_WEEK' | 'NEXT_WEEK';
}

export interface UserInterest {
  id: string;
  label: string;
  tag: string;
  selected: boolean;
}