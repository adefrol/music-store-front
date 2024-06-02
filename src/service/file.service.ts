import axios from 'axios'
import { API_URL } from '../lib/api_url'
import { IFileResponse } from '../interfaces/file.interface'
import { UserService } from './user.service'
axios.defaults.headers.common['ngrok-skip-browser-warning'] = '69420'
export const FileService = {
    async create(file: File, folder: string) {

        const formData = new FormData();
        formData.append("file", file);

        const {data} =  await axios.post<IFileResponse>(`${API_URL}/files/upload?folder=${folder}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization" : `Bearer ${UserService.getToken()}`
            },
        });

        return data.fileName
    },
};