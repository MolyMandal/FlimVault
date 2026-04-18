import React, { useEffect, useState } from 'react'
import MovieCard from './MovieCard'
import Banner from './Banner'

function Movies({ handleAddtoWatchlist, handleRemoveFromWatchlist, watchlist }) {

  const [movies, setMovies] = useState([])
  const [bannerMovie, setBannerMovie] = useState(null)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")

  useEffect(() => {

    // 🔍 If searching → use SEARCH API
    if (search.trim() !== "") {
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=9b9ba28e8707a94f31e0794143878c0a&query=${search}`)
        .then(res => res.json())
        .then(data => {
          setMovies(data.results || [])
          setBannerMovie(null) // hide banner during search
        })
    } 
    
    // 🎬 If no search → show normal popular movies
    else {
      fetch(`https://api.themoviedb.org/3/movie/popular?api_key=9b9ba28e8707a94f31e0794143878c0a&page=${page}`)
        .then(res => res.json())
        .then(data => {
          setMovies(data.results)
          setBannerMovie(data.results[0])
        })
    }

  }, [page, search])

  return (
    <div className="pt-16">

      {/* 🎬 Show banner only when NOT searching */}
      {!search && <Banner movie={bannerMovie} />}

      <h1 className='text-2xl text-center mt-5'>
        {search ? `🔍 Results for "${search}"` : "🔥 Trending Movies"}
      </h1>

      {/* 🔍 SEARCH */}
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search ANY movie..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 m-4 w-1/2"
        />
      </div>

      {/* 🎬 MOVIES */}
      <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5 p-5'>
        {movies.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
            handleAddtoWatchlist={handleAddtoWatchlist}
            handleRemoveFromWatchlist={handleRemoveFromWatchlist}
            watchlist={watchlist}
          />
        ))}
      </div>

      {/* 📄 Pagination only when NOT searching */}
      {!search && (
        <div className="flex justify-center gap-4 mb-5">
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>
            Prev
          </button>
          <span>{page}</span>
          <button onClick={() => setPage(page + 1)}>
            Next
          </button>
        </div>
      )}

    </div>
  )
}

export default Movies