import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { UserProfile } from "./UserProfile";

export default function ApplicationViews({ isLoggedIn }) {
  return (
    <Routes>
      <Route path="/">        
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="user/details" element={<UserProfile />} />
        <Route path="*" element={<p>Whoops, nothing here...</p>} />
      </Route>
    </Routes>
  );
}
