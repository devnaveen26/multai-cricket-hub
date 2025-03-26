
import React from 'react';
import { Link } from 'react-router-dom';
import { getTeamRankings } from '@/lib/data';
import { Trophy, ArrowDown, ArrowUp, Minus, InfoIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const Leaderboard = () => {
  const teamRankings = getTeamRankings();
  
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-6">
          <Trophy className="h-8 w-8 text-amber-500 mr-3" />
          <div>
            <h1 className="text-3xl font-bold">Leaderboard</h1>
            <p className="text-slate-600 dark:text-slate-400">
              Current standings of all teams in the Multai Premier Cricket League.
            </p>
          </div>
        </div>
        
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800">
                  <th className="text-left p-4 font-semibold">#</th>
                  <th className="text-left p-4 font-semibold">Team</th>
                  <th className="text-center p-4 font-semibold">M</th>
                  <th className="text-center p-4 font-semibold">W</th>
                  <th className="text-center p-4 font-semibold">L</th>
                  <th className="text-center p-4 font-semibold">T</th>
                  <th className="text-center p-4 font-semibold">
                    <div className="flex items-center justify-center" title="Net Run Rate">
                      NRR
                      <InfoIcon className="ml-1 h-3 w-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="text-center p-4 font-semibold">Points</th>
                  <th className="text-center p-4 font-semibold">Form</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {teamRankings.map((team, index) => (
                  <tr 
                    key={team.id} 
                    className={cn(
                      "hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors",
                      index < 4 ? "bg-white dark:bg-slate-900" : ""
                    )}
                  >
                    <td className="p-4 font-medium text-slate-900 dark:text-slate-100">
                      {index + 1}
                    </td>
                    <td className="p-4 min-w-[200px]">
                      <Link to={`/teams/${team.id}`} className="flex items-center hover:text-cricket-600 transition-colors">
                        <div 
                          className="w-8 h-8 rounded-full mr-3 flex items-center justify-center text-white text-xs font-bold"
                          style={{ backgroundColor: team.primaryColor }}
                        >
                          {team.shortName}
                        </div>
                        <span className="font-medium">{team.name}</span>
                      </Link>
                    </td>
                    <td className="p-4 text-center">{team.matches}</td>
                    <td className="p-4 text-center font-medium text-green-600 dark:text-green-500">{team.won}</td>
                    <td className="p-4 text-center font-medium text-red-600 dark:text-red-500">{team.lost}</td>
                    <td className="p-4 text-center">{team.tied}</td>
                    <td className="p-4 text-center">
                      <span 
                        className={cn(
                          "inline-flex items-center",
                          team.netRunRate > 0 ? "text-green-600 dark:text-green-500" : 
                          team.netRunRate < 0 ? "text-red-600 dark:text-red-500" : ""
                        )}
                      >
                        {team.netRunRate > 0 ? (
                          <ArrowUp className="h-3 w-3 mr-1" />
                        ) : team.netRunRate < 0 ? (
                          <ArrowDown className="h-3 w-3 mr-1" />
                        ) : (
                          <Minus className="h-3 w-3 mr-1" />
                        )}
                        {team.netRunRate > 0 ? "+" : ""}{team.netRunRate.toFixed(3)}
                      </span>
                    </td>
                    <td className="p-4 text-center font-bold text-xl text-slate-900 dark:text-slate-100">{team.points}</td>
                    <td className="p-4">
                      <div className="flex justify-center space-x-1">
                        {/* Mock form data - in a real app, this would come from match history */}
                        {Array.from({ length: 5 }).map((_, i) => {
                          const random = Math.random();
                          let result = 'W';
                          let bgColor = 'bg-green-500';
                          
                          if (random < 0.3) {
                            result = 'L';
                            bgColor = 'bg-red-500';
                          } else if (random < 0.4) {
                            result = 'T';
                            bgColor = 'bg-amber-500';
                          }
                          
                          return (
                            <span 
                              key={i} 
                              className={`${bgColor} w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold`}
                            >
                              {result}
                            </span>
                          );
                        })}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-6 text-sm text-slate-600 dark:text-slate-400">
          <p><strong>Legend:</strong> M - Matches, W - Won, L - Lost, T - Tied, NRR - Net Run Rate</p>
          <p className="mt-2"><strong>Qualification:</strong> Top 4 teams qualify for the playoffs</p>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
