import {
  Event,
  Club,
  EvidenceFile,
  TimelineEvent,
  UserInterest,
} from '../types/event';

export const events: Event[] = [
  {
    id: 'evt-001',
    missionNumber: 1,
    title: 'NexaHack 2026',
    category: 'TECH',
    description:
      'A 48-hour hackathon bringing together the best minds on campus. Build innovative solutions to real-world problems using cutting-edge technology. Mentors from top tech companies will guide participating teams through ideation, development, and pitch phases.',
    date: '2026-10-04',
    time: '10:00 AM',
    venue: 'Innovation Hub, Block B',
    host: 'Cloud Stack Club',
    entryFee: 199,
    capacity: 100,
    registered: 73,
    image:
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
    tags: ['HACKATHON', 'AI', 'CODING', 'INNOVATION', 'TECH'],
    rank: 'SPECIAL_GRADE',
    popularity: 95,
    featured: true,
    trending: true,
    cursedEnergyLevel: 92,
    liveInterest: 27,
  },
  {
    id: 'evt-002',
    missionNumber: 2,
    title: 'AI & Future Systems Symposium',
    category: 'LECTURE',
    description:
      'Explore the frontiers of artificial intelligence with keynote speakers from leading research labs. Topics include generative AI, autonomous systems, neural architecture search, and the future of human-AI collaboration.',
    date: '2026-10-08',
    time: '2:00 PM',
    venue: 'Auditorium A, Main Block',
    host: 'AI Research Club',
    entryFee: 0,
    capacity: 300,
    registered: 187,
    image:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    tags: ['AI', 'RESEARCH', 'KEYNOTE', 'TECH', 'FUTURE'],
    rank: 'GRADE_1',
    popularity: 82,
    trending: true,
    cursedEnergyLevel: 78,
    liveInterest: 15,
  },
  {
    id: 'evt-003',
    missionNumber: 3,
    title: 'Battle of Bands',
    category: 'CULTURAL',
    description:
      'The ultimate showdown of campus musical talent. Bands compete across genres for the coveted title. Live audience voting, professional sound engineering, and a legendary after-party await.',
    date: '2026-10-12',
    time: '6:00 PM',
    venue: 'Open Air Theatre',
    host: 'Music Society',
    entryFee: 149,
    capacity: 500,
    registered: 342,
    image:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
    tags: ['MUSIC', 'BANDS', 'LIVE', 'CULTURAL', 'PERFORMANCE'],
    rank: 'GRADE_2',
    popularity: 78,
    trending: true,
    cursedEnergyLevel: 71,
    liveInterest: 19,
  },
  {
    id: 'evt-004',
    missionNumber: 4,
    title: 'Inter-Department Basketball Championship',
    category: 'SPORTS',
    description:
      'The annual inter-department basketball championship returns with fierce competition. Eight departments battle it out on the court in a knockout-style tournament over three days.',
    date: '2026-10-15',
    time: '9:00 AM',
    venue: 'Sports Complex, Court 1',
    host: 'Sports Council',
    entryFee: 50,
    capacity: 200,
    registered: 156,
    image:
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80',
    tags: ['BASKETBALL', 'SPORTS', 'TOURNAMENT', 'INTER-DEPT'],
    rank: 'GRADE_2',
    popularity: 72,
  },
  {
    id: 'evt-005',
    missionNumber: 5,
    title: 'Valorant Campus Clash',
    category: 'E-SPORTS',
    description:
      'Competitive Valorant tournament with teams of 5 battling across multiple rounds. Professional casting, live streaming, and prizes for top 3 teams. Bring your A-game to this high-stakes e-sports event.',
    date: '2026-10-18',
    time: '11:00 AM',
    venue: 'E-Sports Arena, Tech Block',
    host: 'Gaming Guild',
    entryFee: 99,
    capacity: 80,
    registered: 64,
    image:
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
    tags: ['VALORANT', 'GAMING', 'E-SPORTS', 'COMPETITIVE', 'FPS'],
    rank: 'GRADE_1',
    popularity: 88,
    trending: true,
    cursedEnergyLevel: 85,
    liveInterest: 22,
  },
  {
    id: 'evt-006',
    missionNumber: 6,
    title: 'UI/UX Design Workshop',
    category: 'WORKSHOP',
    description:
      'Hands-on workshop covering modern UI/UX design principles, Figma prototyping, user research methods, and design systems. Perfect for beginners and intermediate designers looking to level up their skills.',
    date: '2026-10-20',
    time: '10:30 AM',
    venue: 'Design Lab, Block C',
    host: 'Design Club',
    entryFee: 79,
    capacity: 40,
    registered: 28,
    image:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    tags: ['DESIGN', 'UI', 'UX', 'FIGMA', 'WORKSHOP'],
    rank: 'GRADE_3',
    popularity: 65,
  },
  {
    id: 'evt-007',
    missionNumber: 7,
    title: 'Cloud Computing Masterclass',
    category: 'TECH',
    description:
      'Deep dive into cloud infrastructure, containerization, and serverless architecture. Featuring hands-on labs with AWS and GCP, this masterclass is ideal for aspiring cloud engineers and DevOps practitioners.',
    date: '2026-10-22',
    time: '1:00 PM',
    venue: 'Smart Classroom 301, Block A',
    host: 'Cloud Stack Club',
    entryFee: 129,
    capacity: 60,
    registered: 45,
    image:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    tags: ['CLOUD', 'AWS', 'DEVOPS', 'TECH', 'INFRASTRUCTURE'],
    rank: 'GRADE_1',
    popularity: 76,
  },
  {
    id: 'evt-008',
    missionNumber: 8,
    title: 'Theatre Auditions — Annual Play',
    category: 'CULTURAL',
    description:
      'Open auditions for the annual campus theatre production. All roles available — actors, stage managers, lighting crew, and sound technicians welcome. No prior experience required, just passion and commitment.',
    date: '2026-10-25',
    time: '4:00 PM',
    venue: 'Drama Hall, Arts Block',
    host: 'Drama Society',
    entryFee: 0,
    capacity: 120,
    registered: 67,
    image:
      'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800&q=80',
    tags: ['THEATRE', 'ACTING', 'DRAMA', 'CULTURAL', 'AUDITION'],
    rank: 'GRADE_3',
    popularity: 58,
  },
  {
    id: 'evt-009',
    missionNumber: 9,
    title: 'Student Club Recruitment Drive',
    category: 'CLUB',
    description:
      'All campus clubs open their doors for new member recruitment. Explore 18+ clubs across tech, cultural, sports, and special interest categories. Find your tribe and start your campus journey.',
    date: '2026-10-28',
    time: '10:00 AM',
    venue: 'Central Lawn & Corridors',
    host: 'Student Council',
    entryFee: 0,
    capacity: 1000,
    registered: 423,
    image:
      'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80',
    tags: ['CLUBS', 'RECRUITMENT', 'COMMUNITY', 'CAMPUS', 'NETWORKING'],
    rank: 'GRADE_3',
    popularity: 70,
  },
  {
    id: 'evt-010',
    missionNumber: 10,
    title: 'Industry AMA — Tech Leaders Panel',
    category: 'LECTURE',
    description:
      'Ask Me Anything session with senior engineers and product managers from Google, Microsoft, and Amazon. Get candid insights about industry trends, career paths, interview preparation, and life in big tech.',
    date: '2026-11-01',
    time: '3:00 PM',
    venue: 'Conference Hall, Admin Block',
    host: 'Placement Cell',
    entryFee: 0,
    capacity: 250,
    registered: 198,
    image:
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80',
    tags: ['INDUSTRY', 'AMA', 'CAREER', 'TECH', 'PANEL'],
    rank: 'GRADE_1',
    popularity: 84,
  },
  {
    id: 'evt-011',
    missionNumber: 11,
    title: 'Cyber Security CTF Challenge',
    category: 'COMPETITION',
    description:
      'Capture The Flag competition testing your cybersecurity skills. Solve challenges across web exploitation, cryptography, reverse engineering, and forensics. Solo and team categories available.',
    date: '2026-11-05',
    time: '9:00 AM',
    venue: 'Cyber Lab, Block D',
    host: 'InfoSec Club',
    entryFee: 149,
    capacity: 50,
    registered: 38,
    image:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
    tags: ['CYBERSECURITY', 'CTF', 'HACKING', 'COMPETITION', 'TECH'],
    rank: 'GRADE_2',
    popularity: 74,
  },
  {
    id: 'evt-012',
    missionNumber: 12,
    title: 'Photography Walk & Exhibition',
    category: 'CULTURAL',
    description:
      'Join the Photography Club for a guided campus photo walk followed by a curated exhibition of the best shots. Theme: "Light & Shadow." Open to all skill levels with any camera or smartphone.',
    date: '2026-11-08',
    time: '7:00 AM',
    venue: 'Campus Grounds → Gallery Hall',
    host: 'Photography Club',
    entryFee: 0,
    capacity: 80,
    registered: 52,
    image:
      'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80',
    tags: ['PHOTOGRAPHY', 'ART', 'EXHIBITION', 'CULTURAL', 'CREATIVE'],
    rank: 'GRADE_4',
    popularity: 45,
  },
];

