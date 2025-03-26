
// Types
export type Player = {
  id: string;
  name: string;
  team: string;
  teamId: string;
  role: 'Batsman' | 'Bowler' | 'All-rounder' | 'Wicket-keeper';
  battingStyle: string;
  bowlingStyle: string;
  country: string;
  age: number;
  matches: number;
  runs: number;
  wickets: number;
  highestScore: number;
  bestBowling: string;
  image: string;
};

export type Team = {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  captain: string;
  matches: number;
  won: number;
  lost: number;
  tied: number;
  points: number;
  netRunRate: number;
};

export type Match = {
  id: string;
  team1: string;
  team1Id: string;
  team2: string;
  team2Id: string;
  date: string;
  time: string;
  venue: string;
  status: 'Upcoming' | 'Live' | 'Completed';
  result?: string;
  team1Score?: {
    runs: number;
    wickets: number;
    overs: number;
  };
  team2Score?: {
    runs: number;
    wickets: number;
    overs: number;
  };
};

export type Gallery = {
  id: string;
  title: string;
  image: string;
  date: string;
  matchId?: string;
};

// Mock Data
export const teams: Team[] = [
  {
    id: "t1",
    name: "Multai Mavericks",
    shortName: "MM",
    logo: "/placeholder.svg",
    primaryColor: "#0ea5e9",
    secondaryColor: "#0c4a6e",
    captain: "Rohit Sharma",
    matches: 10,
    won: 7,
    lost: 2,
    tied: 1,
    points: 15,
    netRunRate: 0.975,
  },
  {
    id: "t2",
    name: "Betul Blasters",
    shortName: "BB",
    logo: "/placeholder.svg",
    primaryColor: "#f59e0b",
    secondaryColor: "#92400e",
    captain: "Virat Kohli",
    matches: 10,
    won: 8,
    lost: 2,
    tied: 0,
    points: 16,
    netRunRate: 1.234,
  },
  {
    id: "t3",
    name: "Chhindwara Champions",
    shortName: "CC",
    logo: "/placeholder.svg",
    primaryColor: "#10b981",
    secondaryColor: "#064e3b",
    captain: "MS Dhoni",
    matches: 10,
    won: 5,
    lost: 4,
    tied: 1,
    points: 11,
    netRunRate: 0.456,
  },
  {
    id: "t4",
    name: "Bhopal Warriors",
    shortName: "BW",
    logo: "/placeholder.svg",
    primaryColor: "#6366f1",
    secondaryColor: "#312e81",
    captain: "KL Rahul",
    matches: 10,
    won: 4,
    lost: 5,
    tied: 1,
    points: 9,
    netRunRate: -0.125,
  },
  {
    id: "t5",
    name: "Indore Titans",
    shortName: "IT",
    logo: "/placeholder.svg",
    primaryColor: "#ec4899",
    secondaryColor: "#831843",
    captain: "Hardik Pandya",
    matches: 10,
    won: 3,
    lost: 7,
    tied: 0,
    points: 6,
    netRunRate: -0.875,
  },
  {
    id: "t6",
    name: "Jabalpur Royals",
    shortName: "JR",
    logo: "/placeholder.svg",
    primaryColor: "#8b5cf6",
    secondaryColor: "#4c1d95",
    captain: "Ravindra Jadeja",
    matches: 10,
    won: 3,
    lost: 6,
    tied: 1,
    points: 7,
    netRunRate: -0.654,
  },
];

