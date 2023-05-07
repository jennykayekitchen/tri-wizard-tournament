import { getToken } from "./authManager";

const baseUrl = "/api/game";

export const getTotalPointsByUserId = (id) => {
    return getToken().then(token => {
        return fetch(`${baseUrl}/usertotalpoints/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
    })
}

export const addGamePoints = async (addPoints) => {
    console.log("Adding game points:", addPoints);
    const token = await getToken();
    console.log("Token:", token);
    const resp = await fetch(`${baseUrl}/postgame`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(addPoints)
    });
    const data = await resp.json();
    console.log("Response:", data);
    return data;
};

