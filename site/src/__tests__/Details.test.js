import { render, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import Details from '../pages/Details.jsx';
import { act } from 'react-dom/test-utils';

describe('Details component', () => {
  beforeEach(() => {
    jest.spyOn(axios, 'get').mockResolvedValue({
      data:{
             adult: false,
             genres: [{id: 12, name: 'Adventure'}, {id: 18, name: 'Drama'} ],
             overview:"The story of an Indian boy named Pi, a zookeeper's son who finds himself in the company of a hyena, zebra, orangutan, and a Bengal tiger after a shipwreck sets them adrift in the Pacific Ocean.",
             poster_path: "/mYDKm9HxImm8PRru3KbkHAe1cmk.jpg",
             release_date: "2012-11-20",
             original_title: "Life of Pi",
              production_companies: [
                                     {name: "Fox 2000 Pictures"},
                                     {name: "Dune Entertainment"},
                                     {name: "Ingenious Media"},
                                     {name: "Haishang Films"},
                                     {name: "Big Screen Productions"},
                                     {name: "Ingenious Film Partners"},
                                     {name: "Netter Productions"},],
              credits:{
                       cast: [{name: "Suraj Sharma"}],
                       crew: [{
                               known_for_department:"Directing",
                               name: "Ang Lee"
                               }]
                       }
              },
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('fetches movie details and updates state', async () => {
    const props = { details: '87827' };
    const { getByText } = render(<Details {...props} />);
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        'https://api.themoviedb.org/3/movie/87827?api_key=00f824df761bd517e281a3753a0a70f1&append_to_response=credits'
      );
    });
   expect(await screen.findByText(/Ang Lee/)).toBeInTheDocument();
    const dateRegex = /2012-11-20/;
    const titleRegex = /Life of Pi/;
    const genreRegex = /Adventure/;
    expect(screen.getByText(dateRegex)).toBeInTheDocument();
    expect(screen.getByText(titleRegex)).toBeInTheDocument();
    expect(screen.getByText(genreRegex)).toBeInTheDocument();
    expect(getByText("Suraj Sharma")).toBeInTheDocument();
    expect(getByText("The story of an Indian boy named Pi, a zookeeper's son who finds himself in the company of a hyena, zebra, orangutan, and a Bengal tiger after a shipwreck sets them adrift in the Pacific Ocean." )).toBeInTheDocument();
  });
});