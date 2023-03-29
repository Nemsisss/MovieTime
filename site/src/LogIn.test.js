import React, { useState } from "react";
import {render, fireEvent, getAllByText} from '@testing-library/react';
import LogIn from './pages/LogIn';

describe('LogIn component', () => {

    it("should be able to set email state", () => {
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
        render(<LogIn />);
    });

    it('should display an error message when form is submitted without email', () => {
        const { getAllByText, getByLabelText, getByTestId } = render(<LogIn />);
        const emailInput = getByLabelText('Email');
        const passwordInput = getByLabelText('Password');
        const submitButton = getByTestId('submit-button');

        fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
        fireEvent.click(submitButton);

        const errorMessage = getAllByText(/Email cannot be empty/);
        expect(errorMessage[0]).toBeInTheDocument();
    });

    it('should display an error message when form is submitted without password', () => {
        const { getAllByText, getByLabelText, getByTestId } = render(<LogIn />);
        const emailInput = getByLabelText('Email');
        const passwordInput = getByLabelText('Password');
        const submitButton = getByTestId('submit-button');

        fireEvent.change(passwordInput, { target: { value: 'password1!D' } });
        fireEvent.click(submitButton);

        const successMessage = getAllByText(/Password cannot be empty/);
        expect(successMessage[0]).toBeInTheDocument();
    });

    it('should display an error message when email is in invalid format', () => {
        const { getByText, getByLabelText, getByTestId } = render(<LogIn />);
        const emailInput = getByLabelText('Email');
        const passwordInput = getByLabelText('Password');
        const submitButton = getByTestId('submit-button');

        fireEvent.change(emailInput, { target: { value: 'invalid.email' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });
        fireEvent.click(submitButton);

        const errorMessage = getByText(/Please enter a valid email/);
        expect(errorMessage).toBeInTheDocument();
    });

    it('should display an error message when password is invalid', () => {
        const { getByText, getByLabelText, getByTestId } = render(<LogIn />);
        const emailInput = getByLabelText('Email');
        const passwordInput = getByLabelText('Password');
        const submitButton = getByTestId('submit-button');

        fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });
        fireEvent.click(submitButton);

        const errorMessage = getByText(/User Not Found/);
        expect(errorMessage).toBeInTheDocument();
    });

    it('should display a welcome message when both fields are submitted with valid input', () => {
        const { getByText, getByLabelText, getByTestId } = render(<LogIn />);
        const emailInput = getByLabelText('Email');
        const passwordInput = getByLabelText('Password');
        const submitButton = getByTestId('submit-button');

        fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password1!D' } });
        fireEvent.click(submitButton);

        const successMessage = getByText(/Welcome Back/);
        expect(successMessage).toBeInTheDocument();
    });

});

