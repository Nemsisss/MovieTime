import renderer from 'react-test-renderer';
import {Search, searchMovies} from '../pages/Search.jsx';
import httpRequest from '../utils/httpRequest.jsx';
jest.mock('../utils/httpRequest.jsx');
//test("Jest properly installed and configured!", ()=>{});

test("correctly fetches a movie result for Shrek", async()=>{
        const query="Shrek";
        const apiKey="00f824df761bd517e281a3753a0a70f1";
        const url= "https://api.themoviedb.org/3/search/movie?api_key="+ apiKey +"&language=en-US&query="+query+"&page=1&include_adult=false";
    const resolvedValue={
        status: 'MOCK',
        data: [{
            adult: false,
            backdrop: "/sRvXNDItGlWCqtO3j6wks52FmbD.jpg",
            genre_ids: [16, 35, 14, 12, 10751],
            id: 808,
            original_language: "en",
            original_title: "Shrek",
            overview: "It ain't easy bein' green -- especially if you're a likable (albeit smelly) ogre named Shrek. On a mission to retrieve a gorgeous princess from the clutches of a fire-breathing dragon, Shrek teams up with an unlikely compatriot -- a wisecracking donkey.",
            popularity: 207.13,
            poster_path: "/jhTVNBVkdS4Wf6NXYA9kRKQU3YM.jpg",
            release_date: "2001-05-18",
            title: "Shrek",
            video: false,
            vote_average: 7.716,
            vote_count: 14992
        }]
    };
    httpRequest.mockResolvedValueOnce(resolvedValue);
    const actualValue =  await httpRequest(url);
    expect(actualValue).toEqual(resolvedValue);
})

