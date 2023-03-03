import React, { useState } from "react";
import NestedComponent from "../components/NestedComponent";

// Use a nested component with provided props to redirect the user to "/"
// and a counter which is modified by a set of buttons
function SignUp() {
    // States for registration
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');

    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    // Handling the email change
    const handleEmail = (e) => {
        setEmail(e.target.value);
        setSubmitted(false);
    };

    // Handling the password change
    const handlePassword = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
    };

    // Handling the password change for password checker
    const handlePasswordCheck = (e) => {
        setPasswordCheck(e.target.value);
        setSubmitted(false);
    };

    // Handling the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let testPass = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{4,}$/;
        if(!re.test(email)){
            setError(true);
        } else if (passwordCheck === '' || email === '' || password === '') {
            setError(true);
        } else if(password !== passwordCheck){
            setError(true);
        } else if (!testPass.test(password)){
            setError(true);
        }
        else {
            setSubmitted(true);
            setError(false);
        }
    };

    // Showing success message
    const successMessage = () => {
        return (
            <div
                className="success"
                style={{
                    display: submitted ? '' : 'none',
                }}>
                <h1>User {name} successfully registered!!</h1>
            </div>
        );
    };

// Showing error message if error is true
    const errorMessageEmpty = () => {
        return (
            <div
                className="error"
                style={{
                    display: error ? '' : 'none',
                }}>
                <h1>Please enter all the fields</h1>
            </div>
        );
    };

    return (
        <div className="form">
            <div>
                <h1 className="centerAlign">User Registration Page</h1>
            </div>

            {/* Calling to the methods */}
            <div className="messages">
                {errorMessageEmpty()}
                {successMessage()}
            </div>

            <form className="formStyle">
                {/* Labels and inputs for form data */}

                <label className="label" htmlFor="email">Email</label>
                <input onChange={handleEmail} className="input"
                       value={email} type="email" id="email"/>

                <label className="label" htmlFor="password">Password</label>
                <input onChange={handlePassword} className="input"
                       value={password} type="password" id="password"/>

                <label className="label" htmlFor="passwordCheck">Confirm Password</label>
                <input onChange={handlePasswordCheck} className="input"
                       value={passwordCheck} type="password" id="passwordCheck"/>

                <button onClick={handleSubmit} className="btn" type="submit" data-testid="submit-button">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default SignUp;
