import { IBanner, INewBanner } from "@/interfaces/banner.interface";
import { API_URL } from "@/lib/api_url";
import axios from "axios";
import { UserService } from "./user.service";
import { FileService } from "./file.service";

axios.defaults.headers.common['ngrok-skip-browser-warning'] = '69420'

export const BannerService = {
    async getAll() {
        const { data } = await axios.get<IBanner[]>(`${API_URL}/banner`);
        return data;
    },
    async delete(id: number) {
        const { data } = await axios.delete(`${API_URL}/banner/${id}`, {
            headers: {
                Authorization: `Bearer ${UserService.getToken()}`,
            },
        });
        return data;
    },

    async create(banner: INewBanner, folder: string, file: File) {
        let fileName: string = "";
        try {
            fileName = await FileService.create(file, folder);
        } catch (e) {
            console.log(e);
            return;
        }
        const { data } = await axios.post(
            `${API_URL}/banner`,
            JSON.stringify({ ...banner, image: fileName }),
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization" : `Bearer ${UserService.getToken()}`
                },
            }
        );
        return data;
    },
};
