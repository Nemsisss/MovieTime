import React from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
const Navbar = () => {
    const navigate = useNavigate();
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{backgroundColor: "lightblue"}}>
            <a className="navbar-brand" href="#">
                User Navigation
            </a>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link"  onClick={() => {
                            navigate("/home")
                        }}>
                            Home
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link"  onClick={() => {
                            navigate("/other")
                        }}>
                            Other
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link"  onClick={() => {
                            navigate("/movie")
                        }}>
                            Movies
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link"  onClick={() => {
                            navigate("/search")
                        }}>
                             Search Movies <span className="sr-only">(current)</span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
