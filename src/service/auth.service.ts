import { API_URL } from "@/lib/api_url";
import axios, { AxiosError } from "axios";

export const AuthService = {
    async isAuth() {
        try {
            const data = await axios.get(`${API_URL}/auth/admin`);
            if(data) {
                return true
            }
        } catch (e) {
            const error = e as AxiosError
            return error.response?.status == 200
        }
    },
};
