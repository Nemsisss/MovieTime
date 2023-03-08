import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// This page provides a button with a redirect to "/other"
function Home() {
  // fetchResponse is a constant in this component's state. Use handleFetchResponse(newValue)
  // to update the value of fetchResponse
  const [fetchResponse, handleFetchResponse] = useState();

  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Calling navigate() will allow us to redirect the webpage
  const navigate = useNavigate();

   // User Login info
    const database = [
      {
        username: "user1",
        password: "pass1"
      },
      {
        username: "user2",
        password: "pass2"
      }
    ];

    const errors = {
      uname: "invalid username",
      pass: "invalid password"
    };

    const handleSubmit = (event) => {
      //Prevent page reload
      event.preventDefault();

      var { uname, pass } = document.forms[0];

      // Find user login info
      const userData = database.find((user) => user.username === uname.value);

      // Compare user info
      if (userData) {
        if (userData.password !== pass.value) {
          // Invalid password
          setErrorMessages({ name: "pass", message: errors.pass });
        } else {
          setIsSubmitted(true);
        }
      } else {
        // Username not found
        setErrorMessages({ name: "uname", message: errors.uname });
      }
    };

    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
      name === errorMessages.name && (
        <div className="error">{errorMessages.message}</div>
      );

  // Anything returned will be rendered in React
  return (
    <div>
      <div>Home Page</div>
      <button
        onClick={() => {
          navigate("/other");
        }}
      >
        Click to go to Other page
      </button>
      <button
        onClick={() => {
          fetch("/api/ping", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              param0: "Frontend"
            })
          })
            .then((res) => res.json())
            .then((response) => {
              console.log("API Responded With: ");
              console.log(response);
              if (response?.data) {
                handleFetchResponse(response.data);
              } else {
                console.log("Malformed data response"); //TODO: Handle me!
              }
            })
            .catch((err) => {
              console.log(err)
              handleFetchResponse("An API error occured");
            });
        }}
      >
        Fetch backend
      </button> <span>&nbsp;&nbsp;</span>


      {/* Conditionally render this div if fetchResponse is a valid value */}
      {fetchResponse ? <div>{fetchResponse}</div> : null}

      <button
       onClick={() => {
       navigate("/login");
       }}
       >
      Click to go to Log-in page
      </button><span>&nbsp;&nbsp;</span>


      <button
       onClick={() => {
       navigate("/auth");
       }}
       >
      Click to go to Log-in page ver. 2
      </button><span>&nbsp;&nbsp;</span>

    </div>
  );
}

export default Home;
