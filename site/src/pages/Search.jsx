import React from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import "../styles/search.css";
import Navbar from "../components/Navbar";

function Search(){
const navigate = useNavigate();

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
          <div id="movie-container" className="row mx-auto">
            { items.map((item, idx)=>(
              <div key={idx} className="col-6 col-lg-3 text-center">
                <img className="thumbnail" src= {item.image} alt="Movie image" />
                  <ul className="list-unstyled">
                    <li className="font-weight-bold" id="title"> {item.name}</li>
                    <li id="plot">{item.plot}</li>
                    <li id="release-date">{item.release}</li>
                  </ul>
              </div>
            ))}
            </div>
        </div>
    </div>
    );
}
 export default Search;