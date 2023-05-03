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
    <Form onSubmit={registerClick}>
      <fieldset>
        <FormGroup>
          <Label htmlFor="name">First Name</Label>
          <Input
            id="first-name"
            type="text"
            autoFocus
            onChange={(e) => setFirstName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="last-name">Last Name</Label>
          <Input
            id="last-name"
            type="text"
            autoFocus
            onChange={(e) => setLastName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            id="email"
            type="text"
            onChange={(e) => setEmailAddress(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
                <Label htmlFor="school">Select A School</Label>
                <select onChange={(e) => setSchoolId(e.target.value)}>
                <option value="1">Hogwarts School of Witchcraft and Wizardry</option>
                <option value="2">Beauxbatons Academy of Magic</option>
                <option value="3">The Durmstrang Institute</option>
                </select>
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Button>Register</Button>
        </FormGroup>
      </fieldset>
    </Form>
  );
}
