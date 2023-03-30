import React, {useState} from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Search from "./pages/Search";
import Details from "./pages/Details";


function App() {

  const [moviesList, setMoviesList] = useState(null);

  return (
    <div>
      <Routes>
        {/* Root pages, located in /pages/ */}
        <Route path="/search" element={<Search onViewDetails={setMoviesList}/>} />
        <Route path="/details" element={<Details details={moviesList} />} />
        {/* 404 page not found redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;