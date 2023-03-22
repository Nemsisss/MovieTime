import React from 'react';
import renderer from 'react-test-renderer';
import searchMovies from '../pages/Search.jsx';
import Search from '../pages/Search.jsx';
import httpRequest from '../utils/httpRequest.jsx';
const axios= require("axios");
jest.mock('axios');
import { render, fireEvent, screen,waitFor } from '@testing-library/react';

test("correctly fetches a movie result for Shrek", async () => {
  const { getByTestId } = render(<Search />);
  const searchField = getByTestId("searchField");
  render(<Search />);
  const query = "Shrek";
  const apiKey = "00f824df761bd517e281a3753a0a70f1";
    axios.get.mockResolvedValue({
     data:
        {
            page: 1,
            results:
                [
                  {
                    adult: false,
                    backdrop: "/sRvXNDItGlWCqtO3j6wks52FmbD.jpg",
                    genre_ids: [16, 35, 14, 12, 10751],
                    id: 808,
                    original_language: "en",
                    original_title: "Shrek",
                    overview:
                      "It ain't easy bein' green -- especially if you're a likable (albeit smelly) ogre named Shrek. On a mission to retrieve a gorgeous princess from the clutches of a fire-breathing dragon, Shrek teams up with an unlikely compatriot -- a wisecracking donkey.",
                    popularity: 207.13,
                    poster_path: "/jhTVNBVkdS4Wf6NXYA9kRKQU3YM.jpg",
                    release_date: "2001-05-18",
                    title: "Shrek",
                    video: false,
                    vote_average: 7.716,
                    vote_count: 14992
                  }
                ],
                total_pages: 2,
                total_results: 25
        }
})
  fireEvent.change(searchField, { target: { value: "Shrek" } });
  fireEvent.submit(searchField);
   expect(await screen.findByText('Shrek')).toBeInTheDocument();
});

test("fails to fetch a movie result for shrek", async () => {
  const { getByTestId } = render(<Search />);
  const searchField = getByTestId("searchField");
  render(<Search />);
  const query = "Shrek";
  const apiKey = "00f824df761bd517e281a3753a0a70f1";
    axios.get.mockRejectedValueOnce({
     data:
        {
            page: 1,
            results:
             [],
             total_pages: 2,
             total_results: 25
        }

})
  fireEvent.change(searchField, { target: { value: "Shrek" } });
  fireEvent.submit(searchField);
  expect(await screen.findByText('An unexpected error occurred.')).toBeInTheDocument();
});

