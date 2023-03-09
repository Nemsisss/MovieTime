import ImageSlider from "./components/ImageSlider.jsx"
import MovieList from "./pages/MovieList.jsx"
import {render, screen, cleanup, getByLabelText, fireEvent} from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import {BrowserRouter as Router} from 'react-router-dom';



describe("testing movie list", () => {
    it("see if movie page renders", () => {
        render(<Router>
            <MovieList/>
        </Router>)
    })
});