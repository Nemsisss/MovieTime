import ImageSlider from "../ImageSlider.jsx"
import MovieList from "../../pages/MovieList.jsx"
import {render, screen, cleanup, getByLabelText, fireEvent} from '@testing-library/react'
import userEvent from "@testing-library/user-event";


describe('Image carosel', () => {
    it("Initial Landing Page", () => {
        const slides = [
            {name: "Titanic", image: "https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg" , plot: "Jack and Rose have a love story", release: "1997"},
            {name: "Avatar The Way of Water ", image: "https://lumiere-a.akamaihd.net/v1/images/p_avatar_thewayofwater_97_v2_01ccadaf.png", plot: "blue people have fun", release: "2022"},
            {name: "Avatar", image: "https://upload.wikimedia.org/wikipedia/en/d/d6/Avatar_%282009_film%29_poster.jpg", plot: "blue people origin story", release: "2009" }
        ];
       const {container} = render(<ImageSlider slides = {slides}/>);
       const movie_body = screen.getByTestId("movie-image-body");
       const image = screen.getByRole('img');
       expect(movie_body).toHaveTextContent(slides[0].name);
       expect(movie_body).toHaveTextContent(slides[0].plot);
       expect(image).toHaveAttribute('src', slides[0].image);

    });
    it ("screen render", () => {
        const slides = [
            {name: "Titanic", image: "https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg" , plot: "Jack and Rose have a love story", release: "1997"},
            {name: "Avatar The Way of Water ", image: "https://lumiere-a.akamaihd.net/v1/images/p_avatar_thewayofwater_97_v2_01ccadaf.png", plot: "blue people have fun", release: "2022"},
            {name: "Avatar", image: "https://upload.wikimedia.org/wikipedia/en/d/d6/Avatar_%282009_film%29_poster.jpg", plot: "blue people origin story", release: "2009" }
        ];
        const {container} = render(<ImageSlider slides = {slides}/>);
    });
    it ("testing the left click function", () => {
        const slides = [
            {name: "Titanic", image: "https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg" , plot: "Jack and Rose have a love story", release: "1997"},
            {name: "Avatar The Way of Water ", image: "https://lumiere-a.akamaihd.net/v1/images/p_avatar_thewayofwater_97_v2_01ccadaf.png", plot: "blue people have fun", release: "2022"},
            {name: "Avatar", image: "https://upload.wikimedia.org/wikipedia/en/d/d6/Avatar_%282009_film%29_poster.jpg", plot: "blue people origin story", release: "2009" }
        ];
        const {container} = render(<ImageSlider slides = {slides}/>);
        const button = screen.getByTestId('left-button');
        fireEvent.click(button);
        const image = screen.getByRole('img');
        expect(image).toHaveAttribute('src', slides[slides.length - 1].image);
        fireEvent.click(button);
        expect(image).toHaveAttribute('src', slides[slides.length - 2].image);
    });
    it ("testing the right click function", () => {
        const slides = [
            {name: "Titanic", image: "https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg" , plot: "Jack and Rose have a love story", release: "1997"},
            {name: "Avatar The Way of Water ", image: "https://lumiere-a.akamaihd.net/v1/images/p_avatar_thewayofwater_97_v2_01ccadaf.png", plot: "blue people have fun", release: "2022"},
            {name: "Avatar", image: "https://upload.wikimedia.org/wikipedia/en/d/d6/Avatar_%282009_film%29_poster.jpg", plot: "blue people origin story", release: "2009" }
        ];
        const {container} = render(<ImageSlider slides = {slides}/>);
        const RightButton = screen.getByTestId('right-button');
        const LeftButton = screen.getByTestId('left-button');
        fireEvent.click(LeftButton);
        const image = screen.getByRole('img');
        expect(image).toHaveAttribute('src', slides[slides.length - 1].image);
        fireEvent.click(RightButton);
        expect(image).toHaveAttribute('src', slides[0].image);
        fireEvent.click(RightButton);
        expect(image).toHaveAttribute('src', slides[1].image);
    });
    it ("testing the right click function", () => {
        const slides = [
            {name: "Titanic", image: "https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg" , plot: "Jack and Rose have a love story", release: "1997"},
            {name: "Avatar The Way of Water ", image: "https://lumiere-a.akamaihd.net/v1/images/p_avatar_thewayofwater_97_v2_01ccadaf.png", plot: "blue people have fun", release: "2022"},
            {name: "Avatar", image: "https://upload.wikimedia.org/wikipedia/en/d/d6/Avatar_%282009_film%29_poster.jpg", plot: "blue people origin story", release: "2009" }
        ];
        const {container} = render(<ImageSlider slides = {slides}/>);
        const dot = screen.getAllByTestId('dot');
        for (let i = 0; i < dot.length; i++) {
            const button = dot[i];
            fireEvent.click(button);
            const image = screen.getByRole('img');
            expect(image).toHaveAttribute('src', slides[i].image);
        }
    });

});