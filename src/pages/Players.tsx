
import React, { useState } from 'react';
import { players } from '@/lib/data';
import PlayerCard from '@/components/PlayerCard';
import { Button } from '@/components/ui/button';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';

type Role = 'All' | 'Batsman' | 'Bowler' | 'All-rounder' | 'Wicket-keeper';

const Players = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role>('All');
  
  const filteredPlayers = players.filter(player => {
    const nameMatch = player.name.toLowerCase().includes(searchTerm.toLowerCase());
    const roleMatch = selectedRole === 'All' || player.role === selectedRole;
    return nameMatch && roleMatch;
  });
  
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-2">Players</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          Explore all players participating in the Multai Premier Cricket League.
        </p>
        
        <div className="mb-8 flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="relative w-full md:w-auto md:flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search players..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
            <SlidersHorizontal className="h-4 w-4 text-slate-400 mr-2 flex-shrink-0" />
            <Button
              variant={selectedRole === 'All' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedRole('All')}
              className="flex-shrink-0"
            >
              All
            </Button>
            <Button
              variant={selectedRole === 'Batsman' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedRole('Batsman')}
              className="flex-shrink-0"
            >
              Batsmen
            </Button>
            <Button
              variant={selectedRole === 'Bowler' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedRole('Bowler')}
              className="flex-shrink-0"
            >
              Bowlers
            </Button>
            <Button
              variant={selectedRole === 'All-rounder' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedRole('All-rounder')}
              className="flex-shrink-0"
            >
              All-rounders
            </Button>
            <Button
              variant={selectedRole === 'Wicket-keeper' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedRole('Wicket-keeper')}
              className="flex-shrink-0"
            >
              Wicket-keepers
            </Button>
          </div>
        </div>
        
        {filteredPlayers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPlayers.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 glass-card">
            <Filter className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <h2 className="text-xl font-medium mb-2">No Players Found</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-6">
              No players match your search criteria. Try adjusting your filters.
            </p>
            <Button onClick={() => { setSearchTerm(''); setSelectedRole('All'); }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Players;
