import React, { useState } from "react";
import "../styles/SignUp.css"

function LogIn({switchToSignUp}) {
    // states for email & password field
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // states for submit & input errors
    const [submitted, setSubmitted] = useState(false);
    const [errorEmailEmpty, setErrorEmailEmpty] = useState(false);
    const [errorPassEmpty, setErrorPassEmpty] = useState(false);

    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);

    // handle email input change
    const handleEmail = (e) => {
        setEmail(e.target.value);
        setSubmitted(false);
    };

    // handle password input change
    const handlePassword = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
    };

    // handle page redirect
   // const navigate = useNavigate()
//     const handleClick = () => {
//       //  return navigate("/signUp")
//     };

    // handle user submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorEmailEmpty(false);
        setErrorPassEmpty(false);

        setErrorPassword(false);
        setErrorEmail(false);

        let testEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let testPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{4,}$/;
        let passed = true;

        // email field is empty
        if (email === ''){
            passed = false;
            setErrorEmailEmpty(true);
        }
        // password field is empty
        if (password === ''){
            passed = false;
            setErrorPassEmpty(true)
        }

        if (passed){
            if(!testEmail.test(email)) {
                setErrorEmail(true);
            }
            else if (!testPassword.test(password)){
                setErrorPassword(true);
            }
            else{
                setSubmitted(true);
            }
        }
    };

    // welcome message when log in success
    const welcomeMessage = () => {
        return (
            <div
                className="success"
                style={{
                    display: submitted ? '' : 'none',
                }}>
                Welcome Back!
            </div>
        );
    };

    // not found message when log in fail
        const notFoundMessage = () => {
            return (
                <div
                    className="error"
                    style={{
                        display: errorPassword ? '' : 'none',
                    }}>
                    User Not Found!
                </div>
            );
        };

        // when log in fail, redirect to the login page in 1.5 sec
        if (errorPassword == true) {
        setTimeout(() => {
          document.location.reload();
        }, 1500);
        }

    // email error message if email filed is empty
    const errorMessageEmailEmpty = () => {
        return (
            <div
                className="error"
                style={{
                    display: errorEmailEmpty ? '' : 'none',
                }}>
                Email cannot be empty
            </div>
        );
    };

    // invalid error message when email is invalid format
    const errorMessageInvalidEmail= () => {
        return (
            <div
                className="error"
                style={{
                    display: errorEmail ? '' : 'none',
                }}>
                Please enter a valid email
            </div>
        );
    };

    // password error message if password filed is empty
    const errorMessagePassEmpty = () => {
        return (
            <div
                className="error"
                style={{
                    display: errorPassEmpty ? '' : 'none',
                }}>
                Password cannot be empty
            </div>
        );
    };

    return (
        <div className="app-signup">

            <div className="login-form-signup">
                <div className="title-signup">User Log In Page</div>
                <div className="messages-signup">
                    {welcomeMessage()}
                    {notFoundMessage()}
                </div>
                <div className="form">
                    <form className="formStyle-signup">
                        {/* Labels and inputs for form data */}
                        <div className="input-container-signup">
                            <label className="label-signup" htmlFor="email">Email</label>
                            <input onChange={handleEmail} className="input-signup"
                                   value={email} type="email" id="email"/>
                            {errorMessageEmailEmpty()}
                            {errorMessageInvalidEmail()}
                        </div>

                        <div className="input-container-signup">
                            <label className="label-signup" htmlFor="password">Password</label>
                            <input onChange={handlePassword} className="input-signup"
                                   value={password} type="password" id="password"/>
                            {errorMessagePassEmpty()}
                        </div>

                        <button onClick={handleSubmit} className="btn-signup" type="submit" data-testid="submit-button">
                                Submit
                        </button>
                    </form>
                </div>
                <div className="App">
                <div className="centerAlign redirect" onClick={switchToSignUp}>Not Registered Yet? <br /> Sign Up Here</div>
                </div>


            </div>

        </div>

    );
}

export default LogIn;