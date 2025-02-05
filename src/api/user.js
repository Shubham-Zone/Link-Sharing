import { token, username } from "../utils/localstore";
import axios from "axios";

export const fetchUser = async () => {
    try {
        const res = await axios.get(`${import.meta.env?.VITE_BASE_URL}/user`, {
            headers: {
                "email": username,
                "x-auth-token": token
            }
        });
        return res;
    } catch (e) {
        throw e;
    }
};