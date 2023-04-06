import React, {useState} from "react";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import LoginForm from "./pages/LogIn.jsx"
import "./styles/login.css"
import SignUp from "./pages/SignUp"
import MovieList from "./pages/MovieList"
import Search from "./pages/Search";
import Details from "./pages/Details";
import UserList from "./pages/UserList"

function App() {
    const [moviesList, setMoviesList] = useState(null);
    const [genreQuery, setGenreQuery] = useState(null);
    const [actorQuery, setActorQuery] = useState(null);

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
          <Route path="/search" element={<Search onViewDetails={setMoviesList} gQuery={genreQuery} setGquery={setGenreQuery} aQuery={actorQuery} setAquery={setActorQuery}/>} />
        <Route path="/details" element={<Details details={moviesList} onLinkClick={setGenreQuery} onActorClick={setActorQuery}/>} />
          <Route path="/user" element={<UserList />} />
        {/* 404 page not found redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;