export const clubs: Club[] = [
  {
    id: 'club-001',
    name: 'Cloud Stack Club',
    specialization: 'Cloud Computing & DevOps',
    memberCount: 85,
    upcomingEvents: 3,
    description:
      'Building the next generation of cloud engineers through workshops, hackathons, and real-world projects.',
    logo: '☁️',
    color: '#4361ee',
  },
  {
    id: 'club-002',
    name: 'AI Research Club',
    specialization: 'Artificial Intelligence & ML',
    memberCount: 120,
    upcomingEvents: 2,
    description:
      'Exploring the frontiers of AI through research papers, projects, and industry collaborations.',
    logo: '🧠',
    color: '#7209b7',
  },
  {
    id: 'club-003',
    name: 'Design Club',
    specialization: 'UI/UX & Visual Design',
    memberCount: 65,
    upcomingEvents: 2,
    description:
      'Crafting beautiful interfaces and meaningful user experiences through design thinking and prototyping.',
    logo: '🎨',
    color: '#ef233c',
  },
  {
    id: 'club-004',
    name: 'Music Society',
    specialization: 'Music Performance & Production',
    memberCount: 90,
    upcomingEvents: 4,
    description:
      'Uniting musicians across genres for performances, jam sessions, and collaborative music production.',
    logo: '🎵',
    color: '#f72585',
  },
  {
    id: 'club-005',
    name: 'Drama Society',
    specialization: 'Theatre & Performing Arts',
    memberCount: 55,
    upcomingEvents: 1,
    description:
      'Bringing stories to life through theatre productions, street plays, and expressive art forms.',
    logo: '🎭',
    color: '#ff6b35',
  },
  {
    id: 'club-006',
    name: 'Sports Council',
    specialization: 'Athletics & Sports Management',
    memberCount: 150,
    upcomingEvents: 5,
    description:
      'Organizing inter-departmental tournaments, fitness programs, and campus-wide sporting events.',
    logo: '⚡',
    color: '#06d6a0',
  },
  {
    id: 'club-007',
    name: 'Gaming Guild',
    specialization: 'E-Sports & Game Development',
    memberCount: 110,
    upcomingEvents: 3,
    description:
      'Competitive gaming tournaments, game development workshops, and a thriving community of gamers.',
    logo: '🎮',
    color: '#8338ec',
  },
  {
    id: 'club-008',
    name: 'InfoSec Club',
    specialization: 'Cybersecurity & Ethical Hacking',
    memberCount: 45,
    upcomingEvents: 2,
    description:
      'Defending digital frontiers through CTF competitions, security audits, and awareness campaigns.',
    logo: '🛡️',
    color: '#00b4d8',
  },
];