export const players: Player[] = [
  {
    id: "p1",
    name: "Rohit Sharma",
    team: "Multai Mavericks",
    teamId: "t1",
    role: "Batsman",
    battingStyle: "Right-handed",
    bowlingStyle: "Right-arm off break",
    country: "India",
    age: 34,
    matches: 10,
    runs: 450,
    wickets: 0,
    highestScore: 87,
    bestBowling: "0/0",
    image: "/placeholder.svg",
  },
  {
    id: "p2",
    name: "Virat Kohli",
    team: "Betul Blasters",
    teamId: "t2",
    role: "Batsman",
    battingStyle: "Right-handed",
    bowlingStyle: "Right-arm medium",
    country: "India",
    age: 33,
    matches: 10,
    runs: 520,
    wickets: 0,
    highestScore: 92,
    bestBowling: "0/0",
    image: "/placeholder.svg",
  },
  {
    id: "p3",
    name: "MS Dhoni",
    team: "Chhindwara Champions",
    teamId: "t3",
    role: "Wicket-keeper",
    battingStyle: "Right-handed",
    bowlingStyle: "Right-arm medium",
    country: "India",
    age: 40,
    matches: 10,
    runs: 250,
    wickets: 0,
    highestScore: 65,
    bestBowling: "0/0",
    image: "/placeholder.svg",
  },
  {
    id: "p4",
    name: "KL Rahul",
    team: "Bhopal Warriors",
    teamId: "t4",
    role: "Wicket-keeper",
    battingStyle: "Right-handed",
    bowlingStyle: "N/A",
    country: "India",
    age: 30,
    matches: 10,
    runs: 480,
    wickets: 0,
    highestScore: 98,
    bestBowling: "0/0",
    image: "/placeholder.svg",
  },
  {
    id: "p5",
    name: "Hardik Pandya",
    team: "Indore Titans",
    teamId: "t5",
    role: "All-rounder",
    battingStyle: "Right-handed",
    bowlingStyle: "Right-arm medium-fast",
    country: "India",
    age: 28,
    matches: 10,
    runs: 320,
    wickets: 12,
    highestScore: 75,
    bestBowling: "3/24",
    image: "/placeholder.svg",
  },
  {
    id: "p6",
    name: "Ravindra Jadeja",
    team: "Jabalpur Royals",
    teamId: "t6",
    role: "All-rounder",
    battingStyle: "Left-handed",
    bowlingStyle: "Left-arm orthodox",
    country: "India",
    age: 32,
    matches: 10,
    runs: 280,
    wickets: 14,
    highestScore: 62,
    bestBowling: "4/28",
    image: "/placeholder.svg",
  },
  {
    id: "p7",
    name: "Jasprit Bumrah",
    team: "Multai Mavericks",
    teamId: "t1",
    role: "Bowler",
    battingStyle: "Right-handed",
    bowlingStyle: "Right-arm fast",
    country: "India",
    age: 28,
    matches: 10,
    runs: 45,
    wickets: 18,
    highestScore: 16,
    bestBowling: "4/18",
    image: "/placeholder.svg",
  },
  {
    id: "p8",
    name: "Mohammed Shami",
    team: "Betul Blasters",
    teamId: "t2",
    role: "Bowler",
    battingStyle: "Right-handed",
    bowlingStyle: "Right-arm fast",
    country: "India",
    age: 31,
    matches: 10,
    runs: 35,
    wickets: 16,
    highestScore: 12,
    bestBowling: "3/22",
    image: "/placeholder.svg",
  },
  {
    id: "p9",
    name: "Yuzvendra Chahal",
    team: "Chhindwara Champions",
    teamId: "t3",
    role: "Bowler",
    battingStyle: "Right-handed",
    bowlingStyle: "Right-arm leg break",
    country: "India",
    age: 31,
    matches: 10,
    runs: 20,
    wickets: 15,
    highestScore: 8,
    bestBowling: "3/19",
    image: "/placeholder.svg",
  },
  {
    id: "p10",
    name: "Rishabh Pant",
    team: "Bhopal Warriors",
    teamId: "t4",
    role: "Wicket-keeper",
    battingStyle: "Left-handed",
    bowlingStyle: "N/A",
    country: "India",
    age: 24,
    matches: 10,
    runs: 410,
    wickets: 0,
    highestScore: 88,
    bestBowling: "0/0",
    image: "/placeholder.svg",
  },
  {
    id: "p11",
    name: "Suryakumar Yadav",
    team: "Indore Titans",
    teamId: "t5",
    role: "Batsman",
    battingStyle: "Right-handed",
    bowlingStyle: "Right-arm medium",
    country: "India",
    age: 31,
    matches: 10,
    runs: 480,
    wickets: 0,
    highestScore: 94,
    bestBowling: "0/0",
    image: "/placeholder.svg",
  },
  {
    id: "p12",
    name: "Shreyas Iyer",
    team: "Jabalpur Royals",
    teamId: "t6",
    role: "Batsman",
    battingStyle: "Right-handed",
    bowlingStyle: "Right-arm leg break",
    country: "India",
    age: 27,
    matches: 10,
    runs: 425,
    wickets: 0,
    highestScore: 85,
    bestBowling: "0/0",
    image: "/placeholder.svg",
  },
];

