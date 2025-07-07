import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import {
  Search,
  User,
  Heart,
  Star,
  BookOpen,
  Menu,
  X,
  Home,
  TrendingUp,
  Calendar,
  Settings,
} from 'lucide-react';
import { Link } from 'react-router';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);
  let [searchOpen, setSearchOpen] = useState(false);
  const wrapperRef = useRef("menu");

  function useClickOutside(ref, onClickOutside) {
  useEffect(() => {
    /**
     * Invoke Function onClick outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside();
      }
    }
    // Bind
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // dispose
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClickOutside]);
}

  useClickOutside(wrapperRef, () => {
    setSearchOpen(false);
  });

  

  const handleChange = (e) => {
    const value = e.target.value;

    if (searchRef.current) {
      clearTimeout(searchRef.current);
    }

    searchRef.current = setTimeout(() =>{ setSearchOpen(true), setSearchInput(value)}, 1000);
  };

  useEffect(() => {
    const input = searchInput.trim();

    if (input.length===0) 
    {
      setSearchResults([])
      return;
    }

    const url = `https://api.jikan.moe/v4/anime?q=${input}&limit=10`;
    console.log(url)
    axios.get(url).then((res) => {
      const animes = res.data.data.map((animedata) => {
        let animegenres = '';
        animedata.genres.forEach((genre) => {
          animegenres += `${genre.name}, `;
        });

        

        return {
          id: animedata.mal_id,
          title: animedata.title_english || animedata.title,
          description: animedata.synopsis,
          rating: animedata.score,
          status: animedata.status,
          year: animedata.year,
          episodes: animedata.episodes,
          genre: animegenres.trim(),
          image: animedata.images.jpg.image_url,
        };
      });
      console.log(animes)
      setSearchResults(animes);
    });
  }, [searchInput]);

  return (
    <header className="relative bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 shadow-2xl">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-all duration-300 shadow-lg">
                <Star className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-300" fill="currentColor" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                AnimeTracker
              </h1>
              <p className="text-xs text-purple-300 font-medium">Your Anime Universe</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2 text-white hover:text-pink-400 transition-colors duration-300 group">
              <Home className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium">Home</span>
            </Link>
            <Link to='/filter' className="flex items-center space-x-2 text-white hover:text-cyan-400 transition-colors duration-300 group">
              <Search className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium">Find</span>
            </Link>
            <a href="#" className="flex items-center space-x-2 text-white hover:text-purple-400 transition-colors duration-300 group">
              <BookOpen className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium">My List</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors duration-300 group">
              <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium">Schedule</span>
            </a>
          </nav>

          {/* Search and User Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="hidden sm:block relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search anime..."
                  className="w-64 pl-10 pr-4 py-2 bg-white/10 backdrop-blur-sm border border-purple-300/30 rounded-full text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-300"
                  onChange={handleChange}
                />
              </div>

              {/* Search Results */}
              <div ref={wrapperRef}>
              {searchResults.length > 0 && searchOpen && (
                <div className="absolute mt-2 w-64 bg-white/10 backdrop-blur-sm border border-purple-300/30 rounded-xl text-white shadow-lg max-h-60 overflow-y-auto ">
                  {searchResults.map((result) => (
                    <Link to={`/anime/${result.id}`} key={result.id}><div
                      
                      className="flex items-center gap-3 px-4 py-2 hover:bg-white/20 transition cursor-pointer"
                    >
                      <img
                        src={result.image}
                        alt={result.title}
                        className="w-10 h-14 object-cover rounded"
                      />
                      <div className="flex flex-col text-sm">
                        <span className="font-semibold">{result.title}</span>
                        <span className="text-purple-300">{result.genre}</span>
                      </div>
                    </div>
                    </Link>
                  ))}
                </div>
                
              )}
            </div>
          </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-3">
            <button className="p-2 text-white hover:text-pink-400 hover:bg-white/10 rounded-full transition-all duration-300 transform hover:scale-110">
              <Heart className="w-6 h-6" />
            </button>
            <button className="p-2 text-white hover:text-cyan-400 hover:bg-white/10 rounded-full transition-all duration-300 transform hover:scale-110">
              <Settings className="w-6 h-6" />
            </button>
           <Link to='/profile'><button className="p-2 text-white hover:text-yellow-400 hover:bg-white/10 rounded-full transition-all duration-300 transform hover:scale-110">
              <User className="w-6 h-6" />
            </button></Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white hover:text-pink-400 hover:bg-white/10 rounded-full transition-all duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-gradient-to-b from-purple-900/95 to-indigo-900/95 backdrop-blur-lg border-t border-purple-300/20 shadow-2xl">
            <div className="px-4 py-6 space-y-4">
              <div className="sm:hidden relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search anime..."
                  className="w-full pl-10 pr-4 py-2 bg-white/10 backdrop-blur-sm border border-purple-300/30 rounded-full text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                />
              </div>
              <a href="#" className="flex items-center space-x-3 text-white hover:text-pink-400 transition-colors duration-300 py-2">
                <Home className="w-5 h-5" />
                <span className="font-medium">Home</span>
              </a>
              <a href="#" className="flex items-center space-x-3 text-white hover:text-cyan-400 transition-colors duration-300 py-2">
                <TrendingUp className="w-5 h-5" />
                <span className="font-medium">Trending</span>
              </a>
              <a href="#" className="flex items-center space-x-3 text-white hover:text-purple-400 transition-colors duration-300 py-2">
                <BookOpen className="w-5 h-5" />
                <span className="font-medium">My List</span>
              </a>
              <a href="#" className="flex items-center space-x-3 text-white hover:text-yellow-400 transition-colors duration-300 py-2">
                <Calendar className="w-5 h-5" />
                <span className="font-medium">Schedule</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
