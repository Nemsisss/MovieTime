import React, {useState} from "react";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import LoginForm from "./pages/LogIn.jsx"
import "./styles/login.css"
import SignUp from "./pages/SignUp"
import MovieList from "./pages/MovieList"
import Search from "./pages/Search";
import Details from "./pages/Details";
import UserList from "./pages/UserList"
import Movies from "./pages/Movies"

function App() {
    const [moviesList, setMoviesList] = useState(null);
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
        navigate(`/search?userId=${userId}`);
    }

  return (
    <div>
      <Routes>
        {/* Root pages, located in /pages/ */}
        <Route path="/login" element={<LoginForm switchToSignUp={switchToSignUp} switchToSearch={switchToSearch}/>} />
        <Route path="/signUp" element={<SignUp switchToLogin={switchToLogin} switchToSearch={switchToSearch}/>} />
          <Route path="/movie" element={<MovieList />} />
          <Route path="/search" element={<Search onViewDetails={setMoviesList}/>} />
        <Route path="/details" element={<Details details={moviesList} />} />
          <Route path="/user" element={<UserList />} />
          <Route path="/movies" element={<Movies />} />
        {/* 404 page not found redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;