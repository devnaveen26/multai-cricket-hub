
import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Trophy className="h-6 w-6 text-cricket-500" />
              <span className="font-semibold text-xl">MPCL</span>
            </Link>
            <p className="text-slate-400 text-sm mb-4">
              The premier cricket league of Multai, bringing the best cricket talent together for thrilling matches.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-cricket-500 transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-cricket-500 transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-cricket-500 transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-cricket-500 transition-colors duration-200">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors duration-200">Home</Link>
              </li>
              <li>
                <Link to="/teams" className="text-slate-400 hover:text-white transition-colors duration-200">Teams</Link>
              </li>
              <li>
                <Link to="/schedule" className="text-slate-400 hover:text-white transition-colors duration-200">Schedule</Link>
              </li>
              <li>
                <Link to="/leaderboard" className="text-slate-400 hover:text-white transition-colors duration-200">Leaderboard</Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-medium text-lg mb-4">Information</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/players" className="text-slate-400 hover:text-white transition-colors duration-200">Players</Link>
              </li>
              <li>
                <Link to="/gallery" className="text-slate-400 hover:text-white transition-colors duration-200">Gallery</Link>
              </li>
              <li>
                <Link to="/live-scores" className="text-slate-400 hover:text-white transition-colors duration-200">Live Scores</Link>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200">About MPCL</a>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-medium text-lg mb-4">Contact</h3>
            <address className="not-italic">
              <p className="text-slate-400 mb-2">Multai Cricket Stadium</p>
              <p className="text-slate-400 mb-2">Multai, Madhya Pradesh</p>
              <p className="text-slate-400 mb-2">India</p>
              <p className="text-slate-400 mb-2">info@mpcl.com</p>
              <p className="text-slate-400">+91 98765 43210</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-6 mt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Multai Premier Cricket League. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors duration-200">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors duration-200">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
