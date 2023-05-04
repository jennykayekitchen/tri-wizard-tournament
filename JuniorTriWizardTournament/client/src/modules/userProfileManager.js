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
            body: JSON.stringify(userObj)
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

export const getUserFavoriteSubjectsById = (userId) => {
    return getToken().then(token => {
        return fetch(`${baseUrl}/${userId}/favoritesubjects`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
    })
}

export const addFavoriteSubject = (checkedsubject) => {
    return getToken().then((token) =>
        fetch(`${baseUrl}/postfavoritesubject`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(checkedsubject)
        }).then(resp => resp.json()));
};

export const deleteFavoriteSubject = (favoriteSubjectId) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/deletefavoritesubject/${favoriteSubjectId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
    });
}
