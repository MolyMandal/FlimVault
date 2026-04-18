import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function MovieDetails() {

  const { id } = useParams()
  const navigate = useNavigate()

  const [movie, setMovie] = useState(null)
  const [trailer, setTrailer] = useState(null)

  // ✅ NEW STATE for popup
  const [showTrailer, setShowTrailer] = useState(false)

  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=9b9ba28e8707a94f31e0794143878c0a`)
      .then(res => res.json())
      .then(data => setMovie(data))

    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=9b9ba28e8707a94f31e0794143878c0a`)
      .then(res => res.json())
      .then(data => {
        const vid = data.results.find(
          v => v.type === "Trailer" && v.site === "YouTube"
        )
        if (vid) setTrailer(vid.key)
      })

  }, [id])

  if (!movie) return <div className="pt-16 text-center">Loading...</div>

  return (
    <div className="p-5 pt-16">

      {/* 🔙 Back */}
      <button 
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-700 text-white px-3 py-1 rounded"
      >
        ⬅ Back
      </button>

      {/* 🎬 Title */}
      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>

      {/* 🎥 Poster */}
      <img 
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
        className="w-[300px] mb-4"
      />

      {/* ⭐ Rating */}
      <p className="mb-2">⭐ {movie.vote_average}</p>

      {/* 📝 Overview */}
      <p className="mb-4">{movie.overview}</p>

      {/* ▶ Trailer Button */}
      {trailer ? (
        <button
          onClick={() => setShowTrailer(true)}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          ▶ Watch Trailer
        </button>
      ) : (
        <p className="text-gray-500">No trailer available 😢</p>
      )}

      {/* 🎬 TRAILER POPUP */}
      {showTrailer && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">

          <div className="relative w-[90%] md:w-[700px]">

            {/* ❌ Close */}
            <button 
              onClick={() => setShowTrailer(false)}
              className="absolute top-[-40px] right-0 text-white text-xl"
            >
              ❌
            </button>

            {/* 🎥 Video */}
            <iframe
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed/${trailer}`}
              title="Trailer"
              allowFullScreen
            ></iframe>

          </div>

        </div>
      )}

    </div>
  )
}

export default MovieDetails