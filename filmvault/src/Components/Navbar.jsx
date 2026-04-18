import React from 'react'
import { Link } from "react-router-dom"

function Navbar() {
  return (
    <div className="bg-black text-white p-4 flex gap-6 text-xl font-bold fixed top-0 left-0 w-full z-50">

      <Link to="/">Movies</Link>
      <Link to="/watchlist">Watchlist</Link>

    </div>
  )
}

export default Navbar