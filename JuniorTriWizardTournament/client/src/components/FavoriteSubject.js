import React, { useEffect, useState } from "react";
import { addFavoriteSubject, deleteFavoriteSubject, getUserFavoriteSubjectsById } from "../modules/userProfileManager";
import { getAllSubjects } from "../modules/subjectManager";
import "./UserProfile.css"

export const FavoriteSubject = ({ userId }) => {
    const [favoriteSubjects, setFavoriteSubjects] = useState([])
    const [subjects, setSubjects] = useState([])

    useEffect(() => {
        getUserFavoriteSubjectsById(userId)
            .then(userData => {
                setFavoriteSubjects(userData)
            })
    }, []);

    useEffect(() => {
        getAllSubjects()
            .then(data => {
                setSubjects(data)
            })
    }, []);

    const handleSaveButtonClick = () => {
        const checkedSubjects = Array.from(document.querySelectorAll("input[type='checkbox']:checked"))
            .map(input => input.value)

        const newFavoriteSubjects = checkedSubjects.map(subjectId => ({
            userId: userId,
            subjectId: parseInt(subjectId)
        }))

        newFavoriteSubjects.forEach((favoriteSubject) => {
            addFavoriteSubject(favoriteSubject)
        })

        getUserFavoriteSubjectsById(userId)
            .then((data) => {
                setFavoriteSubjects(data)
            })
    }

    const handleDeleteButtonClick = () => {
        // getUserFavoriteSubjectsById(userId)
        //     .then(favoriteSubjectsData => {
        const requests = favoriteSubjects.map(favoriteSubject => {
            return deleteFavoriteSubject(favoriteSubject.id);
        });

        Promise.all(requests)
            .then(() => {
                getUserFavoriteSubjectsById(userId)
                    .then(updatedFavoriteSubjectsData => {
                        setFavoriteSubjects(updatedFavoriteSubjectsData);
                    });
            });
    };

    return (
        <>{favoriteSubjects.length
            ?
            <><div className="favoriteSubjects">
                <div className="user-section">Favorite Subject(s)</div> {favoriteSubjects.map(
                    (favoriteSubject) => {
                        return <div key={favoriteSubject.id}>• {favoriteSubject?.subject?.name}</div>
                    }
                )}
                <button onClick={(clickEvent) => handleDeleteButtonClick(clickEvent)}>
                    Delete Favorite Subjects{`(s)`}
                </button>
            </div></>
            :
            <><div className="subjects">{subjects.map(
                (subject) => {
                    return <div className="individualSubject" key={subject.id} >
                        <input value={subject.id} name={subject.name} type="checkbox" />
                        <label htmlFor={subject.name}>{subject.name}
                        </label>
                    </div>

                }
            )}
                <button
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    className="btn btn-primary">
                    Save Favorite Subjects{`(s)`}
                </button>
            </div></>


        }
        </>)
}