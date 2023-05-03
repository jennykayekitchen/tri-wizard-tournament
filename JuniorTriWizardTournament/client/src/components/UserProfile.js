import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Table, Button } from "reactstrap";
import { getCurrentUser, updateUserProfile } from "../modules/userProfileManager";

export const UserProfile = () => {
  const [user, setUser] = useState({})
  const [editMode, setEditMode] = useState(false)
  const [editedAboutMe, setEditedAboutMe] = useState(user?.aboutMe)

  useEffect(() => {
    getCurrentUser()
      .then(userData => {
        setUser(userData)
      })
  }, [editMode])

  const handleEditClick = () => {
    setEditMode(true)
  }

  const handleAboutMeChange = (event) => {
    setEditedAboutMe(event.target.value)
  }

  const handleCancelEditClick = () => {
    setEditedAboutMe(user?.aboutMe)

    setEditMode(false)
  }

  const handleSaveChangesButtonClick = () => {
    const updatedAboutMe = {
      id: user.id,
      firebaseUserId: user.firebaseUserId,
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.emailAddress,
      aboutMe: editedAboutMe,
    }
    
    updateUserProfile(updatedAboutMe)
    
    setEditMode(false)
      

  }

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

          {editMode ? (
            <>
              <th>About Me</th>
              <td>{user?.aboutMe}</td>
              <input type="text"
                value={editedAboutMe}
                onChange={handleAboutMeChange} />
            </>
          )
            :
            <>
              <th>About Me</th>
              <td>{user.aboutMe}</td>
            </>
          }

          {editMode ? (
              <>
                
                  <Button onClick={handleSaveChangesButtonClick}>Save Changes</Button>
                  <Button onClick={handleCancelEditClick}>Cancel</Button>
                
              </>
            )
              : (
                <>
                    <Button onClick={handleEditClick}>Edit About Me</Button>                    
                </>
              )
          }

        </tbody>
      </Table>
    </>
  )
}
