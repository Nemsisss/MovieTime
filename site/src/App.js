import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./styles/login.css"
import SignUp from "./pages/SignUp"
import MovieList from "./pages/MovieList"
import Search from "./pages/Search";
import LogIn from "./pages/LogIn"

function App() {
  return (
    <div>
      <Routes>
        {/* Root pages, located in /pages/ */}
        <Route path="/login" element={<LogIn />} />
        <Route path="/signUp" element={<SignUp />} />
          <Route path="/movie" element={<MovieList />} />
          <Route path="/search" element={<Search />} />
        {/* 404 page not found redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}


export default App;
