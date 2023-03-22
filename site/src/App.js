import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginForm from "./pages/LoginForm"
import "./styles/login.css"
import SignUp from "./pages/SignUp"
import MovieList from "./pages/MovieList"
import Search from "./pages/Search";

function App() {
  return (
    <div>
      <Routes>
        {/* Root pages, located in /pages/ */}
        <Route path="/login" element={<LoginForm />} />
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
