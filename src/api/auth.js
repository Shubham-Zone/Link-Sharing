import axios from "axios";

export const login = async (email, password) => {
    try {
        const res = await axios.post(`${import.meta.env?.VITE_BASE_URL}/login`, {
            userName: email,
            password: password
        }, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return res;
    } catch (e) {
        throw e;
    }
};

export const register = async (data) => {
    try {
        const res = await axios.post(`${import.meta.env?.VITE_BASE_URL}/register`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return res;
    } catch (e) {
        throw e;
    }
};

export const resetPassword = async (id, token, password) => {
    try {
        const res = await axios.post(
            `${import.meta.env?.VITE_BASE_URL}/resetPassword`,
            { id, token, password },
            {
                headers: { "Content-Type": "application/json" }
            }
        );
        return res;
    } catch (e) {
        throw e;
    }
};

export const requestPasswordReset = async (email) => {
    try {
        const response = await axios.post(`${import.meta.env?.VITE_BASE_URL}/requestPasswordReset`,
            {
                "email": email
            }
        );
        return response;
    } catch (e) {
        throw e;
    }
};