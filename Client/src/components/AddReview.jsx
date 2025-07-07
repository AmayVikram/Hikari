import React, { useEffect } from 'react'
import { X, Star, Send } from 'lucide-react'
import { Provider, useSelector } from 'react-redux';
import { reviewMethods } from '../serverApi/review';
import { useState } from 'react';

function AddReview({ isOpen, onClose, anime,getanimeReviews,getUserReviews,review=null,isEditable=false}) {
  if (!isOpen) return null;

  const userData = useSelector((state)=>state.user.userData)

  const userid= userData.id
  const username= userData.username

  const [formData,setFormData]= useState({
    id:userid,
    username:username,
    anime:anime.title,
    rating:0,
    content:'',
    title:'',
    status:""
  }
  )

  useEffect(()=>{
    if(review)
    {
      setFormData(review)
      console.log(formData)
    }
  },[])

  const handleSubmit = ()=>{
    // console.log(formData)

    if(review)
    {
      console.log(formData)
      const promise = reviewMethods.editReview(formData,review._id)
      promise.then((res)=> {
        // console.log(res)
        if(getUserReviews())
        getUserReviews()
    })
    return
    }


    const promise = reviewMethods.addReview(formData)
    promise.then((res)=>{
        if(res.success===true)
        {
            if(getanimeReviews())
              getanimeReviews()
            
            console.log(res.review)
        }
        else
        console.log(res.error);
        

    })

  }








  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Background backdrop */}
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          {/* Modal panel */}
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                  <Star className="h-6 w-6 text-blue-600" />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">
                    Add Review
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Share your thoughts about {anime.title}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                  onClick={onClose}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              {/* Form Content */}
              <div className="mt-6 space-y-4">
                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Rating</label>
                  <div className="mt-2 flex space-x-1">
                    {[0,1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => {

                        const color = formData.rating === rating ?"bg-blue-400 hover:bg-blue-500 text-white":"hover:bg-gray-50 text-gray-700"
                        
                      return(
                      <button
                        key={rating}
                        value={rating}
                        className={`flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-sm font-medium   ${color}`}
                        onClick={(e)=> {
                            const newRating = Number(e.target.value);
                            setFormData(prev=> ({...prev,rating:newRating}))
                            console.log(newRating)
                        }}

                        
                      >
                        {rating}
                      </button>
                    )})}
                  </div>
                </div>

                {/* Review Title */}
                <div>
                  <label htmlFor="review-title" className="block text-sm font-medium text-gray-700">
                    Review Title
                  </label>
                  <input
                    type="text"
                    id="review-title"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
                    placeholder="Give your review a title..."
                    value={formData.title}
                    onChange={(e)=> setFormData((prev)=>{
                        return {...prev,title:e.target.value}
                    })}
                  />
                </div>

                {/* Review Text */}
                <div>
                  <label htmlFor="review-text" className="block text-sm font-medium text-gray-700">
                    Your Review
                  </label>
                  <textarea
                    id="review-text"
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
                    placeholder="Share your thoughts..."
                    value={formData.content}
                    onChange={(e)=> setFormData((prev)=>{
                        return {...prev,content:e.target.value}
                    })}
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Watching Status</label>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                  {["Completed","Watching","On Hold","Dropped"].map((status)=> {

                    const color = formData.status===status ? "bg-blue-400 hover:bg-blue-500 text-white":" bg-white hover:bg-gray-50 text-gray-700"
                    
                    return (
                    <button className={`rounded-md border border-gray-300 px-3 py-2 text-sm font-medium ${color}`}
                      key={status}
                      value={status}
                      onClick={(e)=>setFormData((prev)=> ({...prev,status:e.target.value}))}>
                      {status}
                    </button>)})}
                  </div>
                </div>

                {/* Spoiler checkbox */}
                <div className="flex items-center">
                  <input
                    id="spoiler-warning"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="spoiler-warning" className="ml-2 block text-sm text-gray-700">
                    Contains spoilers
                  </label>
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                onClick={()=>{handleSubmit(),onClose()}}
              >
                <Send className="mr-2 h-4 w-4" />
                Submit Review
              </button>
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={onClose}
                
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddReview