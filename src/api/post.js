import axios from "axios";
import { token, uuid } from "../utils/localstore";

export const addPost = async (id, content, createdBy, name) => {
    console.log("Topic is for adding post is", id);

    try {
        const res = await axios.post(`${import.meta.env?.VITE_BASE_URL}/create-post`,
            {
                "topicId": id,
                "content": content,
                "createrName": createdBy,
                "createrUsername": uuid,
                "topicName": name
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

export const fetchPosts = async (id) => {
    try {
        const res = await axios.get(`${import.meta.env?.VITE_BASE_URL}/posts/${id}`, {
            headers: {
                "x-auth-token": token
            }
        });
        return res;
    } catch (e) {
        throw e;
    }
};

export const fetchPublicPosts = async () => {
    try {
        const res = await axios.get(`${import.meta.env?.VITE_BASE_URL}/public-posts`, {
            headers: {
                "x-auth-token": token
            }
        });
        return res;

    } catch (e) {
        throw e;
    }
};

export const countPosts = async (id) => {
    try {
        const res = await axios.get(`${import.meta.env?.VITE_BASE_URL}/posts/${id}`,
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