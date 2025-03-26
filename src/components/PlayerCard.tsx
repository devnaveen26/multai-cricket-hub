
import React from 'react';
import { Link } from 'react-router-dom';
import { Player } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Shield, Trophy } from 'lucide-react';

interface PlayerCardProps {
  player: Player;
  className?: string;
}

const PlayerCard = ({ player, className }: PlayerCardProps) => {
  const { id, name, team, role, battingStyle, bowlingStyle, country, age, matches, runs, wickets, highestScore, bestBowling, image } = player;
  
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
    <Link 
      to={`/players/${id}`}
      className={cn(
        "glass-card overflow-hidden animate-scale-in hover:translate-y-[-4px] transition-all duration-300",
        className
      )}
    >
      <div className="aspect-[3/4] relative overflow-hidden">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
            <Trophy className="h-12 w-12 text-slate-400 dark:text-slate-600" />
          </div>
        )}
        <div className="absolute top-2 left-2">
          <span className={cn("px-2 py-1 rounded-md text-xs font-medium", getRoleColor(role))}>
            {role}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{name}</h3>
        <div className="flex items-center text-sm text-slate-600 dark:text-slate-400 mb-3">
          <Shield className="h-3 w-3 mr-1" />
          <span>{team}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="col-span-2 grid grid-cols-2 gap-2 mb-2">
            <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-2 text-center">
              <p className="text-xs text-slate-500 dark:text-slate-400">Matches</p>
              <p className="font-semibold">{matches}</p>
            </div>
            <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-2 text-center">
              <p className="text-xs text-slate-500 dark:text-slate-400">Age</p>
              <p className="font-semibold">{age}</p>
            </div>
          </div>
          
          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-2 text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400">Runs</p>
            <p className="font-semibold text-blue-600">{runs}</p>
          </div>
          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-2 text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400">Wickets</p>
            <p className="font-semibold text-green-600">{wickets}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PlayerCard;
