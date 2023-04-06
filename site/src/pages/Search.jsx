import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import "../styles/search.css";
import httpRequest from "../utils/httpRequest";
import Popup from '../components/Popup';
import "regenerator-runtime/runtime";

function Search(props) {
//  const [searching, setSearching] = useState(false);
 const [message, setMessage] = useState(null);
 const [query, setQuery] = useState("");
 const [movies, setMovies] = useState([]);
 const [selectedOption, setSelectedOption] = useState("keyword");
 const [selectedStartYear, setSelectedStartYear] = useState(1900);
 const [selectedEndYear, setSelectedEndYear] = useState(new Date().getFullYear(2023));
 const [hovered, setHovered] = useState(false);
 const [page, setPage] = useState(1);
 const [buttonPopup, setButtonPopup] = useState(false);


 const handleOptionChange = (option) => {
   setSelectedOption(option);
   setPage(1); // reset page to 1
   setMovies([]); // clear movies array
 };
 const handleStartYearChange = (event) => {
   setSelectedStartYear(parseInt(event.target.value));
 };
 const handleEndYearChange = (event) => {
   setSelectedEndYear(parseInt(event.target.value));
};
 const handleHover = () => {
    setHovered(true);
  };
  const handleMouseLeave = () => {
    setHovered(false);
  };
  const loadPageWGenre = async(url)=>{
      props.setGquery(null);
      try {
             const response = await httpRequest(url);
             const data = await response.data;
             setMessage(null);
             setMovies(data.results);
             console.log(data.results);
          } catch (err) {
             setMessage("An unexpected error occurred.");
          }
  }
  const loadPageWactor = async(url)=>{
      props.setAquery(null);
      try{
          const movieResponse = await httpRequest(url);
          const movieData = await movieResponse.data;
          setMovies(movieData.cast);

      }catch (err) {
          setMessage("An unexpected error occurred.");
      }


  }

      if(props.gQuery)
      {
          const url=`https://api.themoviedb.org/3/discover/movie?api_key=00f824df761bd517e281a3753a0a70f1&with_genres=${props.gQuery}`;
          loadPageWGenre(url);
      }
      if(props.aQuery)
      {
//           console.log(props.aQuery);
         const url = `https://api.themoviedb.org/3/person/${props.aQuery}/movie_credits?api_key=00f824df761bd517e281a3753a0a70f1`;
         loadPageWactor(url);
      }


const searchMovies = async (e) => {
  e.preventDefault();
  let url = "";
  const apiKey = "00f824df761bd517e281a3753a0a70f1";
  switch (selectedOption) {
    case "actor":
    url = `https://api.themoviedb.org/3/search/person?api_key=${apiKey}&query=${query}`;
    try {
        const response = await httpRequest(url);
        const data = await response.data;
        console.log(data.results);
        setMessage(null);
        const personId = data.results[0].id;
        url = `https://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=${apiKey}`;
        const movieResponse = await httpRequest(url);
        const movieData = await movieResponse.data;
//         console.log(movieResponse.data)
        setMessage(null);
        setMovies(movieData.cast.slice(0, 10));
        setPage(2);

      } catch (err) {
        setMessage("An unexpected error occurred.");
      }
      break;
    case "title":
      url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=${page}&include_adult=false`;
      try {
        const response = await httpRequest(url);
        const data = await response.data;
        setMessage(null);
        console.log(data.results);
        if (page === 1) {
          setMovies(data.results.slice(0, 10));
        } else {
          setMovies(prevMovies => [...prevMovies, ...data.results.slice(0, 10)]);
        }
        setPage(prevPage => prevPage + 1);
      } catch (err) {
        setMessage("An unexpected error occurred.");
      }
      break;
//     case "keyword":
//       url = `https://api.themoviedb.org/3/search/keyword?api_key=${apiKey}&query=${query}`;
//       try {
//         const response = await httpRequest(url);
//         const data = await response.data;
//         setMessage(null);
//         const keywordId = data.results[0].id;
//         url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_keywords=${keywordId}&page=${page}`;
//         const keywordResponse = await httpRequest(url);
//         const keywordData = await keywordResponse.data;
//         setMessage(null);
//         if (page === 1) {
//           setMovies(keywordData.results.slice(0, 10));
//         } else {
//           setMovies(prevMovies => [...prevMovies, ...keywordData.results.slice(0, 10)]);
//         }
//         setPage(prevPage => prevPage + 1);
//
//       } catch (err) {
//         setMessage("An unexpected error occurred.");
//       }
//       break;

    default:
      url = `https://api.themoviedb.org/3/search/keyword?api_key=${apiKey}&query=${query}`;
          try {
            const response = await httpRequest(url);
            const data = await response.data;
            setMessage(null);
            const keywordId = data.results[0].id;
            url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_keywords=${keywordId}&page=${page}`;
            const keywordResponse = await httpRequest(url);
            const keywordData = await keywordResponse.data;
            setMessage(null);
            if (page === 1) {
              setMovies(keywordData.results.slice(0, 10));
            } else {
              setMovies(prevMovies => [...prevMovies, ...keywordData.results.slice(0, 10)]);
            }
            setPage(prevPage => prevPage + 1);

          } catch (err) {
            setMessage("An unexpected error occurred.");
          }
      break;
  }
//   setQuery("");
};
const handleLoadMore = async (e) => {
  e.preventDefault();
  try {
    await searchMovies(e);
  } catch (err) {
    console.error(err);
  }
};
 const navigate = useNavigate();
 const routeChange = (selected) => {
   props.onViewDetails(selected);
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
               <option value="keyword"  >
                 Keyword
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
           />
           <button type="submit" style={{ borderRadius: "5px" }}>
             Search{" "}
           </button>
           <small className="mt-2 form-text text-danger" data-testid="error">
             <em id="emphText">{message}</em>
           </small>
         </form>
       </div>
       <div id="movie-container" className="row mx-auto" data-testid="movie-container">
         { movies.map((item, idx)=>(
                   (new Date(item.release_date).getFullYear() >= selectedStartYear && new Date(item.release_date).getFullYear() <= selectedEndYear) ?
                     (<div key={idx} className="col-6 col-lg-3 text-center" data-testid="movie-element">
                            <div className="image-container">
                                 <img  className={`thumbnail ${hovered ? 'hover-effect' : ''}`} src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt="Movie image" onMouseEnter={handleHover} onMouseLeave={handleMouseLeave} data-testid="imgTest"/>
                                    <button type="button" className="add-button"  onClick={()=>setButtonPopup(true)} data-testid="addButton" aria-expanded={buttonPopup}>Add</button>
                                    <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                                           <h3>Add Movie</h3>
                                           <p>Choose an option:</p>
                                           <button type="button" className="btn btn-primary" style={{ marginRight: '10px' }} >Create New List</button>
                                           <button type="button" className="btn btn-primary" >Add to Existing List</button>

                                    </Popup>
                            </div>
                         <ul className="list-unstyled">
                           <li className="fw-bold" id="title"> {item.title}</li>
                           <li id="release-date">{item.release_date}</li>
                           <button id="viewDetails" data-testid="viewDetails" type="button" className="btn btn-primary" onClick={()=>routeChange(item.id)} >View Details</button>
                           <button type="button" className="mobile-add-button"  onClick={()=>setButtonPopup(true)} data-testid="mobileAddButton" aria-expanded={buttonPopup}>Add</button>
                         </ul>

                     </div>
                     ):''
                   ))}
                    {movies.length > 0 && (
                    <button className="load-more" onClick={handleLoadMore} data-testid="loadMoreButton">
                        Load More
                    </button>
                  )}
       </div>
     </div>
   </div>
 );
}
export default Search;

