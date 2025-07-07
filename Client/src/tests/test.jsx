import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'

function Test() {

    const req= {
        id:'6848043ba8aceb491f68012b',
        anime:{
    mal_id: 67890,
    title: "Your Name",
    description: "Two teenagers share a profound, magical connection upon discovering they are swapping bodies. Things become even more complicated when the boy and girl decide to meet in person.",
    rating: 8.4,
    status: "Movie",
    year: 2016,
    episodes: 1,
    genre: "Romance, Supernatural, Drama",
    image: "https://cdn.myanimelist.net/images/anime/5/87048.jpg"
},rating:8
    }

    useEffect(()=>{
        axios.post('/api/updateFavourites',req).then((res)=>console.log(res))
    },[])
  return (
    <div>test</div>
  )
}

export default Test