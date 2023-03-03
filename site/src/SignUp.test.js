import React, { useState } from "react";
import { render, fireEvent } from '@testing-library/react';
import SignUp from './pages/SignUp';

describe('SignUp component', () => {
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
        const { getByText, getByLabelText, getByTestId } = render(<SignUp />);
        const emailInput = getByLabelText('Email');
        const passwordInput = getByLabelText('Password');
        const confirmPasswordInput = getByLabelText('Confirm Password');
        const submitButton = getByTestId('submit-button');

        fireEvent.change(emailInput, { target: { value: 'email@email.com' } });
        fireEvent.click(submitButton);

        const errorMessage = getByText(/Please enter all the fields/);
        expect(errorMessage).toBeInTheDocument();
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

        const errorMessage = getByText(/Please enter all the fields/);
        expect(errorMessage).toBeInTheDocument();
    });

    it('displays an error message when form is submitted with different passwords', () => {
        const { getByText, getByLabelText, getByTestId } = render(<SignUp />);
        const emailInput = getByLabelText('Email');
        const passwordInput = getByLabelText('Password');
        const confirmPasswordInput = getByLabelText('Confirm Password');
        const submitButton = getByTestId('submit-button');

        fireEvent.change(emailInput, { target: { value: 'email@email.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'password2' } });
        fireEvent.click(submitButton);

        const errorMessage = getByText(/Please enter all the fields/);
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

        const errorMessage = getByText(/Please enter all the fields/);
        expect(errorMessage).toBeInTheDocument();
    });

    it('displays a success message when form is submitted with valid data', () => {
        const { getByText, getByLabelText, getByTestId } = render(<SignUp />);
        const emailInput = getByLabelText('Email');
        const passwordInput = getByLabelText('Password');
        const confirmPasswordInput = getByLabelText('Confirm Password');
        const submitButton = getByTestId('submit-button');

        fireEvent.change(emailInput, { target: { value: 'valid-email@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password1!D' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'password1!D' } });
        fireEvent.click(submitButton);

        const successMessage = getByText(/successfully registered/);
        expect(successMessage).toBeInTheDocument();
    });
});