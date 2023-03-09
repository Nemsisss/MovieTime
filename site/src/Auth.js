import React, { useContext, useState } from 'react';
import { getToken, handleSubmit } from './common';

const Login = () => {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  // const authCon = useContext(AuthContext);

  return (
        <div className="Auth-form-container">
          <form className="Auth-form" onSubmit={(e) => handleSubmit(e, email, pwd)}>
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Sign In</h3>
              <div className="text-center">
                Not registered yet?{" "}
    <span className="link-primary">
                   Sign Up
                 </span>
               </div>
               <div className="form-group mt-3">
        <label htmlFor="email"> Email address: </label>
          <input
            id = "email"
            className="credentials-input"type="email"
            value={email}
            placeholder="Email Address"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          </div>
          <div className="form-group mt-3">
          <label htmlFor="password"> Password: </label>
          <input
            id = "password"
            className="credentials-input"
            type="password"
            value={pwd}
            placeholder="Password"
            required
            onChange={(e) => setPwd(e.target.value)}
          />
          </div>
            <div className="d-grid gap-2 mt-3">
          <button className="login-button" type="submit">
            Log In
          </button>
          </div>
          </div>
        </form>
      </div>
  );
};

export default Login;