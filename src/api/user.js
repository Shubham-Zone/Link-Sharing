import { token, uuid } from "../utils/localstore";
import axios from "axios";

export const fetchUser = async () => {
    try {
        const res = await axios.get(`${import.meta.env?.VITE_BASE_URL}/user`, {
            headers: {
                "uuid": uuid,
                "x-auth-token": token
            }
        });
        return res;
    } catch (e) {
        throw e;
    }
};

export const fetchUserUsingUuid = async (userId) => {
    try {
        const res = await axios.get(`${import.meta.env?.VITE_BASE_URL}/user`, {
            headers: {
                "uuid": userId,
                "x-auth-token": token
            }
        });
        return res;
    } catch (e) {
        throw e;
    }
};