export const evidenceFiles: EvidenceFile[] = [
  {
    id: 'evi-001',
    fileNumber: '001',
    type: 'POSTER',
    image: '/evidence/evidence-001.jpeg',
    title: 'Hackathon / Competition Poster — Mission Signal',
    location: 'Main Corridor / Tech Notice Board',
    date: '2026-09-28',
    status: 'VERIFIED',
    connectedEventId: 'evt-001', // NexaHack 2026
    description:
      'Competition poster recovered from campus notice board advertising the flagship hackathon mission. Visual signal confirms high-priority tech competition activity and registration call-to-action.',
  },
  {
    id: 'evi-002',
    fileNumber: '002',
    type: 'AUDITION',
    image: '/evidence/evidence-002.jpeg',
    title: 'Audition Call — Performance Signal Detected',
    location: 'Arts Block / Audition Point',
    date: '2026-09-29',
    status: 'VERIFIED',
    connectedEventId: 'evt-008', // Theatre Auditions
    description:
      'Audition notice recovered on campus. Indicates open performance trials for stage roles and crew positions. Linked to cultural mission activity under Drama Society operations.',
  },
  {
    id: 'evi-003',
    fileNumber: '003',
    type: 'BUILDING',
    image: '/evidence/evidence-003.jpeg',
    title: 'DACA Board — Department of Arts & Cultural Activities',
    location: 'DACA  / Arts & Cultural Department',
    date: '2026-09-30',
    status: 'VERIFIED',
    connectedEventId: 'evt-003', // Battle of Bands
    description:
      'Official DACA department board capture. Multiple arts and cultural activity signals detected, including performance, society, and campus cultural mission announcements.',
  },
];
export const timelineEvents: TimelineEvent[] = [
  {
    id: 'tl-001',
    eventId: 'evt-006',
    time: '10:30',
    title: 'UI/UX Design Workshop',
    category: 'WORKSHOP',
    venue: 'Design Lab, Block C',
    day: 'TODAY',
  },
  {
    id: 'tl-002',
    eventId: 'evt-002',
    time: '14:00',
    title: 'AI & Future Systems Symposium',
    category: 'LECTURE',
    venue: 'Auditorium A',
    day: 'TODAY',
  },
  {
    id: 'tl-003',
    eventId: 'evt-003',
    time: '18:00',
    title: 'Battle of Bands',
    category: 'CULTURAL',
    venue: 'Open Air Theatre',
    day: 'TODAY',
  },
  {
    id: 'tl-004',
    eventId: 'evt-001',
    time: '10:00',
    title: 'NexaHack 2026',
    category: 'TECH',
    venue: 'Innovation Hub, Block B',
    day: 'TOMORROW',
  },
  {
    id: 'tl-005',
    eventId: 'evt-005',
    time: '11:00',
    title: 'Valorant Campus Clash',
    category: 'E-SPORTS',
    venue: 'E-Sports Arena',
    day: 'TOMORROW',
  },
  {
    id: 'tl-006',
    eventId: 'evt-004',
    time: '09:00',
    title: 'Basketball Championship',
    category: 'SPORTS',
    venue: 'Sports Complex',
    day: 'THIS_WEEK',
  },
  {
    id: 'tl-007',
    eventId: 'evt-007',
    time: '13:00',
    title: 'Cloud Computing Masterclass',
    category: 'TECH',
    venue: 'Smart Classroom 301',
    day: 'THIS_WEEK',
  },
  {
    id: 'tl-008',
    eventId: 'evt-008',
    time: '16:00',
    title: 'Theatre Auditions',
    category: 'CULTURAL',
    venue: 'Drama Hall',
    day: 'THIS_WEEK',
  },
  {
    id: 'tl-009',
    eventId: 'evt-009',
    time: '10:00',
    title: 'Club Recruitment Drive',
    category: 'CLUB',
    venue: 'Central Lawn',
    day: 'NEXT_WEEK',
  },
  {
    id: 'tl-010',
    eventId: 'evt-010',
    time: '15:00',
    title: 'Industry AMA Panel',
    category: 'LECTURE',
    venue: 'Conference Hall',
    day: 'NEXT_WEEK',
  },
];

