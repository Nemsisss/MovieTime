import Search from './pages/Search.jsx';
import { render  } from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';

describe('search component timeout', () => {
    jest.useFakeTimers(); // mock setTimeout and clearTimeout
    jest.setTimeout(100000);
    it('no inactivity for search page', () => {
        render(<Search />,{wrapper: BrowserRouter});

        jest.advanceTimersByTime(30000);
        window.dispatchEvent(new MouseEvent('mousemove'));

    });
    it('should redirect to login page after inactivity timeout', () => {
        render(<Search />,{wrapper: BrowserRouter});

        jest.advanceTimersByTime(60000);

        // verify that the user is redirected to the login page
        expect(window.location.href).toBe('http://localhost/');
    });
});