import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.css';
// import "../styles/search.css";
// import Navbar from "../components/Navbar";
import httpRequest from "../utils/httpRequest";
import "regenerator-runtime/runtime";

function Search(){
    const navigate = useNavigate();
    const [searching, setSearching] = useState(false);
    const [message, setMessage] = useState(null);
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const searchMovies = async(e)=>{
        e.preventDefault();
        setSearching(true);
        const apiKey="00f824df761bd517e281a3753a0a70f1";
        const url= `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`;
        try{
            const response=await httpRequest(url);
            const data = await response.data;
    //         const data = await response;
            console.log(data);
            setMessage(null);
            setMovies([]);
            setMovies(data.results);
            setSearching(false);
            setQuery('');
        }catch(err){
            setMessage('An unexpected error occurred.');
            setSearching(false);
        }
}

return(
    <div>
{/*         <Navbar/> */}
        <div id="page-wrapper" className="container">
         <div id='search'>
               <form onSubmit={searchMovies} >
                 <input id= "searchField" type="text" name="query" placeholder="Search movies by name..."
                 value={query} onChange={(e) =>setQuery(e.target.value)}/>
                 <button type="submit" >Search </button>
               </form>
         </div>
          <div id="movie-container" className="row mx-auto">
            { movies.map((item, idx)=>(
              <div key={idx} className="col-6 col-lg-3 text-center">
                <img className="thumbnail" src={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : "https://tube.hk/images/titles_cache/x1000x1375_movienophoto_2014_1000x1375.jpg.pagespeed.ic.F2w7OoRQoB.webp"} alt="Movie image" />
                  <ul className="list-unstyled">
                    <li className="font-weight-bold" id="title"> {item.title}</li>
                    <li id="plot">{item.overview}</li>
                    <li id="release-date">{item.release_date}</li>
                  </ul>
              </div>
            ))}
            </div>
        </div>
    </div>
    );
}
 export default Search;