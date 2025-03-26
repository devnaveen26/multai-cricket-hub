
import React from 'react';
import { Link } from 'react-router-dom';
import { getUpcomingMatches } from '@/lib/data';
import MatchCard from '@/components/MatchCard';
import { Button } from '@/components/ui/button';
import { ArrowRight, CalendarDays, Trophy, Users } from 'lucide-react';

const Index = () => {
  const upcomingMatches = getUpcomingMatches().slice(0, 3);
  
  return (
    <div className="min-h-screen">
      {/* Hero Section with blue gradient */}
      <section className="pt-24 pb-20 bg-gradient-to-br from-cricket-600 to-cricket-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0 animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
                Multai Premier Cricket League
              </h1>
              <p className="text-xl mb-8 text-white/90 max-w-lg">
                Experience the thrill of cricket with the best teams from Multai and surrounding regions competing for glory.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-white text-cricket-700 hover:bg-white/90">
                  <Link to="/schedule">View Schedule</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link to="/live-scores">Live Scores</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center md:justify-end animate-scale-in">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center overflow-hidden relative border border-white/20">
                <img 
                  src="/placeholder.svg" 
                  alt="Cricket Ball" 
                  className="absolute w-full h-full object-contain p-8"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-12 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6 flex items-center justify-center slide-up">
              <Trophy className="h-10 w-10 text-amber-500 mr-4" />
              <div>
                <h3 className="text-3xl font-bold">6</h3>
                <p className="text-slate-600 dark:text-slate-400">Teams</p>
              </div>
            </div>
            <div className="glass-card p-6 flex items-center justify-center slide-up" style={{ animationDelay: '100ms' }}>
              <Users className="h-10 w-10 text-blue-500 mr-4" />
              <div>
                <h3 className="text-3xl font-bold">72</h3>
                <p className="text-slate-600 dark:text-slate-400">Players</p>
              </div>
            </div>
            <div className="glass-card p-6 flex items-center justify-center slide-up" style={{ animationDelay: '200ms' }}>
              <CalendarDays className="h-10 w-10 text-green-500 mr-4" />
              <div>
                <h3 className="text-3xl font-bold">30</h3>
                <p className="text-slate-600 dark:text-slate-400">Matches</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Upcoming Matches Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Upcoming Matches</h2>
            <Button asChild variant="ghost" size="sm">
              <Link to="/schedule" className="flex items-center">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
            
            {upcomingMatches.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-slate-500 dark:text-slate-400">No upcoming matches scheduled.</p>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-cricket-50 dark:bg-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience the Cricket Fever?</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
            Join us for a season of thrilling cricket matches featuring the best teams and players from Multai and surrounding regions.
          </p>
          <Button asChild size="lg">
            <a href="#" className="px-8">
              Book Tickets
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
