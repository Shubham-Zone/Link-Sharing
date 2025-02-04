import axios from "axios";
import { token } from "../utils/localstore";

export const subscribeTopic = async (id, name, user) => {
    try {
        const res = await axios.post(`${import.meta.env?.VITE_BASE_URL}/subscribe`,
            {
                "topic_id": id,
                "topic": name,
                "user": user,
                "seriousness": "serious",
                "dateCreated": "2025-01-12"
            },
            {
                headers: {
                    "x-auth-token": token
                }
            }
        );
        return res;
    } catch (e) {
        throw e;
    }
};

export const unsubscribeTopic = async (topic_id) => {
    try {
        const res = await axios.delete(`${import.meta.env?.VITE_BASE_URL}/unsubscribe`, {
            headers: {
                "x-auth-token": token
            },
            data: {
                topic_id: topic_id
            }
        });
        return res;
    } catch (e) {
        throw e;
    }
};

export const countSubscriptions = async (id) => {
    try {
        const res = await axios.get(`${import.meta.env?.VITE_BASE_URL}/subscription-count/${id}`, {
            headers: {
                "x-auth-token": token,
            }
        });
        return res;
    } catch (e) {
        throw e;
    }
};

export const deleteTopic = async (id) => {
    try {
        const res = await axios.delete(`${import.meta.env?.VITE_BASE_URL}/delete-topic`, {
            headers: {
                "x-auth-token": token
            },
            data: {
                topic_id: id
            }
        });
        return res;
    } catch (e) {
        throw e;
    }
};

export const updateTopic = async (id, editedName) => {
    try {
        const res = await axios.put(`${import.meta.env?.VITE_BASE_URL}/update-topic`,
            {
                'topicId': id,
                'newName': editedName
            },
            {
                headers: {
                    "x-auth-token": token
                }
            });
        return res;
    } catch (e) {
        throw e;
    }
};
