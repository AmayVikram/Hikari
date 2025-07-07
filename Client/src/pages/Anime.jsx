import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import { Play, Star, Calendar, TrendingUp, Eye, Heart, Plus, ChevronRight, Clock, Users, Award, Bookmark, ArrowLeft } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { userMethods } from '../serverApi/user'
import { updateWatched,updateWatchlater } from '../features/userSlice'
import { useNavigate } from 'react-router'
import AddReview from '../components/AddReview'
import { reviewMethods } from '../serverApi/review'
import Review from '../components/Review'

function Anime() {
    const params = useParams()
    const [animeData, setAnimeData] = useState({})
    const [loading, setLoading] = useState(true)
    const animeid = params.mal_id
    const [favouriteStatus,setFavouriteStatus] = useState(false)
    const [watchedStatus,setWatchedStatus] = useState(false)
    const [watchLaterStatus,setWatchLaterStatus] =useState(false)
    const [reviews,setReviews] = useState([])
    const [getreviews,setGetReviews] =useState(false)

    const getReviewsofAnime =  ()=>{
        const promise = reviewMethods.getReviewsofAnime(animeData.title)

        promise.then((res)=>{
        if(res.success===true)
        {
            console.log(res.review)
            setReviews(res.review)
        }
        else{
            console.log(res.error)
        }
    })
    }



    const authstatus = useSelector((state)=> state.user.status)
    const userData = useSelector((state)=> state.user.userData)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isModalOpen, setIsModalOpen] = useState(false);

    

    useEffect(()=>{

        // console.log(userData)
        // console.log(animeid)
         if(authstatus){


            const watchedanime = userData.watched.find((animeData)=> animeData.anime.mal_id===Number(animeid))

            // console.log(watchedanime)

            if(watchedanime)
            {
                setWatchedStatus(true)
                setFavouriteStatus(watchedanime.favourite)
                return
            }

            const watchlaterAnime= userData.watchlater.find((anime)=>anime.mal_id===Number(animeid))

            if(watchlaterAnime)
                setWatchLaterStatus(true)
         }
    },[userData])

    const handleFavourites =()=>{

        if(!authstatus)
            navigate('/Auth')

        const data = {
            id:userData.id,
            anime:animeData
        }
        const promise = userMethods.updateFavourites(data)
        promise.then((res)=>{
            if(res.success===true)
            {
                dispatch(updateWatched({watched:res.watched}))
            }
            else
            console.log(res.error)
        })
    }
    
    const handleWatched= ()=>{

        if(!authstatus)
            navigate('/Auth')
         const data = {
            id:userData.id,
            anime:animeData,
            rating:0
        }
        const promise = userMethods.addToWatched(data)
        
        promise.then((res)=>{
            
            if(res.success===true)
            {

                dispatch(updateWatched({watched:res.watched}))
            }
            else
            console.log(res.error)
        })
    }
    
    const handleWatchlater =()=>{

        if(!authstatus)
            navigate('/Auth')
            
         const data = {
            id:userData.id,
            anime:animeData,
            
        }
        const promise = userMethods.addtoWatchLater(data)
        promise.then((res)=>{
            // console.log(res)
            if(res.success===true)
            {
                dispatch(updateWatchlater({watchlater:res.watchlater}))
                // console.log()
            }
            else
            console.log(res.error)
        })
    }




    // console.log(animeid)



    useEffect(() => {
        axios.get(`https://api.jikan.moe/v4/anime/${animeid}`).then((res) => {
            const fullData = res.data.data
            // console.log(fullData)
            
            // Extract genres
             
            
            const currentAnimeData = {
                mal_id: fullData.mal_id,
                title: fullData.title_english || fullData.title,
                description: fullData.synopsis,
                rating: fullData.score,
                status: fullData.status,
                year: fullData.year,
                episodes: fullData.episodes,
                genre:fullData.genres?.map(genre=> genre.name).join(', ') || ' ',  // !!!
                image: fullData.images.jpg.large_image_url || fullData.images.jpg.image_url,
                embed_url: fullData.trailer?.embed_url,
                duration: fullData.duration,
                studios: fullData.studios?.map(studio => studio.name).join(', ') || 'Unknown',
                source: fullData.source,
                type: fullData.type,
                aired_from: fullData.aired?.from,
                popularity: fullData.popularity,
                rank: fullData.rank
            }
            setAnimeData(currentAnimeData)
            setLoading(false)
        }).catch(error => {
            console.error('Error fetching anime data:', error)
            setLoading(false)
        })
    }, [])

    useEffect(()=>getReviewsofAnime(),[animeData,getreviews])

    

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        )
    }

    if (Object.keys(animeData).length===0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
                <div className="text-white text-center">
                    <h2 className="text-2xl font-bold mb-4">Anime not found</h2>
                    <p className="text-gray-400">The anime you're looking for doesn't exist.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 ">
            {/* Hero Section */}
            <div className="relative ">
                {/* Background Image */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <img 
                        src={animeData.image} 
                        alt={animeData.title}
                        className="w-full h-full object-cover opacity-20 blur-sm"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>
                </div>

                <div className="relative z-10 container mx-auto px-6 py-12">
                    {/* Back Button */}
                    <button className="mb-8 flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        <span>Back to Browse</span>
                    </button>

                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Anime Poster */}
                        <div className="lg:w-1/3">
                            <div className="relative group">
                                <img 
                                    src={animeData.image} 
                                    alt={animeData.title}
                                    className="w-full max-w-sm mx-auto rounded-2xl shadow-2xl transition-transform group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                            </div>
                        </div>

                        {/* Anime Info */}
                        <div className="lg:w-2/3 space-y-6">
                            <div>
                                <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                                    {animeData.title}
                                </h1>
                                
                                {/* Status Badge */}
                                <div className="flex items-center space-x-4 mb-6">
                                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                                        animeData.status === 'Currently Airing' ? 'bg-green-500 text-white' :
                                        animeData.status === 'Finished Airing' ? 'bg-blue-500 text-white' :
                                        animeData.status === 'Not yet aired' ? 'bg-yellow-500 text-black' :
                                        'bg-gray-500 text-white'
                                    }`}>
                                        {animeData.status}
                                    </span>
                                    {animeData.rank && (
                                        <div className="flex items-center space-x-1 text-yellow-400">
                                            <Award className="w-5 h-5" />
                                            <span className="font-semibold">#{animeData.rank}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                    <div className="text-center">
                                        <div className="flex items-center justify-center space-x-1 mb-2">
                                            <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                                            <span className="text-2xl font-bold text-yellow-400">
                                                {animeData.rating || 'N/A'}
                                            </span>
                                        </div>
                                        <p className="text-gray-400 text-sm">Rating</p>
                                    </div>
                                    
                                    <div className="text-center">
                                        <div className="flex items-center justify-center space-x-1 mb-2">
                                            <Play className="w-5 h-5 text-purple-400" />
                                            <span className="text-2xl font-bold text-white">
                                                {animeData.episodes || '?'}
                                            </span>
                                        </div>
                                        <p className="text-gray-400 text-sm">Episodes</p>
                                    </div>
                                    
                                    <div className="text-center">
                                        <div className="flex items-center justify-center space-x-1 mb-2">
                                            <Calendar className="w-5 h-5 text-blue-400" />
                                            <span className="text-2xl font-bold text-white">
                                                {animeData.year || 'TBA'}
                                            </span>
                                        </div>
                                        <p className="text-gray-400 text-sm">Year</p>
                                    </div>
                                    
                                    <div className="text-center">
                                        <div className="flex items-center justify-center space-x-1 mb-2">
                                            <Eye className="w-5 h-5 text-pink-400" />
                                            <span className="text-2xl font-bold text-white">
                                                {animeData.type || 'Unknown'}
                                            </span>
                                        </div>
                                        <p className="text-gray-400 text-sm">Type</p>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                      { !watchedStatus ? 
                                        (<button disabled={watchLaterStatus} onClick={handleWatchlater} className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-4 px-8 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 shadow-xl" >
                                            <Play className="w-6 h-6" fill="currentColor" />
                                          <span> {!watchLaterStatus?"Add to WatchList":"In your WatchList" }</span>
                                        </button> ):
                                        (<button disabled={true} onClick={handleWatchlater} className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-4 px-8 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 shadow-xl" >
                                            <Play className="w-6 h-6" fill="currentColor" />
                                          <span>Already Watched</span>
                                        </button> )}
                                    
                                    
                                   { <button  disabled={watchedStatus} onClick={handleWatched} className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 px-8 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 shadow-xl" >
                                        <Plus className="w-6 h-6" />
                                        <span> {!watchedStatus?"Add to List":"In your List" }</span>
                                    </button>}
                                    
                                    <button onClick={handleFavourites} className="bg-gray-800/50 hover:bg-gray-700/50 backdrop-blur-sm text-white py-4 px-6 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 flex items-center justify-center shadow-xl">
                                    <Heart className={`w-6 h-6 ${favouriteStatus ? 'text-pink-500' : 'text-white'}`} />
                                     </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Details Section */}
            <div className="container mx-auto px-6 py-12">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Synopsis */}
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
                                <Eye className="w-6 h-6 text-purple-400" />
                                <span>Synopsis</span>
                            </h2>
                            <p className="text-gray-300 leading-relaxed text-lg">
                                {animeData.description || 'No synopsis available.'}
                            </p>
                        </div>

                        {/* Trailer */}
                        {animeData.embed_url && (
                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8">
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
                                    <Play className="w-6 h-6 text-red-400" />
                                    <span>Trailer</span>
                                </h2>
                                <div className="aspect-video rounded-xl overflow-hidden">
                                    <iframe
                                        src={animeData.embed_url}
                                        className="w-full h-full"
                                        allowFullScreen
                                        title={`${animeData.title} Trailer`}
                                    ></iframe>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
                                <Star className="w-6 h-6 text-yellow-400" />
                                <span>Share Your Thoughts</span>
                            </h2>
                            <p className="text-gray-300 mb-6">
                                Have you watched this anime? Share your review and help other anime fans discover great content!
                            </p>
                            <button 
                                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 px-8 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 shadow-xl"
                                onClick={()=>setIsModalOpen(true)}
                                
                            >
                                <Plus className="w-5 h-5" />
                                <span>Add Review</span>
                            </button>
                            <AddReview isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} anime={animeData} getanimeReviews= {()=> setGetReviews((prev)=> !prev)} />
                        </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Information */}
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6">
                            <h3 className="text-xl font-bold text-white mb-6">Information</h3>
                            <div className="space-y-4">
                                {animeData.genre && (
                                    <div>
                                        <p className="text-gray-400 text-sm mb-1">Genres</p>
                                        <p className="text-white font-medium">{animeData.genre}</p>
                                    </div>
                                )}
                                
                                {animeData.studios && (
                                    <div>
                                        <p className="text-gray-400 text-sm mb-1">Studios</p>
                                        <p className="text-white font-medium">{animeData.studios}</p>
                                    </div>
                                )}
                                
                                {animeData.source && (
                                    <div>
                                        <p className="text-gray-400 text-sm mb-1">Source</p>
                                        <p className="text-white font-medium">{animeData.source}</p>
                                    </div>
                                )}
                                
                                {animeData.duration && (
                                    <div>
                                        <p className="text-gray-400 text-sm mb-1">Duration</p>
                                        <p className="text-white font-medium">{animeData.duration}</p>
                                    </div>
                                )}
                                
                                {animeData.aired_from && (
                                    <div>
                                        <p className="text-gray-400 text-sm mb-1">Aired</p>
                                        <p className="text-white font-medium">
                                            {new Date(animeData.aired_from).toLocaleDateString()}
                                        </p>
                                    </div>
                                )}
                                
                                {animeData.popularity && (
                                    <div>
                                        <p className="text-gray-400 text-sm mb-1">Popularity</p>
                                        <p className="text-white font-medium">#{animeData.popularity}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                   
                </div>
                 {/* {Review section} */}
                    {reviews.length>0 && reviews.map((review)=> (
                        <Review key={review._id} review={review}/>
                    )
                    )}
            </div>

        </div>
    )

}

export default Anime