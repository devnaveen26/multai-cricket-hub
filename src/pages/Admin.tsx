
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  teams, 
  players, 
  matches, 
  updatePlayerStats, 
  updateTeamStats, 
  updateMatchStatus, 
  Match, 
  Player 
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
  AlertCircle 
} from 'lucide-react';
import { toast } from 'sonner';

const Admin = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'teams' | 'players' | 'matches'>('matches');
  
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
        
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
          <Button
            variant={activeTab === 'matches' ? 'default' : 'outline'}
            onClick={() => setActiveTab('matches')}
            className="flex items-center"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Matches
          </Button>
          <Button
            variant={activeTab === 'players' ? 'default' : 'outline'}
            onClick={() => setActiveTab('players')}
            className="flex items-center"
          >
            <User className="mr-2 h-4 w-4" />
            Players
          </Button>
          <Button
            variant={activeTab === 'teams' ? 'default' : 'outline'}
            onClick={() => setActiveTab('teams')}
            className="flex items-center"
          >
            <Shield className="mr-2 h-4 w-4" />
            Teams
          </Button>
        </div>
        
        {activeTab === 'matches' && (
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
                {matches.map((match) => (
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
                        match.status === 'Live' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                        match.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                        'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                      }`}>
                        {match.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{match.date}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Match Edit Form */}
            <div className="lg:col-span-2 glass-card p-6">
              <h2 className="text-xl font-semibold mb-4">
                {selectedMatch ? 'Edit Match' : 'Select a Match'}
              </h2>
              
              {selectedMatch ? (
                <div>
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
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-1">Match Status</label>
                      <select
                        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cricket-500"
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
                  
                  <div className="flex justify-end">
                    <Button onClick={updateMatch} className="flex items-center">
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-500 dark:text-slate-400">
                    Select a match from the list to edit its details.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'players' && (
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
        )}
        
        {activeTab === 'teams' && (
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
        )}
      </div>
    </div>
  );
};

export default Admin;
