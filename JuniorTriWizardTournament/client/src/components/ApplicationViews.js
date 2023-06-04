import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { UserProfile } from "./UserProfile";
import { WordGame } from "./WordGame";
import { Index } from "./Index";
import { SchoolPoints } from "./SchoolPoints";
import { TicTacToe } from "./TicTacToe";

export default function ApplicationViews({ user, isLoggedIn }) {
  return (
    <Routes>
      <Route path="/">
      <Route index element={ <Index /> }/>        
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="user/details" element={<UserProfile />} />
        <Route path="wordgame" element={<WordGame />} />
        <Route path="tictactoe" element={<TicTacToe />} />
        <Route path="standings" element={<SchoolPoints />} />
        <Route path="*" element={<p>Whoops, nothing here...</p>} />
      </Route>
    </Routes>
  );
}
