import React from 'react'
import "../styles/movielist.css"
import Navbar from "../components/Navbar"
import ImageSlider from "../components/ImageSlider.jsx"


function MovieList()  {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //
    //     }
    // }
    const slides = [
        {name: "Titanic", image: "https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg" , plot: "Jack and Rose have a love story", release: "1997"},
        {name: "Avatar The Way of Water ", image: "https://lumiere-a.akamaihd.net/v1/images/p_avatar_thewayofwater_97_v2_01ccadaf.png", plot: "blue people have fun", release: "2022"},
        {name: "Avatar", image: "https://upload.wikimedia.org/wikipedia/en/d/d6/Avatar_%282009_film%29_poster.jpg", plot: "blue people origin story", release: "2009" }
    ];

    const containerStyles = {
        width: "500px",
        height: "500px",
        margin: "0 auto",
    };


    // const movie_feature_map_titanic = {
    //     name: "Titanic",
    //     plot: "Jack and Rose have a love story",
    //     release: "1997"
    // }
    //
    // const movie_feature_map_avatar = {
    //     name: "Avtar",
    //     plot: "Blue people attack the planet brrr",
    //     release: "2009"
    // }
    //
    // const movie_feature_map_avatar2 = {
    //     name: "Avatar the way of water",
    //     plot: "More blue people I guess",
    //     release: "2022"
    // }
    //
    // const movie_map_list = [];
    // for (let i = 0; i < 50; i++) {
    //     movie_map_list.push(movie_feature_map_titanic);
    // }
    return(
        <div>
            <Navbar/>
            <div className = "header">User X List</div>
            <div style = {containerStyles}>
                <ImageSlider slides = {slides}/>
            </div>
        </div>
        // <div className = "movie-body">
        //     <Navbar/>
        //     <div className = "header">User X List</div>
        //     <table className="table table-movie">
        //         <thead>
        //         <tr>
        //             <th scope="col">#</th>
        //             <th scope="col">Name</th>
        //             <th scope="col">Plot</th>
        //             <th scope="col">Release Date</th>
        //             <th scope="col">Link</th>
        //         </tr>
        //         </thead>
        //         <tbody>
        //             {movie_map_list.map((value, index) => (
        //                 <tr key = {index}>
        //                     <th scope="row">{index}</th>
        //                     <td>{value.name}</td>
        //                     <td>{value.plot}</td>
        //                     <td>{value.release}</td>
        //                     <td>
        //                         <button>Click me</button>
        //                     </td>
        //                 </tr>
        //             ))}
        //         </tbody>
        //     </table>
        //     <button className = "home-button"
        //             onClick={() => {
        //                 navigate("/home");
        //             }}
        //     >
        //         Click to go to movie page
        //     </button>
        // </div>
    );
}

export default MovieList