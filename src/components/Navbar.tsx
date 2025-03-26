
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Trophy, Calendar, Users, HomeIcon, Image, BarChart3, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { name: 'Home', path: '/', icon: <HomeIcon className="h-4 w-4 mr-1" /> },
    { name: 'Teams', path: '/teams', icon: <Users className="h-4 w-4 mr-1" /> },
    { name: 'Schedule', path: '/schedule', icon: <Calendar className="h-4 w-4 mr-1" /> },
    { name: 'Live Scores', path: '/live-scores', icon: <Eye className="h-4 w-4 mr-1" /> },
    { name: 'Leaderboard', path: '/leaderboard', icon: <Trophy className="h-4 w-4 mr-1" /> },
    { name: 'Players', path: '/players', icon: <Users className="h-4 w-4 mr-1" /> },
    { name: 'Gallery', path: '/gallery', icon: <Image className="h-4 w-4 mr-1" /> },
    { name: 'Admin', path: '/admin', icon: <BarChart3 className="h-4 w-4 mr-1" /> },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 transition-all duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 font-medium text-lg">
              <Trophy className="h-6 w-6 text-cricket-600" />
              <span className="hidden md:inline-block">Multai Premier Cricket League</span>
              <span className="inline-block md:hidden">MPCL</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-cricket-700 dark:hover:text-cricket-400 transition-all duration-200 flex items-center"
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>
          
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isOpen ? "max-h-96" : "max-h-0"
          )}
        >
          <div className="py-2 space-y-1 border-t border-slate-200 dark:border-slate-700">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="block px-4 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-cricket-600 dark:hover:text-cricket-400 transition-all duration-200 flex items-center"
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                <span className="ml-2">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
