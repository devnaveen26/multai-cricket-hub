
import React from 'react';
import { Match } from '@/lib/data';
import { cn } from '@/lib/utils';
import { CalendarIcon, Clock, MapPin } from 'lucide-react';
import { format, isToday, parseISO } from 'date-fns';

interface MatchCardProps {
  match: Match;
  className?: string;
}

const MatchCard = ({ match, className }: MatchCardProps) => {
  const { team1, team2, date, time, venue, status, result, team1Score, team2Score } = match;
  
  // Status-based styling
  const getStatusLabel = () => {
    switch (status) {
      case 'Upcoming':
        return <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 text-xs font-medium">Upcoming</span>;
      case 'Live':
        return <span className="px-2 py-1 rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100 text-xs font-medium animate-pulse">Live</span>;
      case 'Completed':
        return <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 text-xs font-medium">Completed</span>;
      default:
        return null;
    }
  };
  
  // Format date
  const formatMatchDate = () => {
    try {
      const parsedDate = parseISO(date);
      if (isToday(parsedDate)) {
        return 'Today';
      }
      return format(parsedDate, 'dd MMM yyyy');
    } catch (error) {
      return date;
    }
  };
  
  return (
    <div className={cn("glass-card p-5 slide-up", className)}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
          <CalendarIcon className="h-4 w-4 mr-1" />
          <span>{formatMatchDate()}</span>
          <span className="mx-2">•</span>
          <Clock className="h-4 w-4 mr-1" />
          <span>{time}</span>
        </div>
        {getStatusLabel()}
      </div>
      
      <div className="flex justify-between items-center my-6">
        <div className="text-center flex-1">
          <div className="font-semibold text-lg">{team1}</div>
          {team1Score && (
            <div className="text-md font-medium">
              {team1Score.runs}/{team1Score.wickets}
              <span className="text-xs text-slate-500 ml-1">({team1Score.overs} ov)</span>
            </div>
          )}
        </div>
        
        <div className="flex-shrink-0 px-4">
          <div className="text-slate-400 font-medium text-sm">vs</div>
        </div>
        
        <div className="text-center flex-1">
          <div className="font-semibold text-lg">{team2}</div>
          {team2Score && (
            <div className="text-md font-medium">
              {team2Score.runs}/{team2Score.wickets}
              <span className="text-xs text-slate-500 ml-1">({team2Score.overs} ov)</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
        <div className="flex items-center text-sm text-slate-600 dark:text-slate-400 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{venue}</span>
        </div>
        
        {result && (
          <div className="text-sm font-medium text-slate-900 dark:text-slate-100">{result}</div>
        )}
      </div>
    </div>
  );
};

export default MatchCard;
