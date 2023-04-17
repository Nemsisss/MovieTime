import React, {useState,useEffect} from "react";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import Navbar from '../components/Navbar';

function Details(props){

    // set the inactivity timeout to 60 seconds
    const inactivityTimeout = 60 * 1000; // in milliseconds

    let timeoutId;

    function resetTimeout() {
        // clear the previous timeout (if any)
        clearTimeout(timeoutId);
        //console.log("wow");

        // start a new timeout
        timeoutId = setTimeout(() => {
            // redirect the user to the login page
            window.location.href = "/login";
        }, inactivityTimeout);
    }

// listen for user activity events (e.g. mousemove, keypress, etc.)
    window.addEventListener("mousemove", resetTimeout);
    window.addEventListener("keypress", resetTimeout);
  const [movie, setMovie] = useState([]);
  const [cast, setCast]= useState([]);
  const [crew, setCrew]= useState([]);
  const [message, setMessage] = useState(null);
  useEffect(()=> {

              const url=`https://api.themoviedb.org/3/movie/${props.details}?api_key=00f824df761bd517e281a3753a0a70f1&append_to_response=credits`;
                axios
                    .get(url)
                    .then((res) => {
                    setMessage(null);
                    setMovie(res.data);
                    setCast(res.data.credits.cast);
                    setCrew(res.data.credits.crew);
                    })
            },[]);

const navigate = useNavigate();
const location = useLocation();
const searchParams = new URLSearchParams(location.search);
const userId = searchParams.get('userId');
const genreClickHandler= (genreId)=>{
    props.onLinkClick(genreId);
//         console.log(genreId);
    let path = `/search?userId=${userId}`;
    navigate(path);
}
const actorClickHandler= (actorId)=>{
    props.onActorClick(actorId);
//     console.log(actorId);
    let path = `/search?userId=${userId}`;
    navigate(path);
}
return(
    <div>
        <Navbar />
        <div id="page-wrapper" className="container">
            <div className="row mx-auto mt-5 mb-5 " >
                <div className="col-6" >
                    <div style={{height: '600px'}}>
                        <img className="thumbnail" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="Movie image" />
                    </div>
                </div>
                <div className="col-6">
                    <p> <span className="fw-bold">Title</span>: {movie.original_title}</p>
                    <p> <span className="fw-bold">Release Date</span>: {movie.release_date}</p>
                    <p><span className="fw-bold">Plot:</span> {movie.overview}</p>
                    <p><span className="fw-bold">Genres:</span></p>
                    <p style={{ hidden: true }}>{message}</p>
                    {Array.isArray(movie.genres) && movie.genres.map((item, idx) => (
                        <div key={idx}>
                            <ul>
                                <li><button data-testid="genreLink" type="button" className="btn btn-link" onClick={()=> genreClickHandler(item.id)}>{item.name}</button></li>
                            </ul>
                        </div>
                    ))}
                    <p className="fw-bold">Production:</p>
                    {Array.isArray(movie.production_companies) && movie.production_companies.map((item, idx) => (
                        <div key={idx} >
                            <ul>
                                <li>{item.name}</li>
                            </ul>
                        </div>
                    ))}
                    <p className="fw-bold">Directors:</p>
                    {Array.isArray(crew) && (
                        <ul>
                            {crew.filter(item => item.known_for_department === 'Directing').map((item, idx, arr) => {
                                if (arr.findIndex(i => i.name === item.name) !== idx) {
                                    return null; // Skip repeated names
                                }
                                return (
                                    <li key={idx}>
                                        {item.name}
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                    <p className="fw-bold">Cast:</p>
                    <div className="container" style={{ whiteSpace: 'nowrap', overflowX: 'auto', backgroundColor: '#dedede', height: '70px' }} >
                        {Array.isArray(cast) && cast.map((item, idx) => (
                            <div key={idx} style={{ display: 'inline-block', marginRight: '20px', paddingTop: '10px'}}>
                                <div className="col-6" style={{ color: 'black', textDecoration: 'none',fontSize:'18px' }}>
                                    <button data-testid="actorLink" type="button" className="btn btn-link" onClick={()=> actorClickHandler(item.id)}>{item.name}</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
)
}
export default Details;