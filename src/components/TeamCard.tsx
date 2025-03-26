
import React from 'react';
import { Link } from 'react-router-dom';
import { Team } from '@/lib/data';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';

interface TeamCardProps {
  team: Team;
  className?: string;
}

const TeamCard = ({ team, className }: TeamCardProps) => {
  const { id, name, shortName, logo, primaryColor, secondaryColor, captain, matches, won, lost, tied, points, netRunRate } = team;
  
  const primaryColorStyle = { backgroundColor: primaryColor };
  const secondaryColorStyle = { color: secondaryColor };
  
  return (
    <Link 
      to={`/teams/${id}`}
      className={cn(
        "glass-card p-5 flex flex-col animate-scale-in hover:translate-y-[-4px] transition-all duration-300",
        className
      )}
    >
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center mr-4" style={primaryColorStyle}>
          {logo ? (
            <img src={logo} alt={name} className="w-12 h-12 object-contain" />
          ) : (
            <span className="text-white font-bold text-lg">{shortName}</span>
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <div className="flex items-center text-slate-600 dark:text-slate-400 text-sm">
            <User className="h-3 w-3 mr-1" />
            <span>Captain: {captain}</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2 text-center mb-4">
        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-2">
          <p className="text-xs text-slate-500 dark:text-slate-400">Matches</p>
          <p className="font-semibold">{matches}</p>
        </div>
        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-2">
          <p className="text-xs text-slate-500 dark:text-slate-400">Won</p>
          <p className="font-semibold text-emerald-600">{won}</p>
        </div>
        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-2">
          <p className="text-xs text-slate-500 dark:text-slate-400">Lost</p>
          <p className="font-semibold text-rose-600">{lost}</p>
        </div>
      </div>
      
      <div className="mt-auto pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between">
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400">Points</p>
          <p className="font-bold text-lg" style={secondaryColorStyle}>{points}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-500 dark:text-slate-400">Net RR</p>
          <p className={cn(
            "font-semibold",
            netRunRate >= 0 ? "text-emerald-600" : "text-rose-600"
          )}>
            {netRunRate > 0 ? '+' : ''}{netRunRate.toFixed(3)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default TeamCard;
