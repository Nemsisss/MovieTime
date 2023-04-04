import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import renderer from 'react-test-renderer';
import searchMovies from '../pages/Search.jsx';
import Search from '../pages/Search.jsx';
import httpRequest from '../utils/httpRequest.jsx';
const axios= require("axios");
jest.mock('axios');
import { render, fireEvent, screen,waitFor } from '@testing-library/react';

test("correctly fetches a movie result for Shrek", async () => {
 const { getByTestId } = render(<Search />, {wrapper: BrowserRouter});
 const searchField = getByTestId("searchField");
 const query = "Shrek";
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
 const { getByTestId } = render(<Search />, {wrapper: BrowserRouter});
 const searchField = getByTestId("searchField");
 const query = "Shrek";
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

test("correctly fetches a movie result for Shrek and title option selected ", async () => {
 const { getByTestId } = render(<Search />, {wrapper: BrowserRouter});
 const searchField = getByTestId("searchField");
 const options = getByTestId("options");
 const query = "Shrek";
 
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
 fireEvent.change(options, { target: { value: "title" } });
 fireEvent.change(searchField, { target: { value: "Shrek" } });
 fireEvent.submit(searchField);
  expect(await screen.findByText('Shrek')).toBeInTheDocument();
});
test("fails to fetch a movie result for shrek with title option", async () => {
 const { getByTestId } = render(<Search />, {wrapper: BrowserRouter});
 const searchField = getByTestId("searchField");
 const query = "Shrek";
 const options = getByTestId("options");
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
 fireEvent.change(options, { target: { value: "title" } });
 fireEvent.change(searchField, { target: { value: "Shrek" } });
 fireEvent.submit(searchField);
 expect(await screen.findByText('An unexpected error occurred.')).toBeInTheDocument();
});

test("correctly fetches a movie result for Shrek with release date filter", async () => {
 const { getByTestId } = render(<Search />, {wrapper: BrowserRouter});
 const searchField = getByTestId("searchField");
 const query = "Shrek";
 const startYear = getByTestId("startYear");
 const endYear = getByTestId("endYear");
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
  fireEvent.change(startYear, { target: { value: "2000" } });
  fireEvent.change(endYear, { target: { value: "2022" } });
 fireEvent.change(searchField, { target: { value: "Shrek" } });
 fireEvent.submit(searchField);
  expect(await screen.findByText('Shrek')).toBeInTheDocument();
  expect(await screen.findByText('2001-05-18')).toBeInTheDocument();
});

test("correctly fetches movies for an actor", async () => {
 const { getByTestId } = render(<Search />, { wrapper: BrowserRouter });
 const searchField = getByTestId("searchField");
 const options=getByTestId("options");
 const query = "Tom Hanks";
 axios.get.mockResolvedValueOnce({
     data: {
       page: 1,
       results: [
         {
           adult: false,
           gender: 2,
           id: 31,
           known_for:[{
           adult: false,
           backdrop_path: "/3h1JZGDhZ8nzxdgvkxha0qBqi05.jpg",
           genre_ids: [35, 18, 10749],
           id: 13,
           media_type: "movie",
           original_language: "en",
           original_title: "Forrest Gump",
           overview: "A man with a low IQ has accomplished great things in his life and been present during significant historic events—in each case, far exceeding what anyone imagined he could do. But despite all he has achieved, his one true love eludes him.",
           popularity: 75.609,
           poster_path: "/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
           release_date: "1994-06-23",
           title: "Forrest Gump",
           video: false,
           vote_average: 8.48,
           vote_count:24378},
           {
           adult: false,
           backdrop_path: "/lxD5ak7BOoinRNehOCA85CQ8ubr.jpg",
           genre_ids: [16, 12, 10751, 35],
           id: 862,
           media_type: "movie",
           original_language: "en",
           original_title: "Toy Story",
           overview: "Led by Woody, Andy's toys live happily in his room until Andy's birthday brings Buzz Lightyear onto the scene. Afraid of losing his place in Andy's heart, Woody plots against Buzz. But when circumstances separate Buzz and Woody from their owner, the duo eventually learns to put aside their differences.",
           popularity: 143.058,
           poster_path: "/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg",
           release_date: "1995-10-30",
           title: "Toy Story",
           video: false,
           vote_average: 7.967,
           vote_count:16502},
           {
            adult: false,
            backdrop_path: "/vxJ08SvwomfKbpboCWynC3uqUg4.jpg",
            genre_ids: [14, 18, 80],
            id: 497,
            media_type: "movie",
            original_language: "en",
            original_title: "The Green Mile",
            overview: "A supernatural tale set on death row in a Southern prison, where gentle giant John Coffey possesses the mysterious power to heal people's ailments. When the cell block's head guard, Paul Edgecomb, recognizes Coffey's miraculous gift, he tries desperately to help stave off the condemned man's execution.",
            popularity: 147.876,
            poster_path: "/o0lO84GI7qrG6XFvtsPOSV7CTNa.jpg",
            release_date: "1999-12-10",
            title: "The Green Mile",
            video: false,
            vote_average: 8.506,
            vote_count:15202}],
           known_for_department: "Acting",
           name: "Tom Hanks",
           original_name: "Tom Hanks",
           popularity: 137.53,
           profile_path: "/xndWFsBlClOJFRdhSt4NBwiPq2o.jpg",
         },
       ],
       total_pages: 1,
       total_results: 1,
     },
   });
   const personID=31;
 axios.get.mockResolvedValueOnce({
   data: {
     page: 1,
     cast: [
       {
         adult: false,
         backdrop_path: "/dGbBnTYxdHf1qyUgHsuFpxn1K4E.jpg",
         character: "Josh Baskin",
         credit_id: "52fe4349c3a36847f8048ac3",
         genre_ids: [14, 18, 35, 10749, 10751],
         id: 2280,
         order: 0,
         original_language: "en",
         original_title: "Big",
         overview: "When a young boy makes a wish at a carnival machine to be big—he wakes up the following morning to find that it has been granted and his body has grown older overnight. But he is still the same 13-year-old boy inside. Now he must learn how to cope with the unfamiliar world of grown-ups including getting a job and having his first romantic encounter with a woman.",
         popularity: 22.994,
         poster_path: "/eWhCDJiwxvx3YXkAFRiHjimnF0j.jpg",
         release_date: "1988-06-03",
         title: "Big",
         video: false,
         vote_average: 7.148,
         vote_count: 3111,
       },
     ],
     total_pages: 1,
     total_results: 1,
   },
 });
 fireEvent.change(options, { target: { value: "actor" } });
 fireEvent.change(searchField, { target: {value: 'Tom Hanks' } });
 fireEvent.submit(searchField);
 expect(await screen.findByText("Big")).toBeInTheDocument();
});
test("fails to fetch a movie result for Tom Hanks with actor option", async () => {
 const { getByTestId } = render(<Search />, {wrapper: BrowserRouter});
 const searchField = getByTestId("searchField");
 const query = "Tom Hanks";
 const options = getByTestId("options");
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
 fireEvent.change(options, { target: { value: "actor" } });
 fireEvent.change(searchField, { target: { value: "Tom Hanks" } });
 fireEvent.submit(searchField);
 expect(await screen.findByText('An unexpected error occurred.')).toBeInTheDocument();
});


test("calls routeChanger() when clicked ", async () => {
const onViewDetails = jest.fn();
 const { getByTestId } = render(<Search onViewDetails={onViewDetails}/>, {wrapper: BrowserRouter});
   const searchField = getByTestId("searchField");
   const query = "Shrek";
 
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
   const details = getByTestId("viewDetails");
   fireEvent.click(details);
      expect(onViewDetails).toHaveBeenCalled();
      expect(await screen.findByText('Shrek')).toBeInTheDocument();
});
