import React, { useEffect, useState } from "react";
import { getAllPoints } from "../modules/gameManager";
import "./SchoolPoints.css"

export const SchoolPoints = () => {
    const [schoolPoints, setSchoolPoints] = useState([])

    useEffect(() => {
        getAllPoints().then((points) => {
            setSchoolPoints(points);
        });
    }, []);

    return (
        <div className="school-points-container">
            <div className="school-points-title">
                Current Standings
            </div>
            <div className="school-points-list">
                <div className="list-title">Points Per School</div>
                {schoolPoints.map((school) => {
                    return <div className="school" key={school?.id}>{school?.school?.name}: {school?.totalPoints}</div>
                })}
            </div>
        </div>
    )

}