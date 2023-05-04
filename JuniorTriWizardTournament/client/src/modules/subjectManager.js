import { getToken } from "./authManager";

const baseUrl = "/api/subject";

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