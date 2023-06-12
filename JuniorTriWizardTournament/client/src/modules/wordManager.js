import { getToken } from "./authManager"

const baseUrl = "https://localhost:5001/api/Word"

export const getAllWords = () => {
    return getToken().then(token => {
        return fetch(baseUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(res => res.json())
            
    })
}

export const getWord = () => {
    return getToken().then(token => {
        return fetch(baseUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(res => res.json())
            .then((words) => {
                return words[Math.floor(Math.random() * words.length)]
            })
    })
};

