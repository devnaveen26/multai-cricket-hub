
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  teams, 
  players, 
  matches, 
  updatePlayerStats, 
  updateTeamStats, 
  updateMatchStatus, 
  Match, 
  Player,
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
  RefreshCw
} from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

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
                  <Button size="sm" className="flex items-center">
                    <Plus className="h-4 w-4 mr-1" />
                    New
                  </Button>
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
                          selectedMatch.status === 'Live' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 animate-pulse' :
                          selectedMatch.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                          'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                        }`}>
                          {selectedMatch.status}
                        </span>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="space-y-4">
                          <h3 className="font-medium text-lg">{selectedMatch.team1}</h3>
                          
                          <div>
                            <label className="block text-sm font-medium mb-1">Runs</label>
                            <Input
                              type="number"
                              min="0"
                              value={team1Score}
                              onChange={(e) => setTeam1Score(Number(e.target.value))}
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-1">Wickets</label>
                            <Input
                              type="number"
                              min="0"
                              max="10"
                              value={team1Wickets}
                              onChange={(e) => setTeam1Wickets(Number(e.target.value))}
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-1">Overs</label>
                            <Input
                              type="number"
                              min="0"
                              max="20"
                              step="0.1"
                              value={team1Overs}
                              onChange={(e) => setTeam1Overs(Number(e.target.value))}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <h3 className="font-medium text-lg">{selectedMatch.team2}</h3>
                          
                          <div>
                            <label className="block text-sm font-medium mb-1">Runs</label>
                            <Input
                              type="number"
                              min="0"
                              value={team2Score}
                              onChange={(e) => setTeam2Score(Number(e.target.value))}
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-1">Wickets</label>
                            <Input
                              type="number"
                              min="0"
                              max="10"
                              value={team2Wickets}
                              onChange={(e) => setTeam2Wickets(Number(e.target.value))}
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-1">Overs</label>
                            <Input
                              type="number"
                              min="0"
                              max="20"
                              step="0.1"
                              value={team2Overs}
                              onChange={(e) => setTeam2Overs(Number(e.target.value))}
                            />
                          </div>
                        </div>
                      </div>
                      
                      {/* Live simulation controls */}
                      {selectedMatch.status === 'Live' && (
                        <div className="mb-6 p-4 border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 rounded-lg">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-medium text-red-700 dark:text-red-400 flex items-center">
                              <Radio className="mr-2 h-5 w-5 animate-pulse" />
                              Live Match Control
                            </h3>
                            <div className="flex items-center space-x-2">
                              <Switch
                                id="live-mode"
                                checked={isLiveSimulationActive}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    startLiveSimulation();
                                  } else {
                                    stopLiveSimulation();
                                  }
                                }}
                              />
                              <Label htmlFor="live-mode">Auto-update</Label>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <Button 
                              variant="outline" 
                              onClick={startLiveSimulation}
                              disabled={isLiveSimulationActive}
                              className="border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/30"
                            >
                              <PlayCircle className="mr-2 h-4 w-4" />
                              Start Simulation
                            </Button>
                            <Button 
                              variant="outline" 
                              onClick={stopLiveSimulation}
                              disabled={!isLiveSimulationActive}
                              className="border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/30"
                            >
                              <RefreshCw className="mr-2 h-4 w-4" />
                              Stop Simulation
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      <div className="space-y-4 mb-6">
                        <div>
                          <label className="block text-sm font-medium mb-1">Match Status</label>
                          <select
                            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cricket-500 dark:bg-slate-900 dark:border-slate-700"
                            value={matchStatus}
                            onChange={(e) => setMatchStatus(e.target.value as Match['status'])}
                          >
                            <option value="Upcoming">Upcoming</option>
                            <option value="Live">Live</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </div>
                        
                        {matchStatus === 'Completed' && (
                          <div>
                            <label className="block text-sm font-medium mb-1">Result</label>
                            <Input
                              value={matchResult}
                              onChange={(e) => setMatchResult(e.target.value)}
                              placeholder="e.g. Team A won by 5 wickets"
                            />
                          </div>
                        )}
                      </div>
                    </CardContent>
                    
                    <CardFooter className="flex flex-wrap gap-3 justify-end">
                      {selectedMatch.status === 'Upcoming' && (
                        <Button onClick={startLiveMatch} variant="default" className="bg-red-600 hover:bg-red-700">
                          <Radio className="mr-2 h-4 w-4" />
                          Start Live Match
                        </Button>
                      )}
                      
                      {selectedMatch.status === 'Live' && (
                        <Button onClick={completeMatch} variant="default" className="bg-green-600 hover:bg-green-700">
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Complete Match
                        </Button>
                      )}
                      
                      <Button onClick={updateMatch} className="flex items-center">
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </Button>
                    </CardFooter>
                  </Card>
                ) : (
                  <div className="text-center py-12 glass-card">
                    <Calendar className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-500 dark:text-slate-400">
                      Select a match from the list to edit its details.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="players">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Player List */}
              <div className="lg:col-span-1 glass-card p-6 overflow-hidden">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Players</h2>
                  <Button size="sm" className="flex items-center">
                    <Plus className="h-4 w-4 mr-1" />
                    New
                  </Button>
                </div>
                
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                  {players.map((player) => (
                    <div 
                      key={player.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedPlayer?.id === player.id 
                          ? 'bg-cricket-50 border-cricket-500 dark:bg-cricket-900/20 dark:border-cricket-600' 
                          : 'bg-white border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-700 dark:hover:bg-slate-800'
                      }`}
                      onClick={() => handlePlayerSelect(player)}
                    >
                      <div className="flex items-center mb-1">
                        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center mr-3">
                          <span className="text-sm font-medium">{player.name.charAt(0)}</span>
                        </div>
                        <h3 className="font-medium">{player.name}</h3>
                      </div>
                      <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                        <span>{player.team}</span>
                        <span>{player.role}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Player Edit Form */}
              <div className="lg:col-span-2 glass-card p-6">
                <h2 className="text-xl font-semibold mb-4">
                  {selectedPlayer ? 'Update Player Stats' : 'Select a Player'}
                </h2>
                
                {selectedPlayer ? (
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center mr-4">
                        <span className="text-2xl font-medium">{selectedPlayer.name.charAt(0)}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-medium">{selectedPlayer.name}</h3>
                        <p className="text-slate-600 dark:text-slate-400">
                          {selectedPlayer.team} • {selectedPlayer.role}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div>
                        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mb-4">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-slate-500 dark:text-slate-400">Total Runs</span>
                            <span className="font-semibold">{selectedPlayer.runs}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-500 dark:text-slate-400">Highest Score</span>
                            <span className="font-semibold">{selectedPlayer.highestScore}</span>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Add Runs</label>
                          <Input
                            type="number"
                            min="0"
                            value={playerRuns}
                            onChange={(e) => setPlayerRuns(Number(e.target.value))}
                            placeholder="e.g. 45"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mb-4">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-slate-500 dark:text-slate-400">Total Wickets</span>
                            <span className="font-semibold">{selectedPlayer.wickets}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-500 dark:text-slate-400">Best Bowling</span>
                            <span className="font-semibold">{selectedPlayer.bestBowling}</span>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Add Wickets</label>
                          <Input
                            type="number"
                            min="0"
                            value={playerWickets}
                            onChange={(e) => setPlayerWickets(Number(e.target.value))}
                            placeholder="e.g. 2"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button onClick={updatePlayer} className="flex items-center">
                        <Save className="mr-2 h-4 w-4" />
                        Update Stats
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <User className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-500 dark:text-slate-400">
                      Select a player from the list to update their statistics.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="teams">
            <div className="glass-card p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Teams</h2>
                <Button size="sm" className="flex items-center">
                  <Plus className="h-4 w-4 mr-1" />
                  New Team
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teams.map((team) => (
                  <div 
                    key={team.id}
                    className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center mb-3">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white mr-3"
                        style={{ backgroundColor: team.primaryColor }}
                      >
                        <span className="font-bold text-sm">{team.shortName}</span>
                      </div>
                      <h3 className="font-medium text-lg">{team.name}</h3>
                    </div>
                    
                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex justify-between">
                        <span className="text-slate-500 dark:text-slate-400">Captain</span>
                        <span className="font-medium">{team.captain}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 dark:text-slate-400">Points</span>
                        <span className="font-bold">{team.points}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 dark:text-slate-400">W/L/T</span>
                        <span>{team.won}/{team.lost}/{team.tied}</span>
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm" className="w-full flex items-center justify-center">
                      Edit Team
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
