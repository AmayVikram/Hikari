import React from 'react';
import { Search, User, Heart, Star, BookOpen, Menu, X, Home, TrendingUp, Calendar, Settings } from 'lucide-react';
function Footer() {
  return (
    <footer className="relative bg-gradient-to-t from-gray-900 via-purple-900 to-indigo-900 text-white">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-600 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-white" fill="currentColor" />
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                AnimeTracker
              </h3>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Your ultimate companion for tracking anime series, discovering new favorites, and connecting with the anime community. Keep track of what you've watched, rate your favorites, and never miss an episode again!
            </p>
            <div className="flex space-x-4">
              <button className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-white font-bold">T</span>
              </button>
              <button className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-white font-bold">D</span>
              </button>
              <button className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-white font-bold">R</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-pink-400">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-pink-400 transition-colors duration-300 hover:translate-x-1 transform inline-block">Popular Anime</a></li>
              <li><a href="#" className="text-gray-300 hover:text-purple-400 transition-colors duration-300 hover:translate-x-1 transform inline-block">New Releases</a></li>
              <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 hover:translate-x-1 transform inline-block">Top Rated</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 hover:translate-x-1 transform inline-block">Seasonal Anime</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors duration-300 hover:translate-x-1 transform inline-block">Random Anime</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-cyan-400">Support</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-pink-400 transition-colors duration-300 hover:translate-x-1 transform inline-block">Help Center</a></li>
              <li><a href="#" className="text-gray-300 hover:text-purple-400 transition-colors duration-300 hover:translate-x-1 transform inline-block">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 hover:translate-x-1 transform inline-block">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 hover:translate-x-1 transform inline-block">Terms of Service</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors duration-300 hover:translate-x-1 transform inline-block">API Documentation</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-700/50">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 AnimeTracker. Made with ❤️ for anime lovers worldwide.
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>All systems operational</span>
              </span>
              <span>Version 2.1.0</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer