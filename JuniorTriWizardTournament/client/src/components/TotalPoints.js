import React, { useEffect, useState } from "react";
import { getTotalPointsByUserId } from "../modules/gameManager";

export const TotalPoints = ({ userId, gameStatus }) => {
  const [totalPoints, setTotalPoints] = useState(null);

  useEffect(() => {
    if (userId) {
      getTotalPointsByUserId(userId).then((points) => {
        setTotalPoints(points.totalPoints);
      });
    }
  }, [userId, gameStatus]);

  return (
    <div>
      <h4>Total Points: {totalPoints}</h4>
    </div>
  );
};