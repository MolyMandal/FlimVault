import React from 'react'

function Banner({ movie }) {

  const imageUrl = movie?.backdrop_path
    ? "https://image.tmdb.org/t/p/original" + movie.backdrop_path
    : "";

  return (
    <div 
      className='h-[30vh] md:h-[75vh] bg-cover bg-center flex items-end'
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className='text-white text-2xl text-center w-full bg-black/60 p-4'>
        {movie?.title}
      </div>
    </div>
  )
}

export default Banner