import React, { useState } from 'react';
import styled from 'styled-components';

export const validateInput = (str = '') => str.includes('@');

function LoginForm() {
  const [formData, setFormData] = useState({});

  const handleOnChange = ({ target: { name, value } }) => setFormData((prev) => ({ ...prev, [name]: value }));

  const onFormSubmit = (e) => {
    e.preventDefault();
    // login();
  };

  const Error = styled.p`
    color: red;
  `;

  return (
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={(e) => onFormSubmit(e)} data-testid="form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>

            <div className="text-center">
                Not registered yet?{" "}
              <span className="link-primary">
               Sign Up
                </span>
            </div>

            <div className="form-group mt-3">
        <label htmlFor="email">Email: </label>
        <input id="email" name="email" onChange={(e) => handleOnChange(e)}/>
             </div>
      {formData.email && !validateInput(formData.email) ? <Error title="error message">Email not valid </Error> : null}


<div className="form-group mt-3">
        <label htmlFor="password">Password: </label>
        <input id="password" type="password" onChange={(e) => handleOnChange(e)} />
 </div>
 <div className="d-grid gap-2 mt-3">
      <button type="submit">submit</button>
     </div>
 </div>
    </form>
</div>
  );
}
export default LoginForm