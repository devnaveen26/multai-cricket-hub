import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  teams, 
  players, 
  matches, 
  updatePlayerStats, 
  updateTeamStats, 
  updateMatchStatus,
  addNewMatch,
  Match, 
  Player,
  Team,
  getUpcomingMatches,
  getLiveMatches,
  getCompletedMatches
} from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Shield, 
  User, 
  Calendar, 
  ArrowRight, 
  Plus, 
  Save, 
  AlertCircle,
  Radio,
  PlayCircle,
  CheckCircle2,
  Clock,
  RefreshCw,
  X,
  Cricket
} from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const Admin = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'teams' | 'players' | 'matches'>('matches');
  const [matchesView, setMatchesView] = useState<'all' | 'upcoming' | 'live' | 'completed'>('all');
  
  // Selected entities for updates
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  
  // Form states
  const [team1Score, setTeam1Score] = useState<number>(0);
  const [team1Wickets, setTeam1Wickets] = useState<number>(0);
  const [team1Overs, setTeam1Overs] = useState<number>(0);
  const [team2Score, setTeam2Score] = useState<number>(0);
  const [team2Wickets, setTeam2Wickets] = useState<number>(0);
  const [team2Overs, setTeam2Overs] = useState<number>(0);
  const [matchStatus, setMatchStatus] = useState<Match['status']>('Upcoming');
  const [matchResult, setMatchResult] = useState<string>('');
  
  const [playerRuns, setPlayerRuns] = useState<number>(0);
  const [playerWickets, setPlayerWickets] = useState<number>(0);
  
  // Live match simulation
  const [isLiveSimulationActive, setIsLiveSimulationActive] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<number | null>(null);
  
  // Ball-by-ball scoring states
  const [currentBowler, setCurrentBowler] = useState<string>('');
  const [currentBatsman, setCurrentBatsman] = useState<string>('');
  const [ballOutcome, setBallOutcome] = useState<string>('0');
  const [isWide, setIsWide] = useState<boolean>(false);
  const [isNoBall, setIsNoBall] = useState<boolean>(false);
  const [isWicket, setIsWicket] = useState<boolean>(false);
  const [wicketType, setWicketType] = useState<string>('bowled');
  const [commentaryText, setCommentaryText] = useState<string>('');
  const [currentInnings, setCurrentInnings] = useState<'first' | 'second'>('first');
  
  // New match form states
  const [newMatchTeam1, setNewMatchTeam1] = useState<string>('');
  const [newMatchTeam2, setNewMatchTeam2] = useState<string>('');
  const [newMatchDate, setNewMatchDate] = useState<string>('');
  const [newMatchTime, setNewMatchTime] = useState<string>('');
  const [newMatchVenue, setNewMatchVenue] = useState<string>('');
  const [isNewMatchDialogOpen, setIsNewMatchDialogOpen] = useState<boolean>(false);
  
  // Filter matches based on status
  const filteredMatches = () => {
    switch (matchesView) {
      case 'upcoming':
        return getUpcomingMatches();
      case 'live':
        return getLiveMatches();
      case 'completed':
        return getCompletedMatches();
      default:
        return matches;
    }
  };
  
  // Effect to clean up interval on unmount
  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock authentication
    if (username === 'admin' && password === 'admin123') {
      setIsLoggedIn(true);
      toast.success('Login successful!');
    } else {
      toast.error('Invalid credentials. Try admin/admin123');
    }
  };
  
  const handleMatchSelect = (match: Match) => {
    setSelectedMatch(match);
    if (match.team1Score) {
      setTeam1Score(match.team1Score.runs);
      setTeam1Wickets(match.team1Score.wickets);
      setTeam1Overs(match.team1Score.overs);
    } else {
      setTeam1Score(0);
      setTeam1Wickets(0);
      setTeam1Overs(0);
    }
    
    if (match.team2Score) {
      setTeam2Score(match.team2Score.runs);
      setTeam2Wickets(match.team2Score.wickets);
      setTeam2Overs(match.team2Score.overs);
    } else {
      setTeam2Score(0);
      setTeam2Wickets(0);
      setTeam2Overs(0);
    }
    
    setMatchStatus(match.status);
    setMatchResult(match.result || '');
    
    // Reset ball-by-ball scoring
    setCurrentBowler('');
    setCurrentBatsman('');
    setBallOutcome('0');
    setIsWide(false);
    setIsNoBall(false);
    setIsWicket(false);
    setWicketType('bowled');
    setCommentaryText('');
    
    // Determine current innings
    if (match.team1Score && (!match.team2Score || match.team2Score.overs === 0)) {
      setCurrentInnings('first');
    } else if (match.team2Score && match.team2Score.overs > 0) {
      setCurrentInnings('second');
    } else {
      setCurrentInnings('first');
    }
    
    // Stop any ongoing simulation when selecting a new match
    stopLiveSimulation();
  };
  
  const handlePlayerSelect = (player: Player) => {
    setSelectedPlayer(player);
    setPlayerRuns(0);
    setPlayerWickets(0);
  };
  
  const updateMatch = () => {
    if (!selectedMatch) {
      toast.error('Please select a match to update');
      return;
    }
    
    try {
      const updatedMatch = updateMatchStatus(
        selectedMatch.id,
        matchStatus,
        {
          runs: team1Score,
          wickets: team1Wickets,
          overs: team1Overs
        },
        {
          runs: team2Score,
          wickets: team2Wickets,
          overs: team2Overs
        },
        matchResult
      );
      
      // Update team stats if the match is completed
      if (matchStatus === 'Completed' && matchResult) {
        const team1Won = matchResult.includes(selectedMatch.team1);
        const team2Won = matchResult.includes(selectedMatch.team2);
        const isDraw = matchResult.includes('tied');
        
        updateTeamStats(selectedMatch.team1Id, team1Won, isDraw);
        updateTeamStats(selectedMatch.team2Id, team2Won, isDraw);
      }
      
      toast.success('Match updated successfully!');
      setSelectedMatch(updatedMatch);
    } catch (error) {
      toast.error('Error updating match');
      console.error(error);
    }
  };
  
  const startLiveMatch = () => {
    if (!selectedMatch) {
      toast.error('Please select a match to start');
      return;
    }
    
    try {
      // Set match status to Live
      const updatedMatch = updateMatchStatus(
        selectedMatch.id,
        'Live',
        {
          runs: team1Score,
          wickets: team1Wickets,
          overs: team1Overs
        },
        {
          runs: team2Score,
          wickets: team2Wickets,
          overs: team2Overs
        }
      );
      
      setSelectedMatch(updatedMatch);
      setMatchStatus('Live');
      toast.success(`${selectedMatch.team1} vs ${selectedMatch.team2} is now LIVE!`);
    } catch (error) {
      toast.error('Error starting live match');
      console.error(error);
    }
  };
  
  const startLiveSimulation = () => {
    if (!selectedMatch || selectedMatch.status !== 'Live') {
      toast.error('Can only simulate live matches');
      return;
    }
    
    setIsLiveSimulationActive(true);
    toast.info('Live score simulation started!');
    
    // Set up interval to update scores every few seconds
    const id = window.setInterval(() => {
      // Generate random score updates for demonstration
      const team1RunsChange = Math.floor(Math.random() * 2); // 0 or 1 run
      const team1WicketsChange = Math.random() > 0.9 ? 1 : 0; // 10% chance of wicket
      const team1OversChange = 0.1; // Increment by 1 ball
      
      const newTeam1Score = team1Score + team1RunsChange;
      const newTeam1Wickets = Math.min(team1Wickets + team1WicketsChange, 10);
      const newTeam1Overs = parseFloat((team1Overs + team1OversChange).toFixed(1));
      
      // Update state
      setTeam1Score(newTeam1Score);
      setTeam1Wickets(newTeam1Wickets);
      setTeam1Overs(newTeam1Overs);
      
      // Update match in data
      updateMatchStatus(
        selectedMatch.id,
        'Live',
        {
          runs: newTeam1Score,
          wickets: newTeam1Wickets,
          overs: newTeam1Overs
        },
        selectedMatch.team2Score
      );
      
      // If over 20 overs or 10 wickets, end the team's innings
      if (newTeam1Overs >= 20 || newTeam1Wickets >= 10) {
        stopLiveSimulation();
        toast.success("First innings completed!");
      }
      
      // Update player stats randomly
      if (Math.random() > 0.7) { // 30% chance of updating a player
        const randomPlayerIndex = Math.floor(Math.random() * players.length);
        const randomPlayer = players[randomPlayerIndex];
        updatePlayerStats(randomPlayer.id, team1RunsChange, team1WicketsChange);
      }
      
    }, 2000); // Update every 2 seconds
    
    setIntervalId(id);
  };
  
  const stopLiveSimulation = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
      setIsLiveSimulationActive(false);
      toast.info('Live score simulation stopped');
    }
  };
  
  const completeMatch = () => {
    if (!selectedMatch) {
      toast.error('Please select a match');
      return;
    }
    
    // Stop any simulation first
    stopLiveSimulation();
    
    // Determine the result based on scores
    let result = '';
    if (team1Score > team2Score) {
      const wicketDiff = 10 - team2Wickets;
      result = `${selectedMatch.team1} won by ${team1Score - team2Score} runs`;
    } else if (team2Score > team1Score) {
      const wicketDiff = 10 - team1Wickets;
      result = `${selectedMatch.team2} won by ${wicketDiff} wickets`;
    } else {
      result = 'Match tied';
    }
    
    setMatchResult(result);
    setMatchStatus('Completed');
    
    try {
      const updatedMatch = updateMatchStatus(
        selectedMatch.id,
        'Completed',
        {
          runs: team1Score,
          wickets: team1Wickets,
          overs: team1Overs
        },
        {
          runs: team2Score,
          wickets: team2Wickets,
          overs: team2Overs
        },
        result
      );
      
      // Update team stats
      const team1Won = result.includes(selectedMatch.team1);
      const team2Won = result.includes(selectedMatch.team2);
      const isDraw = result.includes('tied');
      
      updateTeamStats(selectedMatch.team1Id, team1Won, isDraw);
      updateTeamStats(selectedMatch.team2Id, team2Won, isDraw);
      
      setSelectedMatch(updatedMatch);
      toast.success('Match completed successfully!');
    } catch (error) {
      toast.error('Error completing match');
      console.error(error);
    }
  };
  
  const updatePlayer = () => {
    if (!selectedPlayer) {
      toast.error('Please select a player to update');
      return;
    }
    
    try {
      const updatedPlayer = updatePlayerStats(
        selectedPlayer.id,
        playerRuns,
        playerWickets
      );
      
      toast.success('Player stats updated successfully!');
      setSelectedPlayer(updatedPlayer);
      setPlayerRuns(0);
      setPlayerWickets(0);
    } catch (error) {
      toast.error('Error updating player stats');
      console.error(error);
    }
  };
  
  const recordBallOutcome = () => {
    if (!selectedMatch || selectedMatch.status !== 'Live') {
      toast.error('Can only record ball-by-ball for live matches');
      return;
    }
    
    if (!currentBowler || !currentBatsman) {
      toast.error('Please select both bowler and batsman');
      return;
    }
    
    // Calculate runs from this ball
    let runsFromBall = parseInt(ballOutcome);
    
    // If it's a wide or no ball, add 1 extra run but don't increment the overs
    let isExtra = isWide || isNoBall;
    let extraRuns = isExtra ? 1 : 0;
    let totalRuns = runsFromBall + extraRuns;
    
    // Get current innings data
    let currentRuns, currentWickets, currentOvers;
    let newOvers;
    
    if (currentInnings === 'first') {
      currentRuns = team1Score;
      currentWickets = team1Wickets;
      currentOvers = team1Overs;
      
      // Update overs (only if not a wide or no ball)
      if (!isExtra) {
        const wholePart = Math.floor(currentOvers);
        const decimalPart = currentOvers - wholePart;
        
        if (decimalPart < 0.5) {
          newOvers = parseFloat((currentOvers + 0.1).toFixed(1));
        } else {
          newOvers = wholePart + 1;
        }
      } else {
        newOvers = currentOvers;
      }
      
      // Update state
      setTeam1Score(currentRuns + totalRuns);
      if (isWicket) {
        setTeam1Wickets(currentWickets + 1);
      }
      if (!isExtra) {
        setTeam1Overs(newOvers);
      }
      
      // Update match in data
      updateMatchStatus(
        selectedMatch.id,
        'Live',
        {
          runs: currentRuns + totalRuns,
          wickets: isWicket ? currentWickets + 1 : currentWickets,
          overs: !isExtra ? newOvers : currentOvers
        },
        selectedMatch.team2Score
      );
    } else {
      currentRuns = team2Score;
      currentWickets = team2Wickets;
      currentOvers = team2Overs;
      
      // Update overs (only if not a wide or no ball)
      if (!isExtra) {
        const wholePart = Math.floor(currentOvers);
        const decimalPart = currentOvers - wholePart;
        
        if (decimalPart < 0.5) {
          newOvers = parseFloat((currentOvers + 0.1).toFixed(1));
        } else {
          newOvers = wholePart + 1;
        }
      } else {
        newOvers = currentOvers;
      }
      
      // Update state
      setTeam2Score(currentRuns + totalRuns);
      if (isWicket) {
        setTeam2Wickets(currentWickets + 1);
      }
      if (!isExtra) {
        setTeam2Overs(newOvers);
      }
      
      // Update match in data
      updateMatchStatus(
        selectedMatch.id,
        'Live',
        selectedMatch.team1Score,
        {
          runs: currentRuns + totalRuns,
          wickets: isWicket ? currentWickets + 1 : currentWickets,
          overs: !isExtra ? newOvers : currentOvers
        }
      );
    }
    
    // Update player stats
    const bowlerId = players.find(p => p.name === currentBowler)?.id;
    const batsmanId = players.find(p => p.name === currentBatsman)?.id;
    
    if (batsmanId && !isWide) {
      updatePlayerStats(batsmanId, runsFromBall, 0);
    }
    
    if (bowlerId && isWicket) {
      updatePlayerStats(bowlerId, 0, 1);
    }
    
    // Generate commentary
    let commentary = '';
    if (isWide) {
      commentary = `Wide ball. ${runsFromBall} runs. ${commentaryText}`;
    } else if (isNoBall) {
      commentary = `No ball. ${runsFromBall} runs. ${commentaryText}`;
    } else if (isWicket) {
      commentary = `WICKET! ${currentBatsman} is out ${wicketType}. ${commentaryText}`;
    } else if (runsFromBall === 4) {
      commentary = `FOUR! ${currentBatsman} hits a boundary. ${commentaryText}`;
    } else if (runsFromBall === 6) {
      commentary = `SIX! ${currentBatsman} clears the ropes. ${commentaryText}`;
    } else {
      commentary = `${runsFromBall} runs. ${commentaryText}`;
    }
    
    toast.success(`Ball recorded: ${commentary}`);
    
    // Reset fields
    setBallOutcome('0');
    setIsWide(false);
    setIsNoBall(false);
    setIsWicket(false);
    setWicketType('bowled');
    setCommentaryText('');
    
    // Check if innings or match is complete
    const maxOvers = 20; // T20 format
    
    if (currentInnings === 'first') {
      if (newOvers >= maxOvers || (isWicket && currentWickets + 1 >= 10)) {
        toast.info("First innings completed!");
        setCurrentInnings('second');
      }
    } else {
      // Check if second innings is complete
      if (newOvers >= maxOvers || (isWicket && currentWickets + 1 >= 10) || 
          (team2Score + totalRuns > team1Score)) {
        // Automatically complete match
        let result = '';
        if (team1Score > team2Score + totalRuns) {
          result = `${selectedMatch.team1} won by ${team1Score - (team2Score + totalRuns)} runs`;
        } else {
          result = `${selectedMatch.team2} won by ${10 - currentWickets - (isWicket ? 1 : 0)} wickets`;
        }
        
        updateMatchStatus(
          selectedMatch.id,
          'Completed',
          {
            runs: team1Score,
            wickets: team1Wickets,
            overs: team1Overs
          },
          {
            runs: team2Score + totalRuns,
            wickets: isWicket ? team2Wickets + 1 : team2Wickets,
            overs: !isExtra ? newOvers : team2Overs
          },
          result
        );
        
        setMatchStatus('Completed');
        setMatchResult(result);
        
        // Update team stats
        const team1Won = result.includes(selectedMatch.team1);
        const team2Won = result.includes(selectedMatch.team2);
        const isDraw = result.includes('tied');
        
        updateTeamStats(selectedMatch.team1Id, team1Won, isDraw);
        updateTeamStats(selectedMatch.team2Id, team2Won, isDraw);
        
        toast.success("Match completed!");
      }
    }
  };
  
  const createNewMatch = () => {
    if (!newMatchTeam1 || !newMatchTeam2 || !newMatchDate || !newMatchVenue) {
      toast.error('Please fill all required fields');
      return;
    }
    
    try {
      const team1Object = teams.find(t => t.name === newMatchTeam1);
      const team2Object = teams.find(t => t.name === newMatchTeam2);
      
      if (!team1Object || !team2Object) {
        toast.error('Selected teams not found');
        return;
      }
      
      const newMatch = addNewMatch({
        team1: newMatchTeam1,
        team1Id: team1Object.id,
        team2: newMatchTeam2,
        team2Id: team2Object.id,
        date: newMatchDate,
        time: newMatchTime || '19:30',
        venue: newMatchVenue,
        status: 'Upcoming'
      });
      
      toast.success('New match added successfully!');
      setIsNewMatchDialogOpen(false);
      
      // Reset form fields
      setNewMatchTeam1('');
      setNewMatchTeam2('');
      setNewMatchDate('');
      setNewMatchTime('');
      setNewMatchVenue('');
      
      // Select the newly created match
      handleMatchSelect(newMatch);
    } catch (error) {
      toast.error('Error creating new match');
      console.error(error);
    }
  };
  
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="glass-card p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
          
          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium mb-1">
                  Username
                </label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              <div className="text-sm text-slate-500 dark:text-slate-400 flex items-center">
                <AlertCircle className="h-4 w-4 mr-2" />
                <span>Use admin/admin123 for demo access</span>
              </div>
              
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Manage teams, players, and matches for the Multai Premier Cricket League.
          </p>
        </div>
        
        <Tabs defaultValue="matches" onValueChange={(value) => setActiveTab(value as 'matches' | 'teams' | 'players')}>
          <TabsList className="mb-6">
            <TabsTrigger value="matches" className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              Matches
            </TabsTrigger>
            <TabsTrigger value="players" className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              Players
            </TabsTrigger>
            <TabsTrigger value="teams" className="flex items-center">
              <Shield className="mr-2 h-4 w-4" />
              Teams
            </TabsTrigger>
          </TabsList>

          <TabsContent value="matches">
            <div className="mb-4 flex flex-wrap gap-2">
              <Button 
                variant={matchesView === 'all' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setMatchesView('all')}
              >
                All Matches
              </Button>
              <Button 
                variant={matchesView === 'upcoming' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setMatchesView('upcoming')}
              >
                <Clock className="mr-1 h-4 w-4" />
                Upcoming
              </Button>
              <Button 
                variant={matchesView === 'live' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setMatchesView('live')}
                className={matchesView === 'live' ? 'animate-pulse' : ''}
              >
                <Radio className="mr-1 h-4 w-4" />
                Live
              </Button>
              <Button 
                variant={matchesView === 'completed' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setMatchesView('completed')}
              >
                <CheckCircle2 className="mr-1 h-4 w-4" />
                Completed
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Match List */}
              <div className="lg:col-span-1 glass-card p-6 overflow-hidden">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Matches</h2>
                  <Dialog open={isNewMatchDialogOpen} onOpenChange={setIsNewMatchDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="flex items-center">
                        <Plus className="h-4 w-4 mr-1" />
                        New
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Add New Match</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="team1">Team 1</Label>
                          <Select value={newMatchTeam1} onValueChange={setNewMatchTeam1}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select team" />
                            </SelectTrigger>
                            <SelectContent>
                              {teams.map((team) => (
                                <SelectItem key={team.id} value={team.name}>
                                  {team.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="team2">Team 2</Label>
                          <Select value={newMatchTeam2} onValueChange={setNewMatchTeam2}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select team" />
                            </SelectTrigger>
                            <SelectContent>
                              {teams.map((team) => (
                                <SelectItem key={team.id} value={team.name}>
                                  {team.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="date">Date</Label>
                          <Input
                            id="date"
                            type="date"
                            value={newMatchDate}
                            onChange={(e) => setNewMatchDate(e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="time">Time</Label>
                          <Input
                            id="time"
                            type="time"
                            value={newMatchTime}
                            onChange={(e) => setNewMatchTime(e.target.value)}
                            placeholder="19:30"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="venue">Venue</Label>
                          <Input
                            id="venue"
                            value={newMatchVenue}
                            onChange={(e) => setNewMatchVenue(e.target.value)}
                            placeholder="Enter venue"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsNewMatchDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="button" onClick={createNewMatch}>
                          Create Match
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                  {filteredMatches().map((match) => (
                    <div 
                      key={match.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedMatch?.id === match.id 
                          ? 'bg-cricket-50 border-cricket-500 dark:bg-cricket-900/20 dark:border-cricket-600' 
                          : 'bg-white border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-700 dark:hover:bg-slate-800'
                      }`}
                      onClick={() => handleMatchSelect(match)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{match.team1} vs {match.team2}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          match.status === 'Live' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 animate-pulse' :
                          match.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                          'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                        }`}>
                          {match.status}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{match.date}</p>
                      {match.status !== 'Upcoming' && (
                        <div className="flex justify-between mt-2 text-sm">
                          <span>{match.team1Score?.runs || 0}/{match.team1Score?.wickets || 0}</span>
                          <span>vs</span>
                          <span>{match.team2Score?.runs || 0}/{match.team2Score?.wickets || 0}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Match Edit Form */}
              <div className="lg:col-span-2">
                {selectedMatch ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {selectedMatch.team1} vs {selectedMatch.team2}
                      </CardTitle>
                      <CardDescription>
                        {selectedMatch.date} • {selectedMatch.venue}
                      </CardDescription>
                      <div className="mt-2 flex items-center gap-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          selectedMatch.status === 'Live' ? 'bg-red-10
