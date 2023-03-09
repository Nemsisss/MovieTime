import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "./Auth"
import LoginForm from "./LoginForm"
import "./styles/login.css"
import { BrowserRouter } from "react-router-dom"
import SignUp from "./pages/SignUp"
import MovieList from "./pages/MovieList"

function App() {
  return (
    <div>
      <Routes>
        {/* Root pages, located in /pages/ */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/signUp" element={<SignUp />} />
          <Route path="/movie" element={<MovieList />} />
        {/* 404 page not found redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;
