import React from "react";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import LoginForm from "./pages/LoginForm"
import "./styles/login.css"
import SignUp from "./pages/SignUp"
import MovieList from "./pages/MovieList"
import Search from "./pages/Search";

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
        <Route path="/login" element={<LoginForm switchToSignUp={switchToSignUp}/>} />
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
