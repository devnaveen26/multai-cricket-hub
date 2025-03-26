
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTeamById, getPlayersByTeam } from '@/lib/data';
import PlayerCard from '@/components/PlayerCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trophy, Users, Calendar, CircleDot, CheckCircle, XCircle } from 'lucide-react';

const TeamDetails = () => {
  const { id } = useParams<{ id: string }>();
  const team = getTeamById(id || '');
  const teamPlayers = getPlayersByTeam(id || '');
  
  if (!team) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Team not found</h1>
          <Button asChild>
            <Link to="/teams">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Teams
            </Link>
          </Button>
        </div>
      </div>
    );
  }
  
  const { name, shortName, logo, captain, matches, won, lost, tied, points, netRunRate, primaryColor, secondaryColor } = team;
  
  const headerStyle = {
    backgroundColor: primaryColor,
    color: '#ffffff',
  };
  
  return (
    <div className="min-h-screen">
      {/* Team Header */}
      <div className="pt-24 pb-12" style={headerStyle}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Button asChild variant="ghost" className="mb-6 text-white hover:bg-white/10">
            <Link to="/teams">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Teams
            </Link>
          </Button>
          
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-28 h-28 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 md:mb-0 md:mr-8 overflow-hidden">
              {logo ? (
                <img src={logo} alt={name} className="w-20 h-20 object-contain" />
              ) : (
                <span className="text-white font-bold text-3xl">{shortName}</span>
              )}
            </div>
            
            <div>
              <h1 className="text-4xl font-bold mb-2 text-center md:text-left">{name}</h1>
              <p className="text-white/80 mb-4 text-center md:text-left">Captain: {captain}</p>
              
              <div className="flex flex-wrap gap-3">
                <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 flex items-center">
                  <Trophy className="h-4 w-4 mr-2" />
                  <span className="font-semibold">{points} Points</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{matches} Matches</span>
                </div>
                <div className={`bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 flex items-center ${netRunRate >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                  <CircleDot className="h-4 w-4 mr-2" />
                  <span>NRR: {netRunRate > 0 ? '+' : ''}{netRunRate.toFixed(3)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Team Stats */}
      <div className="py-8 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-4">
            <div className="glass-card p-6 text-center animate-scale-in">
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                <span className="text-2xl font-bold">{won}</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400">Won</p>
            </div>
            
            <div className="glass-card p-6 text-center animate-scale-in" style={{ animationDelay: '100ms' }}>
              <div className="flex items-center justify-center mb-2">
                <XCircle className="h-6 w-6 text-red-500 mr-2" />
                <span className="text-2xl font-bold">{lost}</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400">Lost</p>
            </div>
            
            <div className="glass-card p-6 text-center animate-scale-in" style={{ animationDelay: '200ms' }}>
              <div className="flex items-center justify-center mb-2">
                <CircleDot className="h-6 w-6 text-amber-500 mr-2" />
                <span className="text-2xl font-bold">{tied}</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400">Tied</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Team Players */}
      <div className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Users className="h-6 w-6 mr-3" />
            <h2 className="text-2xl font-bold">Squad</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {teamPlayers.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
            
            {teamPlayers.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-slate-500 dark:text-slate-400">No players available for this team.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDetails;
