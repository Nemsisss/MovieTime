import React, {useState,useEffect} from "react";
// import httpRequest from "../utils/httpRequest";
import axios from "axios";

function Details(props){
  const [movie, setMovie] = useState([]);
  const [cast, setCast]= useState([]);
  const [crew, setCrew]= useState([]);
  const [message, setMessage] = useState(null);
//     console.log(props.details);
  useEffect(()=> {
              const apiKey="00f824df761bd517e281a3753a0a70f1";
              const url=`https://api.themoviedb.org/3/movie/${props.details}?api_key=${apiKey}&append_to_response=credits`;
                axios
                    .get(url)
                    .then((res) => {
//                     console.log(res.data.genres);
//                     console.log(res.data);
//                     console.log(res.data.credits);
                    setMessage(null);
                    setMovie(res.data);
                    setCast(res.data.credits.cast);
                    setCrew(res.data.credits.crew);
                    })
            },[]);
return(
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
                             <li>{item.name}</li>
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
                        {item.name}
                        </div>
                      </div>
                 ))}
                 </div>
             </div>
 </div>
 </div>
)
}
export default Details;