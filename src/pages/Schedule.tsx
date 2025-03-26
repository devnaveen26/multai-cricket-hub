
import React, { useState } from 'react';
import { getUpcomingMatches, getCompletedMatches } from '@/lib/data';
import MatchCard from '@/components/MatchCard';
import { Button } from '@/components/ui/button';
import { CalendarDays, CheckCircle, Clock } from 'lucide-react';

const Schedule = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');
  
  const upcomingMatches = getUpcomingMatches();
  const completedMatches = getCompletedMatches();
  
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-2">Match Schedule</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          All upcoming and completed matches of the Multai Premier Cricket League.
        </p>
        
        <div className="flex space-x-2 mb-8">
          <Button
            variant={activeTab === 'upcoming' ? 'default' : 'outline'}
            onClick={() => setActiveTab('upcoming')}
            className="flex items-center"
          >
            <Clock className="mr-2 h-4 w-4" />
            Upcoming
          </Button>
          <Button
            variant={activeTab === 'completed' ? 'default' : 'outline'}
            onClick={() => setActiveTab('completed')}
            className="flex items-center"
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Completed
          </Button>
        </div>
        
        {activeTab === 'upcoming' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
              
              {upcomingMatches.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <CalendarDays className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-500 dark:text-slate-400">No upcoming matches scheduled.</p>
                </div>
              )}
            </div>
          </>
        )}
        
        {activeTab === 'completed' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
              
              {completedMatches.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <CalendarDays className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-500 dark:text-slate-400">No completed matches yet.</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Schedule;
