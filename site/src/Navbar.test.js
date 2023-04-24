import {render, screen, fireEvent} from '@testing-library/react'
import Navbar from "./components/Navbar"
import { BrowserRouter as Router } from 'react-router-dom';
import React from "react";


describe("testing navbarlist", () => {
    it("navbar", () => {
        render(<Router><Navbar/></Router>);
    });
    it("testing other button", () => {
        render(<Router><Navbar/></Router>);
        const button = screen.getByTestId('other');
        fireEvent.click(button);
    });
    it("testing movie button", () => {
        render(<Router><Navbar/></Router>);
        const button = screen.getByTestId('movie');
        fireEvent.click(button);
    });
    it("testing home button", () => {
        render(<Router><Navbar/></Router>);
        const button = screen.getByTestId('home');
        fireEvent.click(button);
    });
});