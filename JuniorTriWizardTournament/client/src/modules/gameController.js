import { getToken } from "./authManager";

const baseUrl = "/api/game";

export const addFavoriteSubject = (points) => {
    return getToken().then((token) =>
        fetch(`${baseUrl}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(points)
        }).then(resp => resp.json()));
};