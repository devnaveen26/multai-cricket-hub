
import React from 'react';
import { teams } from '@/lib/data';
import TeamCard from '@/components/TeamCard';

const Teams = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-2">Teams</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          Explore the teams competing in the Multai Premier Cricket League.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => (
            <TeamCard 
              key={team.id} 
              team={team}
              className="h-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Teams;
