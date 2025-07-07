import React from 'react'

function Review({ review }) {
  const { username, anime, content, status, rating } = review

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'text-green-600 bg-green-100'
      case 'watching': return 'text-blue-600 bg-blue-100'
      case 'on hold': return 'text-yellow-600 bg-yellow-100'
      case 'dropped': return 'text-red-600 bg-red-100'
      case 'plan to watch': return 'text-purple-600 bg-purple-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getRatingColor = (rating) => {
    if (rating >= 8) return 'text-green-600'
    if (rating >= 6) return 'text-yellow-600'
    if (rating >= 4) return 'text-orange-600'
    return 'text-red-600'
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating / 2)
    const hasHalfStar = rating % 2 !== 0
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-400">★</span>)
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-400">☆</span>)
    }
    
    const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300">☆</span>)
    }
    
    return stars
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
            {username?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{username}</h3>
            <p className="text-sm text-gray-600">{anime}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
            {status}
          </span>
        </div>
      </div>
      
      <div className="mb-3">
        <p className="text-gray-700 text-sm leading-relaxed">{content}</p>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex">{renderStars(rating)}</div>
          <span className={`font-semibold ${getRatingColor(rating)}`}>
            {rating}/10
          </span>
        </div>
        <div className="text-xs text-gray-500">
          Review
        </div>
      </div>
    </div>
  )
}

export default Review