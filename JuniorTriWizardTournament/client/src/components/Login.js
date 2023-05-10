import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../modules/authManager";
import "./Login.css"

export default function Login() {
  let navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginSubmit = (e) => {
    e.preventDefault();
    login(email, password)
      .then(() => navigate("/"))
      .catch(() => alert("Login Failed"));
  };

  return (
    <div className="form-container">
    <form onSubmit={loginSubmit}>
      <fieldset>
      <div className="form-input">
          <label htmlFor="email">Email: </label>
          <input
            id="email"
            type="text"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-input">
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-input">
          <button type="submit">Login</button>
        </div>
        <em>
          Not registered? <Link to="/register">Register</Link>
        </em>
      </fieldset>
    </form>
    </div>
  );
}
