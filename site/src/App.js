import React, {useState} from "react";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import LoginForm from "./pages/LogIn.jsx"
import "./styles/login.css"
import SignUp from "./pages/SignUp"
import MovieList from "./pages/MovieList"
import Search from "./pages/Search";
import Details from "./pages/Details";
import UserList from "./pages/UserList";

function App() {
    const [moviesList, setMoviesList] = useState(null);
    const [userID, setUserID]= useState(null);
    const [genreQuery, setGenreQuery] = useState(null);
    const [actorQuery, setActorQuery] = useState(null);
    const [hasComeFromValid, setHasComeFromValid] = useState(false);

    const navigate = useNavigate();
    const switchToSignUp = () => {
        let path = '/signUp';
        navigate(path);
    }
    const switchToLogin = () => {
        let path = '/login';
        navigate(path);
    }
    const switchToSearch = (userId) => {
        setHasComeFromValid(true);
        navigate(`/search?userId=${userId}`);
    }

  return (
    <div>
      <Routes>
        {/* Root pages, located in /pages/ */}
        <Route path="/login" element={<LoginForm switchToSignUp={switchToSignUp} switchToSearch={switchToSearch}/>} />
        <Route path="/signUp" element={<SignUp switchToLogin={switchToLogin} switchToSearch={switchToSearch}/>} />
          <Route path="/movie" element={<MovieList userId={userID}/>} />
          <Route path="/search" element={<Search onViewDetails={setMoviesList} gQuery={genreQuery} setGquery={setGenreQuery} aQuery={actorQuery} setAquery={setActorQuery} setUid={setUserID} hasComeFromValid={hasComeFromValid} setHasComeFromValid={setHasComeFromValid}/>} />
        <Route path="/details" element={<Details userId={userID}  details={moviesList} onLinkClick={setGenreQuery} onActorClick={setActorQuery} hasComeFromValid={hasComeFromValid} setHasComeFromValid={setHasComeFromValid}/>} />
          <Route path="/user" element={<UserList userId={userID}/>} />
        {/* 404 page not found redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;
