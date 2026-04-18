import React from 'react'
import { useNavigate } from "react-router-dom"

function MovieCard({ movie, handleAddtoWatchlist, handleRemoveFromWatchlist, watchlist }) {

  const navigate = useNavigate()

  const imageUrl = movie.poster_path
    ? "https://image.tmdb.org/t/p/w500" + movie.poster_path
    : ""

  const isAdded = watchlist.some(m => m.id === movie.id)

  return (
    <div
      onClick={() => navigate(`/movie/${movie.id}`)}
      className='
        h-[300px] 
        bg-cover bg-center 
        rounded-xl 
        flex flex-col justify-between 
        p-2 text-white

        transform transition duration-300
        hover:scale-110 hover:shadow-2xl hover:cursor-pointer
      '
      style={{ backgroundImage: `url(${imageUrl})` }}
    >

      {/* ❤️ Add/Remove */}
      <div
        onClick={(e) => {
          e.stopPropagation()
          isAdded
            ? handleRemoveFromWatchlist(movie)
            : handleAddtoWatchlist(movie)
        }}
        className='bg-black/60 px-2 py-1 rounded'
      >
        {isAdded ? "✅" : "😍"}
      </div>

      {/* 🎬 Title */}
      <h3 className='bg-black/60 p-1 text-sm'>
        {movie.title}
      </h3>

    </div>
  )
}

export default MovieCard