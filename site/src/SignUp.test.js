import React, { useState } from "react";
import {render, fireEvent, getAllByText, act, screen} from '@testing-library/react';
import SignUp from './pages/SignUp';

// const axios= require("axios");
// import fetch from 'jest-mock-fetch';
// jest.mock('fetch');


describe('SignUp component', () => {
    beforeEach(() => {
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("handleEmail sets email state correctly", () => {
        const TestComponent = () => {
            const [email, setEmail] = useState("");
            const handleEmail = (e) => {
                setEmail(e.target.value);
            };
            return (
                <div>
                    <label htmlFor="email-input">Email</label>
                    <input id="email-input" type="text" value={email} onChange={handleEmail} />
                </div>
            );
        };

        const { getByLabelText } = render(<TestComponent />);
        const emailInput = getByLabelText("Email");

        fireEvent.change(emailInput, { target: { value: "test@test.com" } });
        expect(emailInput.value).toBe("test@test.com");
    });

    it('renders the component without errors', () => {
        render(<SignUp />);
    });

    it('displays an error message when form is submitted with no data', () => {
        const { getAllByText, getByLabelText, getByTestId } = render(<SignUp />);
        const emailInput = getByLabelText('Email');
        const passwordInput = getByLabelText('Password');
        const confirmPasswordInput = getByLabelText('Confirm Password');
        const submitButton = getByTestId('submit-button');

        fireEvent.change(emailInput, { target: { value: 'email@email.com' } });
        fireEvent.click(submitButton);

        const errorMessage = getAllByText(/Field cannot be empty/);
        expect(errorMessage[0]).toBeInTheDocument();
    });

    it('displays an error message when form is submitted with invalid data', () => {
        const { getByText, getByLabelText, getByTestId } = render(<SignUp />);
        const emailInput = getByLabelText('Email');
        const passwordInput = getByLabelText('Password');
        const confirmPasswordInput = getByLabelText('Confirm Password');
        const submitButton = getByTestId('submit-button');

        fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'password' } });
        fireEvent.click(submitButton);

        const errorMessage = getByText(/Please enter a valid email/);
        expect(errorMessage).toBeInTheDocument();
    });

    it('displays an error message when form is submitted with different passwords', () => {
        const { getByText, getByLabelText, getByTestId } = render(<SignUp />);
        const emailInput = getByLabelText('Email');
        const passwordInput = getByLabelText('Password');
        const confirmPasswordInput = getByLabelText('Confirm Password');
        const submitButton = getByTestId('submit-button');

        fireEvent.change(emailInput, { target: { value: 'email@email.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password!2D' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'password2' } });
        fireEvent.click(submitButton);

        const errorMessage = getByText(/Please ensure passwords match/);
        expect(errorMessage).toBeInTheDocument();
    });

    it('displays an error message when form is submitted with weak passwords', () => {
        const { getByText, getByLabelText, getByTestId } = render(<SignUp />);
        const emailInput = getByLabelText('Email');
        const passwordInput = getByLabelText('Password');
        const confirmPasswordInput = getByLabelText('Confirm Password');
        const submitButton = getByTestId('submit-button');

        fireEvent.change(emailInput, { target: { value: 'email@email.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'password' } });
        fireEvent.click(submitButton);

        const errorMessage = getByText(/Please ensure you enter a valid password/);
        expect(errorMessage).toBeInTheDocument();
    });

    it('displays an error message when form is submitted without email', () => {
        const { getAllByText, getByLabelText, getByTestId } = render(<SignUp />);
        const emailInput = getByLabelText('Email');
        const passwordInput = getByLabelText('Password');
        const confirmPasswordInput = getByLabelText('Confirm Password');
        const submitButton = getByTestId('submit-button');

        fireEvent.change(passwordInput, { target: { value: 'password1!D' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'password1!D' } });
        fireEvent.click(submitButton);

        const successMessage = getAllByText(/Field cannot be empty/);
        expect(successMessage[0]).toBeInTheDocument();
    });

    it('should submit the form when all fields are valid', async () => {
        const mockFetch = jest.fn().mockResolvedValueOnce({
            status: 200,
            json: jest.fn().mockResolvedValueOnce({}),
        });
        global.fetch = mockFetch;

        const { getByTestId, getByLabelText, getByText } = render(<SignUp switchToLogin={() => {}} />);
        const emailInput = getByLabelText(/email/i);
        const passwordInput = getByLabelText('Password');
        const passwordCheckInput = getByLabelText('Confirm Password');
        const submitButton = getByTestId('submit-button');

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
        fireEvent.change(passwordCheckInput, { target: { value: 'Password123!' } });

        await act(async () => {
            fireEvent.click(submitButton);
        });

        expect(mockFetch).toHaveBeenCalledWith('/user/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: 'test@example.com', password: 'Password123!' }),
        });

        // expect(getByTestId('success-message')).toBeInTheDocument();
        const successMessage = getByText(/successfully registered/);
        expect(successMessage).toBeInTheDocument();
    });
});

const mockFetch = (responseJson, status) =>
    Promise.resolve({
        status: status || 200,
        json: () => Promise.resolve(responseJson),
    });

describe('SignUp component', () => {
    // it('shows error message when fetch fails', async () => {
    //     const mockFetch = jest.fn().mockRejectedValue(new Error('Failed to fetch'));
    //     global.fetch = mockFetch;
    //     const { getByTestId, getByLabelText} = render(<SignUp />);
    //     const emailInput = getByLabelText(/email/i);
    //     const passwordInput = getByLabelText('Password');
    //     const passwordCheckInput = getByLabelText('Confirm Password');
    //     const submitButton = getByTestId('submit-button');
    //     fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    //     fireEvent.change(passwordInput, { target: { value: 'passworD1!' } });
    //     fireEvent.change(passwordCheckInput, { target: { value: 'passworD1!' } });
    //     fireEvent.click(submitButton);
    //     expect(mockFetch).toHaveBeenCalledTimes(1);
    // });

    it('should show an error message when the email already exists', async () => {
        const { getByTestId, getByText, getByLabelText } = render(<SignUp />);
        const emailInput = getByLabelText(/email/i);
        const passwordInput = getByLabelText('Password');
        const passwordCheckInput = getByLabelText('Confirm Password');
        const submitButton = getByTestId('submit-button');
        global.fetch = jest.fn().mockImplementation(() => mockFetch(null, 409));
        fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
        fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
        fireEvent.change(passwordCheckInput, { target: { value: 'Password123!' } });
        await act(async () => {
            fireEvent.click(submitButton);
        });
        expect(getByText('This email is already in use.')).toBeInTheDocument();
    });
});
