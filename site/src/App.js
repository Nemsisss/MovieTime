import React from "react";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import "./styles/login.css"
import SignUp from "./pages/SignUp"
import MovieList from "./pages/MovieList"
import Search from "./pages/Search";
import LogIn from "./pages/LogIn"

function App() {
    const navigate = useNavigate();
    const switchToSignUp = () => {
        let path = '/signUp';
        navigate(path);
    }
    const switchToLogin = () => {
        let path = '/login';
        navigate(path);
    }

  return (
    <div>
      <Routes>
        {/* Root pages, located in /pages/ */}
        <Route path="/login" element={<LogIn switchToSignUp={switchToSignUp}/>} />
        <Route path="/signUp" element={<SignUp switchToLogin={switchToLogin}/>} />
          <Route path="/movie" element={<MovieList />} />
          <Route path="/search" element={<Search />} />
        {/* 404 page not found redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}


export default App;
