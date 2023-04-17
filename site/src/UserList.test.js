import UserList from "./pages/UserList.jsx"
import {render, screen, fireEvent} from '@testing-library/react'
import {BrowserRouter} from "react-router-dom";
import React from "react";

describe('User List', () => {
    it("Initial user list landing page", () => {
        render(<UserList />, {wrapper: BrowserRouter});
    });
    it ('Click on pop-up', () => {
        render(<UserList />, {wrapper: BrowserRouter});
        const jsdomAlert = window.alert;  // remember the jsdom alert
        window.alert = () => {};  // provide an empty implementation for window.alert
        const button = screen.getByTestId("add-button");
        fireEvent.click(button);
        const input = screen.getByTestId("input-list");
        fireEvent.change(input, {target: {value: "List 1"}});
        expect(input.value).toBe('List 1')
        const save = screen.getByTestId("save-changes");
        fireEvent.click(save);
        const close_button = screen.getByTestId("close-button");
        fireEvent.click(close_button);
        window.alert = jsdomAlert;  // restore the jsdom alert
    });
});

