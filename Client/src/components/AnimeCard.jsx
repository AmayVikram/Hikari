import { Play, Star, Calendar, TrendingUp, Eye, Heart, Plus, ChevronRight, Clock, Users, Award, Bookmark } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router';

const AnimeCard = ({ anime, size = 'normal', rating = null, favourite = false }) => (
 <Link to={`/anime/${anime.mal_id}`}><div className={`group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${size === 'large' ? 'h-80' : 'h-96'} ${favourite ? 'border-yellow-400/70 bg-gradient-to-br from-yellow-900/20 to-gray-800/50' : 'border-gray-700/50 hover:border-purple-500/50'}`}>
    <div className="relative overflow-hidden">
      <img
        src={anime.image}
        alt={anime.title}
        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute top-3 left-3">
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
          anime.status === 'Ongoing' ? 'bg-green-500 text-white' :
          anime.status === 'New' ? 'bg-blue-500 text-white' :
          anime.status === 'Classic' ? 'bg-purple-500 text-white' :
          anime.status === 'Movie' ? 'bg-yellow-500 text-black' :
          'bg-gray-500 text-white'
        }`}>
          {anime.status}
        </span>
      </div>
      
      {/* Favourite indicator */}
      {favourite && (
        <div className="absolute top-2 right-2 z-10">
          <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
            <Star className="w-4 h-4 text-yellow-900" fill="currentColor" />
          </div>
        </div>
      )}
      
      <button className={`absolute top-3 right-12 p-2 backdrop-blur-sm rounded-full transition-all duration-300 transform hover:scale-110 ${
        favourite 
          ? 'bg-red-500/80 opacity-100 hover:bg-red-600/80' 
          : 'bg-black/50 opacity-0 group-hover:opacity-100 hover:bg-red-500/80'
      }`}>
        <Heart className={`w-4 h-4 text-white`} fill={favourite ? 'currentColor' : 'none'} />
      </button>
      
      <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/50 hover:bg-white/30 transition-colors duration-300">
          <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
        </div>
      </button>
    </div>
   
    <div className="p-4">
      <h3 className="font-bold text-white mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors duration-300">
        {anime.title}
      </h3>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
            <span className="text-yellow-400 font-semibold text-sm">
              {rating !== null ? `${rating}/10` : anime.rating}
            </span>
          </div>
          <span className="text-gray-400 text-sm">•</span>
          <span className="text-gray-400 text-sm">{anime.episodes}</span>
        </div>
      </div>
      <div className="flex space-x-2">
        <button className={`flex-1 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 ${
          favourite 
            ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600' 
            : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
        }`}>
          {favourite ? (
            <>
              <Star className="w-4 h-4" fill="currentColor" />
              <span>Favourited</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              <span>Add to List</span>
            </>
          )}
        </button>
      </div>
    </div>
  </div>
  </Link> 
);

export default AnimeCard;