import { useState, useEffect } from "react";
import "./App.css";

import Movies from "./Components/Movies";
import Navbar from "./Components/Navbar";
import Watchlist from "./Components/Watchlist";
import MovieDetails from "./Components/MovieDetails";

import { Routes, Route } from "react-router-dom";

function App() {

  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("movies");
    if (data) setWatchlist(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(watchlist));
  }, [watchlist]);

  const handleAddtoWatchlist = (movie) => {
    if (!watchlist.some((m) => m.id === movie.id)) {
      setWatchlist([...watchlist, movie]);
    }
  };

  const handleRemoveFromWatchlist = (movie) => {
    setWatchlist(watchlist.filter((m) => m.id !== movie.id));
  };

  return (
    <>
      <Navbar />   {/* ✅ Always on top */}

      <Routes>
        <Route
          path="/"
          element={
            <Movies
              handleAddtoWatchlist={handleAddtoWatchlist}
              handleRemoveFromWatchlist={handleRemoveFromWatchlist}
              watchlist={watchlist}
            />
          }
        />

        <Route
          path="/watchlist"
          element={
            <Watchlist
              watchlist={watchlist}
              setWatchlist={setWatchlist}
            />
          }
        />

        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </>
  );
}

export default App;