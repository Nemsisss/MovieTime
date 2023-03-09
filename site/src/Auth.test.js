import React from 'react';
import Login from './Auth';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import * as CommonModule from './common';

jest.mock('./common');

test('Submit should work successfully', () => {
    const mockLogin = jest.spyOn(CommonModule,'handleSubmit').mockImplementation();
    const { getByRole } = render(<Login />);
    const login_button = getByRole('button');
    fireEvent.submit(login_button);
    expect(mockLogin).toHaveBeenCalledTimes(1);
  });

it("onChange param is the same value as the input element's value property", () => {
    const mockFn = jest.fn();
    const input = enzyme.shallow(<InputBox
                                    value=""
                                    placeholder=""
                                    className=""
                                    onSearch={mockFn}/>);

    input.find('input').simulate('change', {target: {value: 'matched'} });
    expect(mockFn.mock.calls[0][0]).toBe('matched');
});

it('should allow the user to submit their credentials', () => {
     const mockLogin = jest.spyOn(CommonModule,'handleSubmit').mockImplementation();
     const { getByRole } = render(<Login />);
     const login_button = getByRole('button');

    const emailField = screen.getByLabelText(/email/i);
    const passwordField = screen.getByLabelText(/password/i);
    const submitButton = getByRole('button');

    fireEvent.change(emailField, { target: { value: 'email@email.com' } })

//    userEvent.type(emailField, 'test@test.com');
//    userEvent.type(passwordField, '1111');
    fireEvent.submit(login_button);

    expect(mockLogin).toHaveBeenCalledWith({
        email: "test@test.com",
        password: "1111"
    });
})