import React, { useEffect, useState } from "react";
import { getTotalPointsByUserId } from "../modules/gameManager";

export const TotalPoints = ({ userId, gameStatus }) => {
  const [totalPoints, setTotalPoints] = useState({});

  useEffect(() => {
    if (userId) {
      getTotalPointsByUserId(userId).then((points) => {
        setTotalPoints(points);
      });
    }
  }, [userId, gameStatus]);

  return (
    <div>{totalPoints.totalPoints}</div>    
  );
};