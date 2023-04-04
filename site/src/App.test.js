import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import App from './App';

describe('App', () => {
    it('renders the login form by default', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        );

        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
    });

    it('navigates to the sign up page when the "Sign Up" button is clicked', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        );

        const signUpButton = screen.getByTestId('toSignUp');
        expect(signUpButton).toBeInTheDocument();

        act(() => {
            signUpButton.click();
        });

        expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
        //expect(screen.getByRole('button', { name: 'Create Account' })).toBeInTheDocument();
    });

    it('navigates to back to login page', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        );

        const signUpButton = screen.getByTestId('toSignUp');
        expect(signUpButton).toBeInTheDocument();

        act(() => {
            signUpButton.click();
        });

        const loginButton = screen.getByTestId('toLogin');
        expect(loginButton).toBeInTheDocument();

        act(() => {
            loginButton.click();
        });

        expect(screen.getByLabelText('Email')).toBeInTheDocument();
    });
});
