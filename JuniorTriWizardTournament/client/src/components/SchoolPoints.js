import React, { useEffect, useState } from "react";
import { getAllPoints } from "../modules/gameManager";

export const SchoolPoints = () => {
    const [schoolPoints, setSchoolPoints] = useState([])

    useEffect(() => {
        getAllPoints().then((points) => {
            setSchoolPoints(points);
        });
    }, []);

    return (
        <div>            
            {schoolPoints.map((school) => {
                return <div key={school?.name}>{school?.school?.name}: {school?.totalPoints}</div>
            })}
        </div>
    )

}