import MovieList from "./pages/MovieList.jsx"
import {render} from '@testing-library/react'
import {BrowserRouter as Router} from 'react-router-dom';



describe("testing movie list", () => {
    it("see if movie page renders", () => {
        render(<Router>
            <MovieList/>
        </Router>)
    })
});