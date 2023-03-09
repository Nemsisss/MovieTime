import React, { useState } from 'react';
import styled from 'styled-components';

export const validateInput = (str = '') => str.includes('@');

function LoginForm( {handelSubmit} ) {
  const [formData, setFormData] = useState({});

  const handleOnChange = ({ target: { name, value } }) => setFormData((prev) => ({ ...prev, [name]: value }));

  return (
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handelSubmit}>
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
        <input id="email" name="email" onChange={handleOnChange}/>
             </div>

      {formData.email && !validateInput(formData.email) ? <Error>Email not valid</Error> : null}

<div className="form-group mt-3">
        <label htmlFor="password">Password: </label>
        <input id="password" type="password" />
 </div>
 <div className="d-grid gap-2 mt-3">
      <button role = "button" type="submit"> submit </button>
     </div>
 </div>
    </form>
</div>
  );
}
export default LoginForm