export const matches: Match[] = [
  {
    id: "m1",
    team1: "Multai Mavericks",
    team1Id: "t1",
    team2: "Betul Blasters",
    team2Id: "t2",
    date: "2023-05-15",
    time: "19:30",
    venue: "Multai Stadium",
    status: "Completed",
    result: "Betul Blasters won by 5 wickets",
    team1Score: {
      runs: 165,
      wickets: 8,
      overs: 20,
    },
    team2Score: {
      runs: 166,
      wickets: 5,
      overs: 18.4,
    },
  },
  {
    id: "m2",
    team1: "Chhindwara Champions",
    team1Id: "t3",
    team2: "Bhopal Warriors",
    team2Id: "t4",
    date: "2023-05-16",
    time: "19:30",
    venue: "Chhindwara Sports Complex",
    status: "Completed",
    result: "Chhindwara Champions won by 8 runs",
    team1Score: {
      runs: 182,
      wickets: 6,
      overs: 20,
    },
    team2Score: {
      runs: 174,
      wickets: 9,
      overs: 20,
    },
  },
  {
    id: "m3",
    team1: "Indore Titans",
    team1Id: "t5",
    team2: "Jabalpur Royals",
    team2Id: "t6",
    date: "2023-05-17",
    time: "19:30",
    venue: "Holkar Stadium, Indore",
    status: "Completed",
    result: "Match tied, Indore Titans won in Super Over",
    team1Score: {
      runs: 158,
      wickets: 7,
      overs: 20,
    },
    team2Score: {
      runs: 158,
      wickets: 8,
      overs: 20,
    },
  },
  {
    id: "m4",
    team1: "Betul Blasters",
    team1Id: "t2",
    team2: "Chhindwara Champions",
    team2Id: "t3",
    date: "2023-05-18",
    time: "19:30",
    venue: "Betul Cricket Ground",
    status: "Completed",
    result: "Betul Blasters won by 7 wickets",
    team1Score: {
      runs: 190,
      wickets: 5,
      overs: 20,
    },
    team2Score: {
      runs: 160,
      wickets: 9,
      overs: 20,
    },
  },
  {
    id: "m5",
    team1: "Bhopal Warriors",
    team1Id: "t4",
    team2: "Multai Mavericks",
    team2Id: "t1",
    date: "2023-05-19",
    time: "19:30",
    venue: "Bhopal Stadium",
    status: "Completed",
    result: "Multai Mavericks won by 6 wickets",
    team1Score: {
      runs: 155,
      wickets: 9,
      overs: 20,
    },
    team2Score: {
      runs: 156,
      wickets: 4,
      overs: 18.3,
    },
  },
  {
    id: "m6",
    team1: "Jabalpur Royals",
    team1Id: "t6",
    team2: "Betul Blasters",
    team2Id: "t2",
    date: "2023-06-12",
    time: "19:30",
    venue: "Jabalpur Cricket Stadium",
    status: "Upcoming",
  },
  {
    id: "m7",
    team1: "Multai Mavericks",
    team1Id: "t1",
    team2: "Indore Titans",
    team2Id: "t5",
    date: "2023-06-13",
    time: "19:30",
    venue: "Multai Stadium",
    status: "Upcoming",
  },
  {
    id: "m8",
    team1: "Chhindwara Champions",
    team1Id: "t3",
    team2: "Jabalpur Royals",
    team2Id: "t6",
    date: "2023-06-14",
    time: "19:30",
    venue: "Chhindwara Sports Complex",
    status: "Upcoming",
  },
  {
    id: "m9",
    team1: "Betul Blasters",
    team1Id: "t2",
    team2: "Indore Titans",
    team2Id: "t5",
    date: "2023-06-10",
    time: "19:30",
    venue: "Betul Cricket Ground",
    status: "Live",
    team1Score: {
      runs: 175,
      wickets: 6,
      overs: 20,
    },
    team2Score: {
      runs: 120,
      wickets: 4,
      overs: 15.2,
    },
  },
];

