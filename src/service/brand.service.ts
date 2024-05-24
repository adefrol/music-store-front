import { IBrand } from "@/interfaces/brand.interface";
import { API_URL } from "@/lib/api_url";
import axios from "axios";

export const BrandService = {
    async getOne(id: number) {
        const { data } = await axios.get<IBrand>(`${API_URL}/brand/${id}`);
        return data;
    },
    async getAll() {
        const { data } = await axios.get<IBrand[]>(`${API_URL}/brand`);
        return data;
    },
};
