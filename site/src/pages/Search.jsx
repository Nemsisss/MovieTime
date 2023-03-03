import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import "../styles/search.css";
import Navbar from "../components/Navbar";
import Button from 'react-bootstrap/Button';

function Search(){
const navigate = useNavigate();
 const [searching, setSearching] = useState(false);
 const [message, setMessage] = useState(null);
 const [query, setQuery] = useState('');
 const [movies, setMovies] = useState([]);
const searchMovies=async(e)=>{
e.preventDefault();
setSearching(true);
const apiKey="00f824df761bd517e281a3753a0a70f1";
const url= `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`;

console.log(url);
try{
const response=await fetch(url);
const data = await response.json();
console.log(data);
setMessage(null);
// setMovies(data.Search);
setMovies([]);
setMovies(movies.concat(data.results));
setSearching(false);
setQuery('');
}catch(err){
setMessage('An unexpected error occurred.');
setSearching(false);

}

}

//the list below will be replaced by the list of movies fetched from the API
const items=[
{name: "Titanic", plot:"Jack and Rose have a love story.", release:"1997", image:"https://thumbs.dreamstime.com/b/placeholder-icon-vector-isolated-white-background-your-web-mobile-app-design-placeholder-logo-concept-placeholder-icon-134071856.jpg" },
{name: "Avatar", plot:"Blue people attack the planet brrr.", release:"2009", image:"https://thumbs.dreamstime.com/b/placeholder-icon-vector-isolated-white-background-your-web-mobile-app-design-placeholder-logo-concept-placeholder-icon-134071856.jpg" },
{name:"Avatar the way of water", plot:"More blue people I guess", release:"2022", image: "https://thumbs.dreamstime.com/b/placeholder-icon-vector-isolated-white-background-your-web-mobile-app-design-placeholder-logo-concept-placeholder-icon-134071856.jpg" },
{name: "Titanic", plot:"Jack and Rose have a love story.", release:"1997", image:"https://thumbs.dreamstime.com/b/placeholder-icon-vector-isolated-white-background-your-web-mobile-app-design-placeholder-logo-concept-placeholder-icon-134071856.jpg" },
{name: "Avatar", plot:"Blue people attack the planet brrr.", release:"2009", image:"https://thumbs.dreamstime.com/b/placeholder-icon-vector-isolated-white-background-your-web-mobile-app-design-placeholder-logo-concept-placeholder-icon-134071856.jpg" },
{name:"Avatar the way of water", plot:"More blue people I guess", release:"2022", image: "https://thumbs.dreamstime.com/b/placeholder-icon-vector-isolated-white-background-your-web-mobile-app-design-placeholder-logo-concept-placeholder-icon-134071856.jpg" },
{name: "Titanic", plot:"Jack and Rose have a love story.", release:"1997", image:"https://thumbs.dreamstime.com/b/placeholder-icon-vector-isolated-white-background-your-web-mobile-app-design-placeholder-logo-concept-placeholder-icon-134071856.jpg" },
{name: "Avatar", plot:"Blue people attack the planet brrr.", release:"2009", image:"https://thumbs.dreamstime.com/b/placeholder-icon-vector-isolated-white-background-your-web-mobile-app-design-placeholder-logo-concept-placeholder-icon-134071856.jpg" },
{name:"Avatar the way of water", plot:"More blue people I guess", release:"2022", image: "https://thumbs.dreamstime.com/b/placeholder-icon-vector-isolated-white-background-your-web-mobile-app-design-placeholder-logo-concept-placeholder-icon-134071856.jpg" },
{name: "Titanic", plot:"Jack and Rose have a love story.", release:"1997", image:"https://thumbs.dreamstime.com/b/placeholder-icon-vector-isolated-white-background-your-web-mobile-app-design-placeholder-logo-concept-placeholder-icon-134071856.jpg" },
{name: "Avatar", plot:"Blue people attack the planet brrr.", release:"2009", image:"https://thumbs.dreamstime.com/b/placeholder-icon-vector-isolated-white-background-your-web-mobile-app-design-placeholder-logo-concept-placeholder-icon-134071856.jpg" },
{name:"Avatar the way of water", plot:"More blue people I guess", release:"2022", image: "https://thumbs.dreamstime.com/b/placeholder-icon-vector-isolated-white-background-your-web-mobile-app-design-placeholder-logo-concept-placeholder-icon-134071856.jpg" },
];

return(
    <div>
        <Navbar/>
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
                <img className="thumbnail" src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt="Movie image" />
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
