import React from "react";
import { useEffect, useState } from "react";
import { Table, Button } from "reactstrap";
import { getCurrentUser, updateUserProfile } from "../modules/userProfileManager";
import { FavoriteSubject } from "./FavoriteSubject";
import { getTotalPointsByUserId } from "../modules/gameManager";
import { SchoolPoints } from "./SchoolPoints";
import "./UserProfile.css" 

export const UserProfile = () => {
  const [user, setUser] = useState({})
  const [editMode, setEditMode] = useState(false)
  const [editedAboutMe, setEditedAboutMe] = useState(user?.aboutMe)
  const [totalPoints, setTotalPoints] = useState(0)

  useEffect(() => {
    getCurrentUser()
      .then(userData => {
        setUser(userData)
      })
  }, [editMode])

  useEffect(() => {
    if (user && user.id) {
      getTotalPointsByUserId(user.id)
        .then(userData => {
          setTotalPoints(userData.totalPoints)
        })
    }
  }, [user])

  const handleEditClick = () => {
    setEditMode(true)
  }

  const handleAboutMeChange = (event) => {
    setEditedAboutMe(event.target.value)
  }

  const handleCancelEditClick = () => {
    setEditedAboutMe(user?.aboutMe)

    setEditMode(false);
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
    <div className="user-profile-container">
      <div className="user-profile-contents">
      
      <div>
        Name: {user.firstName} {user.lastName}
      </div>
      <div>
        Email: {user.emailAddress}
      </div>
      <div>
        School: {user?.school?.name}
      </div>
      <div>
        Total Points: {totalPoints}
      </div>
      <div>
        {user?.id && (<FavoriteSubject userId={user.id} />)}
      </div>
      {editMode ? (
        <>
          <div>
            About Me:{user?.aboutMe}
            <input type="text"
              value={editedAboutMe}
              onChange={handleAboutMeChange} />
          </div>
        </>
      )
        :
        <>
          <div>
            About Me:
            <div>
              {user.aboutMe}
            </div>
          </div>
        </>
      }
      {editMode ? (
        <>
          <div>
            <button onClick={handleSaveChangesButtonClick}>Save Changes</button>
            <button onClick={handleCancelEditClick}>Cancel</button>
          </div>
        </>
      )
        : (
          <>
            <div>
              <button onClick={handleEditClick}>Edit About Me</button>
            </div>
          </>
        )
      }

      </div>
      </div>
    </>
  )
}
