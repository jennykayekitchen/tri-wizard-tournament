import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { register } from "../modules/authManager";


export default function Register() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [emailAddress, setEmailAddress] = useState();
  const [schoolId, setSchoolId] = useState();  
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();



  const registerClick = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert("Passwords don't match. Do better.");
    } else {
      const userProfile = { firstName, lastName, emailAddress, schoolId };
      register(userProfile, password).then(() => navigate("/"));
    }
  };

  return (
    <div className="form-container">
    <form onSubmit={registerClick}>
  <fieldset>
    <div className="form-input">
      <label htmlFor="first-name">First Name: </label>
      <input
        id="first-name"
        type="text"
        autoFocus
        onChange={(e) => setFirstName(e.target.value)}
      />
    </div>
    <div className="form-input">
      <label htmlFor="last-name">Last Name: </label>
      <input
        id="last-name"
        type="text"
        autoFocus
        onChange={(e) => setLastName(e.target.value)}
      />
    </div>
    <div className="form-input">
      <label htmlFor="email">Email: </label>
      <input
        id="email"
        type="text"
        onChange={(e) => setEmailAddress(e.target.value)}
      />
    </div>
    <div className="form-input">
      <label htmlFor="school">Select A School</label>
      <select onChange={(e) => setSchoolId(e.target.value)}>
        <option value="1">Hogwarts School of Witchcraft and Wizardry</option>
        <option value="2">Beauxbatons Academy of Magic</option>
        <option value="3">The Durmstrang Institute</option>
      </select>
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
      <label htmlFor="confirmPassword">Confirm Password: </label>
      <input
        id="confirmPassword"
        type="password"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
    </div>
    <div className="form-input">
      <button type="submit">Register </button>
    </div>
  </fieldset>
</form>

    </div>
  );
}
