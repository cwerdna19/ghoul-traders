import React, { useState } from "react";
import axios from "axios";

//422 USER ALREADY EXISTS
//201 SIGNED UP GOODLY

const App = () => {
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      symbol: data.email,
      faction: data.password
    };
    axios.post("https://api.spacetraders.io/v2/register", userData).then((response) => {
      console.log(response.status, response.data.token, response.data);
    });
  };

  return (
    <div>
      <h1>Login Account</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email
          <input
            name="email"
            value={data.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            name="password"
            value={data.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default App;
