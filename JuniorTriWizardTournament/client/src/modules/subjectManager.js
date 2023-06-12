import { getToken } from "./authManager";

const baseUrl = "https://localhost:5001/api/subject";

export const getAllSubjects = () => {
    return getToken().then(token => {
        return fetch(baseUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(res => res.json())
    })
};