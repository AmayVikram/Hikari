import React, { useEffect, useRef, useState } from 'react';
import { Search, SlidersHorizontal, X, ChevronDown, Star, Calendar, Users, Play } from 'lucide-react';
import axios from 'axios';
import AnimeCard from '../components/AnimeCard';

function Filter() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [searchResults,setSearchResults]= useState([])
  const [doSearch,setDoSearch]= useState(false)
 

  const searchRef = useRef(null)

  const firstRender= useRef(true)



  const genres = [
  { name: 'Action', id: 1 },
  { name: 'Adventure', id: 2 },
  { name: 'Comedy', id: 4 },
  { name: 'Drama', id: 8 },
  { name: 'Fantasy', id: 10 },
  { name: 'Horror', id: 14 },
  { name: 'Romance', id: 22 },
  { name: 'Sci-Fi', id: 24 },
  { name: 'Slice of Life', id: 36 },
  { name: 'Sports', id: 30 },
  { name: 'Supernatural', id: 37 },
  { name: 'Thriller', id: 45 }, // Mapped to Suspense (assumed equivalent)
  { name: 'Mystery', id: 7 },
  { name: 'Psychological', id: 40 },
  { name: 'Historical', id: 13 },
  { name: 'Military', id: 38 },
  { name: 'School', id: 23 },
  { name: 'Music', id: 19 },
  { name: 'Mecha', id: 18 },
  { name: 'Shounen', id: 27 },
  { name: 'Shoujo', id: 25 },
  { name: 'Seinen', id: 42 }
];






  const years = Array.from({ length: 30 }, (_, i) => 2024 - i);
  const statuses = ['Airing', 'Complete', 'Upcoming'];
  const types = ['TV', 'Movie', 'OVA', 'ONA', 'Special'];
  const ratings = ['G', 'PG', 'PG-13', 'R', 'Rx'];
  const sortOptions = [
    { value: 'popularity', label: 'Popularity',search:"&order_by=popularity" },
    { value: 'rating', label: 'Rating', search:"&order_by=score&sort=desc" },
    { value: 'newest', label: 'Newest', search:"&order_by=start_date&sort=desc"},
    { value: 'oldest', label: 'Oldest', search:"&order_by=start_date&sort=asc"},
    { value: 'alphabetical', label: 'A-Z', search:"&order_by=title"},
    { value: 'episodes', label: 'Episodes',search:"&order_by=episodes&sort=desc" }
  ];

  const toggleGenre = (genre) => {
    setSelectedGenres(prev => 
      prev.includes(genre) 
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedGenres([]);
    setSelectedYear('');
    setSelectedStatus('');
    setSelectedType('');
    setSelectedRating('');
    setSortBy('popularity');
  };


  useEffect(()=>{
      
      if(firstRender.current===true)
    {
        return
    }

      if(searchRef.current)
        clearTimeout(searchRef.current)

      searchRef.current= setTimeout(()=> setDoSearch((prev)=>!prev),500)

    

  },[searchTerm,selectedGenres,selectedRating,selectedStatus,selectedType,selectedYear,sortBy])

  useEffect(()=>{

     if(firstRender.current===true)
    {
        // console.log("hello")
        firstRender.current=false
        return
    }

    
    
    let url= `https://api.jikan.moe/v4/anime?`

    if(searchTerm)
        url+= `q=${searchTerm}`

    if(selectedType)
        url+=`&type=${selectedType}`
    
    if(selectedStatus)
        url+=`&status=${selectedStatus}`

    if(selectedRating)
        url+=`&rating=${selectedRating}`

    if(selectedYear)
        url+=`&start_date=${selectedYear}-01-01`

    if(selectedGenres.length>0)
    {
        const genres=selectedGenres.join(',')
        console.log(genres)
        url+=`&genres=${genres}`
        
    }
     
     sortOptions.forEach((option)=> {
        if(option.value===sortBy)
          url+= option.search
    })

    console.log(url)
    

    

    axios.get(url).then((res)=>{

        console.log(res.data.data)
        const animes = res.data.data.map(animedata => {
        // let animegenres = "";
        // animedata.genres.forEach(genre => {
        //   animegenres += `${genre.name}, `;
        // });

        const animegenres= animedata.genres.map((genre)=>genre.name).join(',') // join removes last comma

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
      setSearchResults(animes)
    }
    
).catch(error=> console.log(error))
    




  },[doSearch])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-violet-500 rounded-lg flex items-center justify-center">
                <SlidersHorizontal className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Discover Anime</h1>
                <p className="text-purple-200">Find your next favorite series</p>
              </div>
            </div>
            <button
              onClick={clearAllFilters}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg border border-red-400/30 text-red-300 transition-all duration-300"
            >
              <X className="w-4 h-4" />
              <span>Clear All</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Search */}
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search anime titles..."
                    value={searchTerm}
                    onChange={(e)=>setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-black/20 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>

              {/* Quick Filters */}
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                <h3 className="text-white font-semibold mb-4 flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-400" />
                  Quick Filters
                </h3>
                <div className="space-y-3">
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full px-4 py-2 bg-black/20 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">All Years</option>
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                  
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full px-4 py-2 bg-black/20 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">All Status</option>
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                  
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-4 py-2 bg-black/20 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">All Types</option>
                    {types.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Advanced Filters Toggle */}
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 hover:from-purple-600/30 hover:to-pink-600/30 border border-purple-400/30 rounded-xl p-4 text-white flex items-center justify-between transition-all duration-300"
              >
                <span className="font-medium">Advanced Filters</span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${showAdvanced ? 'rotate-180' : ''}`} />
              </button>

              {/* Advanced Filters */}
              {showAdvanced && (
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 space-y-4">
                  <div>
                    <label className="text-white font-medium mb-2 block">Rating</label>
                    <select
                      value={selectedRating}
                      onChange={(e) => setSelectedRating(e.target.value)}
                      className="w-full px-4 py-2 bg-black/20 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">All Ratings</option>
                      {ratings.map(rating => (
                        <option key={rating} value={rating}>{rating}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-white font-medium mb-2 block">Sort By</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-4 py-2 bg-black/20 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {sortOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Genres */}
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                <h3 className="text-white font-semibold mb-4">Genres</h3>
                <div className="grid grid-cols-2 gap-2">
                  {genres.map(genre => (
                    <button
                      key={genre.name}
                      onClick={() => toggleGenre(genre.id)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        selectedGenres.includes(genre.id)
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                          : 'bg-black/20 text-gray-300 hover:bg-black/40 hover:text-white border border-white/10'
                      }`}
                    >
                      {genre.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results Area */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <h2 className="text-2xl font-bold text-white">Search Results</h2>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                    {searchResults.length>0 && searchResults.length}
                  </span>
                </div>
                
                {/* Active Filters */}
                {(selectedGenres.length > 0 || selectedYear || selectedStatus || selectedType || searchTerm) && (
                  <div className="flex flex-wrap gap-2">
                    {searchTerm && (
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm flex items-center">
                        Search: "{searchTerm}"
                        <X className="w-3 h-3 ml-2 cursor-pointer" onClick={() => setSearchTerm('')} />
                      </span>
                    )}
                    {selectedYear && (
                      <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm flex items-center">
                        {selectedYear}
                        <X className="w-3 h-3 ml-2 cursor-pointer" onClick={() => setSelectedYear('')} />
                      </span>
                    )}
                    {selectedGenres.slice(0, 3).map((genreId) => {

                        const genreName= genres.find((genre)=> genre.id===genreId).name
                     return ( <span key={genreId} className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-sm flex items-center">
                        {genreName}
                        <X className="w-3 h-3 ml-2 cursor-pointer" onClick={() => toggleGenre(genreId)} />
                      </span>
                    )})}
                    {selectedGenres.length > 3 && (
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                        +{selectedGenres.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {searchResults.length > 0 ? (
                searchResults.map((result, index) => (
                  <AnimeCard key={index} anime={result} />
                ))
              ) : (
                <div className="col-span-full text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-white mb-2">No anime found</h3>
                  <p className="text-gray-400">Try adjusting your filters or search terms</p>
                </div>
              )}
            </div>

            

            {/* Load More */}
            <div className="mt-12 text-center">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25">
                Load More Anime
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;