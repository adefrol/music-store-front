import { ICategory } from '@/interfaces/category.interface'
import { API_URL } from '@/lib/api_url'
import axios from 'axios'

export const CategoryService = {
    async getAll() {
        const { data } = await axios.get<ICategory[]>(`${API_URL}/category`);
        return data;
    },

    async getOne(id: number) {
        const { data } = await axios.get<ICategory>(`${API_URL}/category/${id}`);
        return data;
    }
};
