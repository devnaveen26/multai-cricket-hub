
import React, { useEffect, useState } from 'react';
import { getLiveMatches, updateMatchStatus, Match } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { AlertCircle, Play } from 'lucide-react';

const LiveScores = () => {
  const [liveMatches, setLiveMatches] = useState<Match[]>(getLiveMatches());
  
  // Demo auto-update functionality for live matches
  useEffect(() => {
    // Only proceed if there are live matches
    if (liveMatches.length === 0) return;
    
    const interval = setInterval(() => {
      // Randomly select a match to update
      const randomIndex = Math.floor(Math.random() * liveMatches.length);
      const matchToUpdate = liveMatches[randomIndex];
      
      if (matchToUpdate && matchToUpdate.team2Score) {
        // Simulate a score update
        const updatedMatch = updateMatchStatus(
          matchToUpdate.id,
          'Live',
          matchToUpdate.team1Score,
          {
            ...matchToUpdate.team2Score,
            runs: matchToUpdate.team2Score.runs + Math.floor(Math.random() * 5),
            overs: Number((matchToUpdate.team2Score.overs + 0.1).toFixed(1)) % 20
          }
        );
        
        // Update the state
        setLiveMatches(prevMatches => 
          prevMatches.map(match => 
            match.id === updatedMatch.id ? updatedMatch : match
          )
        );
        
        // Show a toast notification
        toast.info(`Score updated for ${matchToUpdate.team2}`, {
          description: `${matchToUpdate.team2} scored runs in the match against ${matchToUpdate.team1}.`,
          duration: 3000,
        });
      }
    }, 15000); // Update every 15 seconds
    
    return () => clearInterval(interval);
  }, [liveMatches]);
  
  // Refresh live matches
  const refreshMatches = () => {
    setLiveMatches(getLiveMatches());
    toast.success('Live matches refreshed');
  };
  
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Live Scores</h1>
            <p className="text-slate-600 dark:text-slate-400">
              Watch live cricket scores and commentary for matches in progress.
            </p>
          </div>
          
          <Button onClick={refreshMatches} className="flex items-center">
            <Play className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
        
        {liveMatches.length > 0 ? (
          <div className="space-y-8">
            {liveMatches.map((match) => (
              <div 
                key={match.id} 
                className="glass-card overflow-hidden border-l-4 border-red-500 animate-fade-in"
              >
                <div className="p-5 bg-gradient-to-r from-red-500/10 to-transparent">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-semibold">{match.team1} vs {match.team2}</h2>
                    <span className="px-2 py-1 rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100 text-xs font-medium inline-flex items-center animate-pulse">
                      <AlertCircle className="mr-1 h-3 w-3" />
                      Live
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center my-6">
                    <div className="text-center flex-1">
                      <div className="font-semibold text-lg">{match.team1}</div>
                      {match.team1Score && (
                        <div className="text-2xl font-bold">
                          {match.team1Score.runs}/{match.team1Score.wickets}
                          <span className="text-sm text-slate-500 ml-2">({match.team1Score.overs} ov)</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-shrink-0 px-4">
                      <div className="text-slate-400 font-medium text-sm">vs</div>
                    </div>
                    
                    <div className="text-center flex-1">
                      <div className="font-semibold text-lg">{match.team2}</div>
                      {match.team2Score && (
                        <div className="text-2xl font-bold">
                          {match.team2Score.runs}/{match.team2Score.wickets}
                          <span className="text-sm text-slate-500 ml-2">({match.team2Score.overs} ov)</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    <span className="font-medium">Venue:</span> {match.venue}
                  </div>
                  
                  {/* Live Commentary (simulated) */}
                  <div className="mt-6 border-t border-slate-200 dark:border-slate-700 pt-4">
                    <h3 className="text-lg font-medium mb-3">Commentary</h3>
                    <div className="space-y-3 text-sm">
                      <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <span className="font-semibold text-cricket-700 dark:text-cricket-400">15.2 overs:</span> Sharma to Patel, FOUR! Beautiful cover drive.
                      </div>
                      <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <span className="font-semibold text-cricket-700 dark:text-cricket-400">15.1 overs:</span> Sharma to Patel, dot ball, good length delivery.
                      </div>
                      <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <span className="font-semibold text-cricket-700 dark:text-cricket-400">14.6 overs:</span> Kumar to Patel, single, pushed to mid-off.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 glass-card">
            <Play className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <h2 className="text-xl font-medium mb-2">No Live Matches</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-6">
              There are currently no matches in progress. Check the schedule for upcoming matches.
            </p>
            <Button asChild>
              <a href="/schedule">View Schedule</a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveScores;
