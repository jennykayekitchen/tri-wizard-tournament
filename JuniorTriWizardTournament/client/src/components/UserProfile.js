import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Table } from "reactstrap";
import { getCurrentUser } from "../modules/userProfileManager";

export const UserProfile = () => {
  
  const [user, setUser] = useState({});

  useEffect(() => {
    getCurrentUser()
      .then(userData => {
        setUser(userData)
      })
  }, [])

  return (
    <>
      
      <Table>
        <tbody>
          <tr>
            <th>Name</th>
            <td>{user.firstName} {user.lastName}</td>
          </tr>          
          <tr>
            <th>Email</th>
            <td>{user.emailAddress}</td>
          </tr>
          <tr>
            <th>School</th>
            <td>{user?.school?.name}</td>
          </tr>
          
        </tbody>
      </Table>
    </>
  )
}
