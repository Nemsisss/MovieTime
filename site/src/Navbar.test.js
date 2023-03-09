import ImageSlider from "./components/ImageSlider.jsx"
import MovieList from "./pages/MovieList.jsx"
import {render, screen, cleanup, getByLabelText, fireEvent} from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import Navbar from "./components/Navbar"
import {BrowserRouter as Router} from 'react-router-dom';


describe("testing navbarlist", () => {
    it("navbar", () => {
        render(<Router><Navbar/></Router>);
    });
    it("testing other button", () => {
        render(<Router><Navbar/></Router>);
        const button = screen.getByTestId('other');
        fireEvent.click(button);
    });
    it("testing movie button", () => {
        render(<Router><Navbar/></Router>);
        const button = screen.getByTestId('movie');
        fireEvent.click(button);
    });
    it("testing home button", () => {
        render(<Router><Navbar/></Router>);
        const button = screen.getByTestId('home');
        fireEvent.click(button);
    });
});