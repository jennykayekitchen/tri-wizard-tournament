import React, { useEffect, useState } from "react";
import { getAllPoints } from "../modules/gameManager";
import "./SchoolPoints.css"
import H from '../images/H.png'
import D from '../images/D.png'
import B from '../images/B.png'

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
            <div className="school-crests">
                <img src={D}></img>
                <img src={H}></img>
                <img src={B}></img>
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