export const userInterests: UserInterest[] = [
  { id: 'int-01', label: 'AI', tag: 'AI', selected: false },
  { id: 'int-02', label: 'CODING', tag: 'CODING', selected: false },
  { id: 'int-03', label: 'DESIGN', tag: 'DESIGN', selected: false },
  { id: 'int-04', label: 'MUSIC', tag: 'MUSIC', selected: false },
  { id: 'int-05', label: 'SPORTS', tag: 'SPORTS', selected: false },
  { id: 'int-06', label: 'GAMING', tag: 'GAMING', selected: false },
  { id: 'int-07', label: 'CYBERSECURITY', tag: 'CYBERSECURITY', selected: false },
  { id: 'int-08', label: 'CULTURAL', tag: 'CULTURAL', selected: false },
];

export const getRankLabel = (rank: string): string => {
  switch (rank) {
    case 'SPECIAL_GRADE':
      return 'SPECIAL GRADE';
    case 'GRADE_1':
      return 'GRADE 1';
    case 'GRADE_2':
      return 'GRADE 2';
    case 'GRADE_3':
      return 'GRADE 3';
    case 'GRADE_4':
      return 'GRADE 4';
    default:
      return rank;
  }
};

export const getRankColor = (rank: string): string => {
  switch (rank) {
    case 'SPECIAL_GRADE':
      return '#ef233c';
    case 'GRADE_1':
      return '#7209b7';
    case 'GRADE_2':
      return '#4361ee';
    case 'GRADE_3':
      return '#06d6a0';
    case 'GRADE_4':
      return '#6c6c8a';
    default:
      return '#4361ee';
  }
};

export const getCategoryIcon = (category: string): string => {
  switch (category) {
    case 'TECH':
      return '⟐';
    case 'CULTURAL':
      return '◈';
    case 'WORKSHOP':
      return '⬡';
    case 'LECTURE':
      return '◇';
    case 'SPORTS':
      return '△';
    case 'E-SPORTS':
      return '⬢';
    case 'COMPETITION':
      return '⊕';
    case 'CLUB':
      return '○';
    default:
      return '●';
  }
};