export const galleries: Gallery[] = [
  {
    id: "g1",
    title: "Opening Ceremony",
    image: "/placeholder.svg",
    date: "2023-05-10",
  },
  {
    id: "g2",
    title: "Multai Mavericks vs Betul Blasters",
    image: "/placeholder.svg",
    date: "2023-05-15",
    matchId: "m1",
  },
  {
    id: "g3",
    title: "Chhindwara Champions vs Bhopal Warriors",
    image: "/placeholder.svg",
    date: "2023-05-16",
    matchId: "m2",
  },
  {
    id: "g4",
    title: "Indore Titans vs Jabalpur Royals",
    image: "/placeholder.svg",
    date: "2023-05-17",
    matchId: "m3",
  },
  {
    id: "g5",
    title: "Betul Blasters vs Chhindwara Champions",
    image: "/placeholder.svg",
    date: "2023-05-18",
    matchId: "m4",
  },
  {
    id: "g6",
    title: "Bhopal Warriors vs Multai Mavericks",
    image: "/placeholder.svg",
    date: "2023-05-19",
    matchId: "m5",
  },
  {
    id: "g7",
    title: "Team Practice Sessions",
    image: "/placeholder.svg",
    date: "2023-05-12",
  },
  {
    id: "g8",
    title: "Fan Moments",
    image: "/placeholder.svg",
    date: "2023-05-20",
  },
];

// Helper functions
export const getTeamById = (id: string): Team | undefined => {
  return teams.find((team) => team.id === id);
};

export const getPlayerById = (id: string): Player | undefined => {
  return players.find((player) => player.id === id);
};

export const getPlayersByTeam = (teamId: string): Player[] => {
  return players.filter((player) => player.teamId === teamId);
};

export const getMatchById = (id: string): Match | undefined => {
  return matches.find((match) => match.id === id);
};

export const getUpcomingMatches = (): Match[] => {
  return matches.filter((match) => match.status === 'Upcoming');
};

export const getLiveMatches = (): Match[] => {
  return matches.filter((match) => match.status === 'Live');
};

export const getCompletedMatches = (): Match[] => {
  return matches.filter((match) => match.status === 'Completed');
};

export const getTeamRankings = (): Team[] => {
  return [...teams].sort((a, b) => {
    if (a.points !== b.points) {
      return b.points - a.points;
    }
    return b.netRunRate - a.netRunRate;
  });
};

// Admin data simulation functions
export const updatePlayerStats = (playerId: string, runs: number, wickets: number): Player => {
  const player = players.find(p => p.id === playerId);
  if (!player) throw new Error('Player not found');
  
  player.runs += runs;
  player.wickets += wickets;
  
  if (runs > player.highestScore) {
    player.highestScore = runs;
  }
  
  return player;
};

export const updateTeamStats = (teamId: string, isWin: boolean, isDraw: boolean): Team => {
  const team = teams.find(t => t.id === teamId);
  if (!team) throw new Error('Team not found');
  
  team.matches += 1;
  
  if (isWin) {
    team.won += 1;
    team.points += 2;
  } else if (isDraw) {
    team.tied += 1;
    team.points += 1;
  } else {
    team.lost += 1;
  }
  
  return team;
};

export const updateMatchStatus = (matchId: string, status: Match['status'], team1Score?: Match['team1Score'], team2Score?: Match['team2Score'], result?: string): Match => {
  const match = matches.find(m => m.id === matchId);
  if (!match) throw new Error('Match not found');
  
  match.status = status;
  
  if (team1Score) {
    match.team1Score = team1Score;
  }
  
  if (team2Score) {
    match.team2Score = team2Score;
  }
  
  if (result) {
    match.result = result;
  }
  
  return match;
};

// New function to add a match
export const addNewMatch = (matchData: {
  team1: string;
  team1Id: string;
  team2: string;
  team2Id: string;
  date: string;
  time: string;
  venue: string;
  status: Match['status'];
}): Match => {
  // Generate a simple ID (in a real app, this would be handled by the backend)
  const newId = `m${matches.length + 1}`;
  
  const newMatch: Match = {
    id: newId,
    ...matchData
  };
  
  matches.push(newMatch);
  return newMatch;
};
