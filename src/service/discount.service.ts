import { IDiscount, INewDiscount } from "@/interfaces/discount.interface";
import axios, {  AxiosError, AxiosResponse } from "axios";
import { API_URL } from "@/lib/api_url";
import { UserService } from "./user.service";
axios.defaults.headers.common['ngrok-skip-browser-warning'] = '69420'
export const DiscountService = {
    async getAll() {
        const { data } = await axios.get<IDiscount[]>(`${API_URL}/discount`, {
            headers: {
                Authorization: `Bearer ${UserService.getToken()}`,
            },
        });
        return data;
    },
    async delete(id: number) {
        const { data } = await axios.delete(`${API_URL}/discount/${id}`, {
            headers: {
                Authorization: `Bearer ${UserService.getToken()}`,
            },
        });
        return data;
    },

    async create(discount: INewDiscount) {
        try {
            const  data  = await axios.post<AxiosResponse>(
                `${API_URL}/discount`,
                JSON.stringify(discount),
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${UserService.getToken()}`,
                    },
                }
            );
            return data.status;
        } catch (e) {
            const error = e as AxiosError;
            return error.response?.status;
        }
    },
};
