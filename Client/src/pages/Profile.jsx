import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AnimeCard from '../components/AnimeCard'
import { reviewMethods } from '../serverApi/review'
import Review from '../components/Review'
import { useState,useEffect } from 'react'
import AddReview from '../components/AddReview'
import {logout} from '../features/userSlice.js'
import { useNavigate } from 'react-router'

function Profile() {
    const userData = useSelector((state) => state.user.userData)
    const [reviews,setReviews]= useState([])
    const [editingReviewid,setEditingReviewid]= useState(null)
    const [getReviews,setGetReviews]= useState(false)
    const dispatch = useDispatch()
    const navigate= useNavigate()

    const favourites = userData.watched.filter((watchedItem)=> watchedItem.favourite===true)

    const deleteHandler = (id)=>{
        const promise = reviewMethods.deleteReview(id)
        promise.then((res)=> setGetReviews((prev)=>!prev))
    }

    const handleLogout = ()=>{
        dispatch(logout())
        // navigate('/Auth')  since authstatus is now null useffect in protected will redirect
    }

     const getReviewsofUser =  ()=>{
            const promise = reviewMethods.getReviewsbyUser(userData.id)
    
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

    useEffect(()=>getReviewsofUser(),[getReviews])

    // console.log(userData.watched)
    // console.log(favourites)

    // for(let i=0;i<favourites.length;i++)
    //     // console.log(favourites[i].mal_id)
    
    if (!userData) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Loading Profile...</h2>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-6xl mx-auto">
                {/* Profile Header */}
              <div className="bg-gray-800 rounded-lg p-6 mb-8 shadow-lg">
    <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold">
                    {userData.username.charAt(0).toUpperCase()}
                </span>
            </div>
            <div>
                <h1 className="text-3xl font-bold mb-2">{userData.username}</h1>
                <p className="text-gray-400 mb-2">{userData.email}</p>
                <div className="flex space-x-6 text-sm">
                    <span className="bg-blue-600 px-3 py-1 rounded-full">
                        Watched: {userData.watched?.length || 0}
                    </span>
                    <span className="bg-purple-600 px-3 py-1 rounded-full">
                        Watch Later: {userData.watchlater?.length || 0}
                    </span>
                </div>
            </div>
        </div>
        <button 
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
        </button>
    </div>
</div>
                {/*Favourites section  */}

                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-6 flex items-center">
                        <span className="bg-blue-600 w-1 h-6 mr-3 rounded"></span>
                        Favourite Anime
                    </h2>
                    
                    { favourites.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {favourites.map((favouriteItem) => (
                            
                                <AnimeCard key={favouriteItem.anime.mal_id} anime={favouriteItem.anime} rating={favouriteItem.rating} favourite={true}/>
                               
                            ))}
                        </div>
                    ) : (
                        <div className="bg-gray-800 rounded-lg p-8 text-center">
                            <div className="text-gray-400 mb-4">
                                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
</svg>

                            </div>
                            <h3 className="text-xl font-semibold mb-2">No Favourites Yet?</h3>
                            <p className='text-gray-400'>Check out some of the best</p>
                        </div>
                    )}
                </div>

                {/* Watched Anime Section */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-6 flex items-center">
                        <span className="bg-blue-600 w-1 h-6 mr-3 rounded"></span>
                        Watched Anime
                    </h2>
                    
                    {userData.watched && userData.watched.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {userData.watched.map((watchedItem) => (
                            
                                <AnimeCard key={watchedItem.anime.mal_id} anime={watchedItem.anime} rating={watchedItem.rating} />
                                
                               
                            ))}
                        </div>
                    ) : (
                        <div className="bg-gray-800 rounded-lg p-8 text-center">
                            <div className="text-gray-400 mb-4">
                                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">No Watched Anime Yet</h3>
                            <p className="text-gray-400">Start watching some anime to see them here!</p>
                        </div>
                    )}
                </div>

                {/* Watch Later Section */}
                <div>
                    <h2 className="text-2xl font-bold mb-6 flex items-center">
                        <span className="bg-purple-600 w-1 h-6 mr-3 rounded"></span>
                        Watch Later
                    </h2>
                    
                    {userData.watchlater && userData.watchlater.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {userData.watchlater.map((anime) => (
                                <AnimeCard key={anime.mal_id} anime={anime} />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-gray-800 rounded-lg p-8 text-center">
                            <div className="text-gray-400 mb-4">
                                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">No Anime in Watch Later</h3>
                            <p className="text-gray-400">Add some anime to your watch later list!</p>
                        </div>
                    )}
                </div>
                {/* {Review section} */}
                                   {reviews.length > 0 && reviews.map((review) => (
    <div 
        key={review._id} 
        className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 mb-6 border border-gray-100 hover:border-gray-200"
    >
        {/* Review Component */}
        <div className="mb-4">
            <Review review={review} />
        </div>
        
        {/* Action Buttons Container */}
        <div className="flex flex-wrap gap-3 justify-end border-t pt-4 border-gray-100">
            {/* Edit Button */}
            <button
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 px-6 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 shadow-md hover:shadow-lg"
                onClick={() => setEditingReviewid(review._id)}
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span>Edit Review</span>
            </button>
            
            {/* Delete Button */}
            <button
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-2 px-6 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 shadow-md hover:shadow-lg"
                onClick={() => deleteHandler(review._id)}
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span>Delete Review</span>
            </button>
        </div>
        
        {/* Edit Modal */}
        {editingReviewid === review._id && (
            <AddReview 
                isOpen={true} 
                onClose={() => setEditingReviewid(null)} 
                anime={{title: review.anime}} 
                getUserReviews={() => setGetReviews((prev) => !prev)} 
                review={review} 
            />
        )}
    </div>
))}
                
            </div>
        </div>
    )
}

export default Profile