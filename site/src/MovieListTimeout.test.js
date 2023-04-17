import MovieList from './pages/MovieList.jsx';
import { render } from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';

describe('movie list component timeout', () => {
    jest.useFakeTimers(); // mock setTimeout and clearTimeout
    jest.setTimeout(100000);
    it('no inactivity for movie page', () => {
        const setTimeoutSpy = jest.spyOn(window, 'setTimeout');
        render(<MovieList />,{wrapper: BrowserRouter});

        jest.advanceTimersByTime(30000);
        window.dispatchEvent(new MouseEvent('mousemove'));

        // verify that resetTimeout is called and the timeout is reset
        expect(setTimeoutSpy).toHaveBeenCalledTimes(1);
    });
    it('should redirect to login page after inactivity timeout', () => {
        render(<MovieList />,{wrapper: BrowserRouter});

        jest.advanceTimersByTime(60000);

        // verify that the user is redirected to the login page
        expect(window.location.href).toBe('http://localhost/');
    });
});