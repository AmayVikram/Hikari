import React, { useState, useEffect } from 'react';
import { Play, Star, Calendar, TrendingUp, Eye, Heart, Plus, ChevronRight, Clock, Users, Award, Bookmark } from 'lucide-react';
import AnimeCard from '../components/AnimeCard';
import axios from 'axios'
import { Link } from 'react-router';

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('trending');
  const [trendingAnime,setTrendingAnime]= useState([])
  const [topRated,setTopRated]= useState([])
  const [newReleases,setNewReleases]= useState([])
  const [featuredAnime,setFeaturedAnime]= useState([])


 useEffect(() => {
  // Helper to remove duplicates by mal_id
  const getUniqueByMalId = (array) => {
    const seen = new Set();
    return array.filter(item => {
      if (seen.has(item.mal_id)) return false;
      seen.add(item.mal_id);
      return true;
    });
  };

  // Fetch trending animes (limit 20)
  axios.get('https://api.jikan.moe/v4/top/anime?type=tv&limit=25&filter=airing')
    .then(res => {
      const animes = res.data.data.map(animedata => {
        let animegenres = "";
        animedata.genres.forEach(genre => {
          animegenres += `${genre.name}, `;
        });

        return {
          mal_id: animedata.mal_id,
          title: animedata.title_english||animedata.title,
          description: animedata.synopsis,
          rating: animedata.score,
          status: animedata.status,
          year: animedata.year,
          episodes: animedata.episodes,
          genre: animegenres.trim(),
          image: animedata.images.jpg.image_url
        };
      });

      const uniqueAnimes = getUniqueByMalId(animes);
      setTrendingAnime(uniqueAnimes);  // You can slice if you want to limit after unique filtering
    })
    .catch(error => console.log(error));

  // Fetch top rated (limit 20, but keep only top 10 unique)
  setTimeout(() => {
    axios.get('https://api.jikan.moe/v4/top/anime?type=tv&limit=25')
      .then(res => {
        const animes = res.data.data.map(animedata => {
          let animegenres = "";
          animedata.genres.forEach(genre => {
            animegenres += `${genre.name}, `;
          });

          return {
            mal_id: animedata.mal_id,
            title: animedata.title_english||animedata.title,
            description: animedata.synopsis,
            rating: animedata.score,
            status: animedata.status,
            year: animedata.year,
            episodes: animedata.episodes,
            genre: animegenres.trim(),
            image: animedata.images.jpg.image_url
          };
        });

        const uniqueAnimes = getUniqueByMalId(animes);
        setTopRated(uniqueAnimes);
      })
      .catch(error => console.log(error));
  }, 1000);

  // Fetch new releases (limit 20, keep top 10 unique)
  setTimeout(() => {
    axios.get('https://api.jikan.moe/v4/seasons/now?type=tv&limit=25')
      .then(res => {
        const animes = res.data.data.map(animedata => {
          let animegenres = "";
          animedata.genres.forEach(genre => {
            animegenres += `${genre.name}, `;
          });

          return {
            mal_id: animedata.mal_id,
            title: animedata.title_english||animedata.title,
            description: animedata.synopsis,
            rating: animedata.score,
            status: animedata.status,
            year: animedata.year,
            episodes: animedata.episodes,
            genre: animegenres.trim(),
            image: animedata.images.jpg.image_url
          };
        });

        const uniqueAnimes = getUniqueByMalId(animes);
        setNewReleases(uniqueAnimes);
      })
      .catch(error => console.log(error));
  }, 2000);

  // Fetch featured animes by popularity (limit 25, keep top 10 unique)
  setTimeout(() => {
    axios.get('https://api.jikan.moe/v4/top/anime?type=tv&limit=25&filter=bypopularity')
      .then(res => {
        const animes = res.data.data.map(animedata => {
          let animegenres = "";
          animedata.genres.forEach(genre => {
            animegenres += `${genre.name}, `;
          });

          return {
            mal_id: animedata.mal_id,
            title: animedata.title_english||animedata.title,
            description: animedata.synopsis,
            rating: animedata.score,
            status: animedata.status,
            year: animedata.year,
            episodes: animedata.episodes,
            genre: animegenres.trim(),
            image: animedata.images.webp.large_image_url
          };
        });

        const uniqueAnimes = getUniqueByMalId(animes).slice(0,10);
        // console.log(animes)
        setFeaturedAnime(uniqueAnimes);
      })
      .catch(error => console.log(error));
  }, 3000);

}, []);

  


  const getCurrentAnimeList = () => {
    switch(activeTab) {
      case 'trending': return trendingAnime;
      case 'new': return newReleases;
      case 'top': return topRated;
      default: return trendingAnime;
    }
  };

  // Auto-rotate featured slider
 useEffect(() => {
  const timer = setInterval(() => {
    setCurrentSlide((prev) => {
      if (!featuredAnime || featuredAnime.length === 0) return 0;
      return (prev + 1) % featuredAnime.length;
    });
  }, 5000);

  return () => clearInterval(timer);
}, []); // no 

   const currentAnime = featuredAnime[currentSlide];

  return (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-indigo-900/20">
    
    {/* Hero Section */}
<section className="relative h-[60vh] sm:h-[70vh] overflow-hidden z-0">
  {featuredAnime.length > 0 ? (
    <>
      <Link to={`anime/${featuredAnime[currentSlide].mal_id}`}><div className="absolute inset-0">
        <img
          src={featuredAnime[currentSlide].image}
          alt={featuredAnime[currentSlide].title}
          className="w-full h-full object-top object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
      </div>

      <div className="relative z-10 h-full flex items-end pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-3 mb-2">
              <Award className="w-6 h-6 text-yellow-400" />
              <span className="text-yellow-400 font-semibold">FEATURED ANIME</span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              {featuredAnime[currentSlide].title}
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-4 leading-relaxed line-clamp-3">
              {featuredAnime[currentSlide].description}
            </p>
            <div className="flex items-center space-x-6 mb-6">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                <span className="text-yellow-400 font-bold text-lg">{featuredAnime[currentSlide].rating}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300">{featuredAnime[currentSlide].year}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300">{featuredAnime[currentSlide].episodes} episodes</span>
              </div>
            </div>
            <div className="flex space-x-4">
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 shadow-lg">
                <Play className="w-5 h-5" fill="currentColor" />
                <span>Watch Now</span>
              </button>
              <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 transform hover:scale-105 flex items-center space-x-3">
                <Plus className="w-5 h-5" />
                <span>Add to List</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      </Link>

      {/* Slider Indicators */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {featuredAnime.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-purple-500 w-8' : 'bg-white/30'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </>
  ) : (
    <div className="flex items-center justify-center h-full text-gray-400">
      Loading featured anime...
    </div>
  )}
</section>

    {/* Main Content */}
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Tabs */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-white mb-4">Discover Anime</h2>
            <p className="text-gray-400 text-lg">Find your next favorite series</p>
          </div>
          
          <div className="flex space-x-1 bg-gray-800/50 backdrop-blur-sm rounded-xl p-1 mt-6 md:mt-0">
            {[
              { id: 'trending', label: 'Trending', icon: TrendingUp },
              { id: 'new', label: 'New Releases', icon: Clock },
              { id: 'top', label: 'Top Rated', icon: Star }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Anime Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-12">
          {getCurrentAnimeList().map((anime) => (
            <AnimeCard key={anime.mal_id} anime={anime} />
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center">
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 mx-auto shadow-lg">
            <span>View More Anime</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
    
  </div>
);
}
export default Home