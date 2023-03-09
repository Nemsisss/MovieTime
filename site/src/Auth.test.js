import React from 'react';
import Login from './Auth';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import * as CommonModule from './common';
import Enzyme, {shallow} from 'enzyme';

jest.mock('./common');

test('Submit should work successfully', () => {
    const mockLogin = jest.spyOn(CommonModule,'handleSubmit').mockImplementation();
    const { getByRole } = render(<Login />);
    const login_button = getByRole('button');
    fireEvent.submit(login_button);
    expect(mockLogin).toHaveBeenCalledTimes(1);
  });


it('should allow the user to submit their credentials', () => {
     const mockLogin = jest.spyOn(CommonModule,'handleSubmit').mockImplementation();
     const { getByRole } = render(<Login />);
     const login_button = getByRole('button');

    const emailField = screen.getByLabelText(/email/i);
    const passwordField = screen.getByLabelText(/password/i);
    const submitButton = getByRole('button');

   fireEvent.change(emailField, { target: { value: 'email@email.com' } })
  fireEvent.change(passwordField, { target: { value: '1111' } })

    fireEvent.submit(login_button);

    expect(mockLogin).toHaveBeenCalledWith({
        email: "test@test.com",
        password: "1111"
    });
})