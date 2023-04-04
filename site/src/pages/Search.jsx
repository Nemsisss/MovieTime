import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/search.css";
import httpRequest from "../utils/httpRequest";
import "regenerator-runtime/runtime";
import { useLocation } from 'react-router-dom';

function Search({ onViewDetails }) {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get('userId'); //access unique userId
    console.log(userId);
//  const [searching, setSearching] = useState(false);
 const [message, setMessage] = useState(null);
 const [query, setQuery] = useState("");
 const [movies, setMovies] = useState([]);
 const [selectedOption, setSelectedOption] = useState("genre");
 const [selectedStartYear, setSelectedStartYear] = useState(1900);
 const [selectedEndYear, setSelectedEndYear] = useState(new Date().getFullYear(2023));

 const handleOptionChange = (option) => {
   setSelectedOption(option);
 };
 const handleStartYearChange = (event) => {
   setSelectedStartYear(parseInt(event.target.value));
 };
 const handleEndYearChange = (event) => {
   setSelectedEndYear(parseInt(event.target.value));
};

 const searchMovies = async (e) => {
   e.preventDefault();

//    setSearching(true);
   const apiKey = "00f824df761bd517e281a3753a0a70f1";
   let url = "";
   switch (selectedOption) {
     case "actor":
//        console.log(query);
       url = `https://api.themoviedb.org/3/search/person?api_key=${apiKey}&query=${query}`;
       try {
         const response = await httpRequest(url);
         const data = await response.data;
//          console.log(data.results);
         setMessage(null);
         const personId = data.results[0].id;
         url = `https://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=${apiKey}`;
         const movieResponse = await httpRequest(url);
         const movieData = await movieResponse.data;
         setMessage(null);
         setMovies(movieData.cast);
//          console.log(movieData);
//          setSearching(false);
         setQuery("");
       } catch (err) {
         setMessage("An unexpected error occurred.");
       }
       break;
     case "title":
//        console.log(query);
       url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`;
       try {
         const response = await httpRequest(url);
         const data = await response.data;
         setMessage(null);
         setMovies(data.results);
//          setSearching(false);
         setQuery("");
       } catch (err) {
         setMessage("An unexpected error occurred.");
       }
       break;
     default:
//              console.log(query);
             url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${query}`;
             try {
               const response = await httpRequest(url);
               const data = await response.data;
               setMessage(null);
               setMovies(data.results);
//                setSearching(false);
               setQuery("");
             } catch (err) {
               setMessage("An unexpected error occurred.");
             }
             break;
   }
 };

 const navigate = useNavigate();
 const routeChange = (selected) => {
   onViewDetails(selected);
   let path = `/Details`;
   navigate(path);
 };

 return (
   <div>
     <div id="page-wrapper" className="container">
        <div className="row mt-5">
                    <div className="col-4">
                    <label className="fw-bold" htmlFor="year-picker">Show results starting at year:</label>
                          <input
                            id="year-picker"
                            data-testid="startYear"
                            type="number"
                            min="1900"
                            max={new Date().getFullYear()}
                            value={selectedStartYear}
                            onChange={handleStartYearChange}
                          />
                      </div>
                      <div className="col-3">
                           <label className="fw-bold" htmlFor="year-picker">Up to year:</label>
                               <input
                               data-testid="endYear"
                                 id="year-picker"
                                  type="number"
                                   min="1900"
                                  max={new Date().getFullYear()}
                                  value={selectedEndYear}
                                   onChange={handleEndYearChange}
                                   />
                               </div>
                  </div>
       <div id="search">
         <form onSubmit={searchMovies}>
           <div>
             <select
               name="dropdown"
               style={{ width: "200px" }}
               onChange={(e) => handleOptionChange(e.target.value)}
               value={selectedOption}
               data-testid="options"
             >
               <option value="actor" >Actor</option>
               <option value="genre"  >
                 Genre
               </option>
               <option value="title" >Title</option>
             </select>
           </div>
           <input
             data-testid="searchField"
             id="searchField"
             type="text"
             name="query"
             placeholder="Search movies..."
             value={query}
             onChange={(e) => setQuery(e.target.value)}
//              style={{ borderRadius: "5px" }}
           />
           <button type="submit" style={{ borderRadius: "5px" }}>
             Search{" "}
           </button>
           <small className="mt-2 form-text text-danger" data-testid="error">
             <em id="emphText">{message}</em>
           </small>
         </form>
       </div>
       <div id="movie-container" className="row mx-auto">
         { movies.map((item, idx)=>(
                   (new Date(item.release_date).getFullYear() >= selectedStartYear && new Date(item.release_date).getFullYear() <= selectedEndYear) ?
                     (<div key={idx} className="col-6 col-lg-3 text-center">
                       <img className="thumbnail" src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt="Movie image" />
                         <ul className="list-unstyled">
                           <li className="fw-bold" id="title"> {item.title}</li>
                           <li id="release-date">{item.release_date}</li>
                           <button id="viewDetails" data-testid="viewDetails" type="button" className="btn btn-primary" onClick={()=>routeChange(item.id)} >View Details</button>
                         </ul>
                     </div>):''
                   ))}
       </div>
     </div>
   </div>
 );
}
export default Search;

