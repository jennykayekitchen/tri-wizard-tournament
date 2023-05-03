import { getToken } from "./authManager";

const baseUrl = "/api/user";

export const getAllUserProfiles = () => {
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

export const getUserDetailsById = (id) => {
    return getToken().then(token => {
        return fetch(`${baseUrl}/details/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
    })
}

export const updateUserProfile = (userObj) => {
    return getToken().then(token => {
        return fetch(`${baseUrl}/${userObj.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: userObj.id,
                displayName: userObj.displayName,
                firstName: userObj.firstName,
                lastName: userObj.lastName,
                email: userObj.email,
                imageLocation: userObj.imageLocation,
                userTypeId: userObj.userTypeId,
                activated: userObj.activated
            })
        })
            .then(res => res.json())
    })
}

export const getCurrentUser = () => {
    return getToken().then(token => {
        return fetch(`${baseUrl}/currentuser`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
    })
}