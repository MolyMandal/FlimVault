import React, { useState } from 'react'

function Watchlist({ watchlist, setWatchlist }) {

  const genreIds = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    27: "Horror",
    9648: "Mystery",
    10749: "Romance",
    878: "Sci-Fi",
    53: "Thriller"
  };

  const [search, setSearch] = useState("");
  const [currGenre, setCurrGenre] = useState("All Genres");

  const [ratingSort, setRatingSort] = useState(null);
  const [popSort, setPopSort] = useState(null);

  // ❌ Delete
  const handleDelete = (movie) => {
    setWatchlist(watchlist.filter((m) => m.id !== movie.id));
  };

  // 🎯 Get Genres
  let allGenres = watchlist.flatMap((movie) =>
    movie.genre_ids?.map(id => genreIds[id]).filter(Boolean)
  );

  allGenres = ["All Genres", ...new Set(allGenres)];

  // 🎯 Filtering
  let filteredMovies = [...watchlist];

  if (currGenre !== "All Genres") {
    filteredMovies = filteredMovies.filter((movie) =>
      movie.genre_ids?.some(id => genreIds[id] === currGenre)
    );
  }

  filteredMovies = filteredMovies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  // 🎯 Sorting
  if (ratingSort === "asc") {
    filteredMovies.sort((a, b) => a.vote_average - b.vote_average);
  } else if (ratingSort === "desc") {
    filteredMovies.sort((a, b) => b.vote_average - a.vote_average);
  }

  if (popSort === "asc") {
    filteredMovies.sort((a, b) => a.popularity - b.popularity);
  } else if (popSort === "desc") {
    filteredMovies.sort((a, b) => b.popularity - a.popularity);
  }

  return (
    <div className='flex flex-col items-center mt-10'>

      {/* 🎯 GENRE BUTTONS */}
      <div className='flex flex-wrap justify-center gap-3 m-4'>
        {allGenres.map((genre, index) => (
          <div 
            key={index}
            onClick={() => setCurrGenre(genre)}
            className={`px-4 py-2 rounded-xl cursor-pointer ${
              currGenre === genre
                ? "bg-blue-500 text-white"
                : "bg-gray-400/50 text-white"
            }`}
          >
            {genre}
          </div>
        ))}
      </div>

      {/* 🔍 SEARCH */}
      <input 
        type='text'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder='Search movies...'
        className='border p-3 w-1/2 rounded mb-5'
      />

      {/* 📊 TABLE */}
      <div className='w-3/4'>
        <table className='w-full text-center border'>

          <thead className='bg-gray-200'>
            <tr>
              <th>Name</th>

              {/* ⭐ Rating */}
              <th onClick={() => {
                setRatingSort(ratingSort === "asc" ? "desc" : "asc");
                setPopSort(null);
              }}>
                Rating {ratingSort === "asc" ? "⬆️" : ratingSort === "desc" ? "⬇️" : ""}
              </th>

              {/* 📊 Popularity */}
              <th onClick={() => {
                setPopSort(popSort === "asc" ? "desc" : "asc");
                setRatingSort(null);
              }}>
                Popularity {popSort === "asc" ? "⬆️" : popSort === "desc" ? "⬇️" : ""}
              </th>

              <th>Genre</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {filteredMovies.map((movie) => (
              <tr key={movie.id} className="border-b">

                <td className='flex items-center gap-4 px-4 py-2'>
                  <img 
                    className='h-20'
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
                    alt=""
                  />
                  {movie.title}
                </td>

                <td>{movie.vote_average}</td>
                <td>{movie.popularity}</td>

                <td>
                  {movie.genre_ids?.map(id => genreIds[id]).join(", ") || "Unknown"}
                </td>

                <td 
                  className='text-red-500 cursor-pointer'
                  onClick={() => handleDelete(movie)}
                >
                  Delete
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  )
}

export default Watchlist