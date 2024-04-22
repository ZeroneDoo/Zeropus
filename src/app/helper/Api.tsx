export const BASE_URL = "http://127.0.0.1:8000/api"

export const getToken = () => {
    const token = localStorage.getItem("token")

    return token
}

export const authenticate = async (
url: string,
method = "GET",
headers : {},
data: string
) => {
    return new Promise(async (resolve, reject) => {
        const defaultHeaders = {
            ...headers,
            "Content-Type": "application/json"
        }

        const response = await fetch(BASE_URL + url, {
            method: method,
            headers: defaultHeaders,
            body: data
        });

        if(response.ok) {
            const json = await response.json();
            return resolve(json);
        }

        return reject(response)
    });
}

export const fetchWithToken = async (
url: string,
method = "GET",
headers? : {},
data?: string
) => {
    return new Promise(async (resolve, reject) => {
        const token = getToken();
        const defaultHeaders = {
            ...headers,
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }

        const response = await fetch(BASE_URL + url, {
            method: method,
            headers: defaultHeaders,
            body: data
        });

        if(response.ok) {
            const json = await response.json();
            return resolve(json);
        }

        return reject(response)
    });
}

export const fetchBasic = async (
url: string,
method = "GET",
headers? : {},
data?: string
) => {
    return new Promise(async (resolve, reject) => {
        const defaultHeaders = {
            ...headers,
            "Content-Type": "application/json",
        }

        const response = await fetch(BASE_URL + url, {
            method: method,
            headers: defaultHeaders,
            body: data
        });

        if(response.ok) {
            const json = await response.json();
            return resolve(json);
        }

        return reject(response)
    });
}