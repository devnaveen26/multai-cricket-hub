
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPlayerById } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Flag, Shield, Award, TrendingUp, Target, Shirt } from 'lucide-react';

const PlayerDetails = () => {
  const { id } = useParams<{ id: string }>();
  const player = getPlayerById(id || '');
  
  if (!player) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Player not found</h1>
          <Button asChild>
            <Link to="/players">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Players
            </Link>
          </Button>
        </div>
      </div>
    );
  }
  
  const { name, team, teamId, role, battingStyle, bowlingStyle, country, age, matches, runs, wickets, highestScore, bestBowling, image } = player;
  
  // Role-based styling
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Batsman':
        return 'bg-blue-500 text-white';
      case 'Bowler':
        return 'bg-green-500 text-white';
      case 'All-rounder':
        return 'bg-purple-500 text-white';
      case 'Wicket-keeper':
        return 'bg-amber-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };
  
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Button asChild variant="outline" className="mb-6">
          <Link to="/players">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Players
          </Link>
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Player Image and Basic Info */}
          <div className="md:col-span-1">
            <div className="glass-card overflow-hidden">
              <div className="aspect-square relative overflow-hidden">
                {image ? (
                  <img src={image} alt={name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                    <span className="text-6xl font-bold text-slate-300 dark:text-slate-700">{name.charAt(0)}</span>
                  </div>
                )}
                <div className="absolute top-3 left-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(role)}`}>
                    {role}
                  </span>
                </div>
              </div>
              
              <div className="p-5">
                <h1 className="text-3xl font-bold mb-2">{name}</h1>
                <Link to={`/teams/${teamId}`} className="inline-flex items-center text-cricket-600 hover:underline mb-4">
                  <Shield className="h-4 w-4 mr-1" />
                  {team}
                </Link>
                
                <div className="space-y-3">
                  <div className="flex items-center text-slate-600 dark:text-slate-400">
                    <Flag className="h-4 w-4 mr-3 flex-shrink-0" />
                    <span>Country: {country}</span>
                  </div>
                  <div className="flex items-center text-slate-600 dark:text-slate-400">
                    <Calendar className="h-4 w-4 mr-3 flex-shrink-0" />
                    <span>Age: {age} years</span>
                  </div>
                  <div className="flex items-center text-slate-600 dark:text-slate-400">
                    <Shirt className="h-4 w-4 mr-3 flex-shrink-0" />
                    <span>Batting Style: {battingStyle}</span>
                  </div>
                  {bowlingStyle !== 'N/A' && (
                    <div className="flex items-center text-slate-600 dark:text-slate-400">
                      <Target className="h-4 w-4 mr-3 flex-shrink-0" />
                      <span>Bowling Style: {bowlingStyle}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Player Stats */}
          <div className="md:col-span-2">
            <div className="glass-card p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-cricket-600" />
                Career Statistics
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-4 text-center">
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Matches</p>
                  <p className="text-3xl font-bold">{matches}</p>
                </div>
                <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-4 text-center">
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Runs</p>
                  <p className="text-3xl font-bold text-blue-600">{runs}</p>
                </div>
                <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-4 text-center">
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Wickets</p>
                  <p className="text-3xl font-bold text-green-600">{wickets}</p>
                </div>
                <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-4 text-center">
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Highest Score</p>
                  <p className="text-3xl font-bold text-purple-600">{highestScore}</p>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3">Performance Breakdown</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Batting Average</span>
                      <span className="font-medium">{runs > 0 && matches > 0 ? (runs / matches).toFixed(2) : '-'}</span>
                    </div>
                    <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500" 
                        style={{ width: `${Math.min(100, runs > 0 && matches > 0 ? (runs / matches / 50) * 100 : 0)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Bowling Average</span>
                      <span className="font-medium">{wickets > 0 && matches > 0 ? (runs / wickets).toFixed(2) : '-'}</span>
                    </div>
                    <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500" 
                        style={{ width: `${Math.min(100, wickets > 0 && matches > 0 ? (wickets / matches / 2) * 100 : 0)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Contribution Index</span>
                      <span className="font-medium">{((runs * 0.5) + (wickets * 10)).toFixed(1)}</span>
                    </div>
                    <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-purple-500" 
                        style={{ width: `${Math.min(100, ((runs * 0.5) + (wickets * 10)) / 400 * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Award className="h-5 w-5 mr-2 text-cricket-600" />
                Career Highlights
              </h2>
              
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-slate-100 dark:bg-slate-800 border-l-4 border-amber-500">
                  <h3 className="font-medium mb-1">Best Batting Performance</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {highestScore > 0 ? `${highestScore} runs against ${Math.random() > 0.5 ? 'Betul Blasters' : 'Chhindwara Champions'}` : 'No significant batting performance yet'}
                  </p>
                </div>
                
                {wickets > 0 && (
                  <div className="p-4 rounded-lg bg-slate-100 dark:bg-slate-800 border-l-4 border-green-500">
                    <h3 className="font-medium mb-1">Best Bowling Performance</h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      {bestBowling} against {Math.random() > 0.5 ? 'Multai Mavericks' : 'Bhopal Warriors'}
                    </p>
                  </div>
                )}
                
                <div className="p-4 rounded-lg bg-slate-100 dark:bg-slate-800 border-l-4 border-blue-500">
                  <h3 className="font-medium mb-1">Key Achievements</h3>
                  <ul className="text-slate-600 dark:text-slate-400 list-disc pl-5 space-y-1">
                    {runs > 400 && (
                      <li>Scored over 400 runs in the tournament</li>
                    )}
                    {wickets > 15 && (
                      <li>Took over 15 wickets in the tournament</li>
                    )}
                    {highestScore > 75 && (
                      <li>Scored a match-winning {highestScore} against {Math.random() > 0.5 ? 'Indore Titans' : 'Jabalpur Royals'}</li>
                    )}
                    {runs > 300 && wickets > 10 && (
                      <li>One of the top all-rounders in the tournament</li>
                    )}
                    {runs < 100 && wickets > 12 && (
                      <li>Among the tournament's leading wicket-takers</li>
                    )}
                    {runs > 400 && wickets < 5 && (
                      <li>Among the tournament's leading run-scorers</li>
                    )}
                    <li>Represented {team} in all matches</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerDetails;
