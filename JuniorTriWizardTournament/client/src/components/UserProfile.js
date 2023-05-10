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
        <div className="welcome-message">
          Hello, {user.firstName}!
        </div>
        <div className="user-profile-contents">
          <div className="user-info">
            <div className="user-name">
              <div className="user-section">Name</div> {user.firstName} {user.lastName}
            </div>
            <div className="user-name">
              <div className="user-section">Email Address</div> {user.emailAddress}
            </div>
            <div className="user-name">
              <div className="user-section">School</div> {user?.school?.name}
            </div>
            <div className="user-points">
              <div className="user-section">Current Points</div> {totalPoints}
            </div>
          </div>
          <div className="user-edits">
            <div className="user-fav-subjects">
              {user?.id && (<FavoriteSubject userId={user.id} />)}
            </div>
            {editMode ? (
              <>
                <div className="user-about-me">
                  <div>
                  <div className="user-section">About Me</div>{user?.aboutMe}
                    <input type="text"
                      value={editedAboutMe}
                      onChange={handleAboutMeChange} />
                  </div>
                  </div>
                </>
                )
                :
                <>
                  <div className="user-about-me">
                  <div className="user-section">About Me</div>
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
        </div>      
    </>
  )
}
