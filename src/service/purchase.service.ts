import {
    INewPurchase,
    IPurchase,
    IStatusUpdate,
} from "@/interfaces/purchase.interface";
import { API_URL } from "@/lib/api_url";
import axios from "axios";
import { UserService } from "./user.service";
axios.defaults.headers.common['ngrok-skip-browser-warning'] = '69420'
export const PurchaseService = {
    async create(purchaseData: INewPurchase) {
        const { data } = await axios.post(
            `${API_URL}/purchase`,
            JSON.stringify(purchaseData),
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${UserService.getToken()}`,
                },
            }
        );
        return data;
    },

    async getAll() {
        const { data } = await axios.get<IPurchase[]>(`${API_URL}/purchase`, {
            headers: {
                Authorization: `Bearer ${UserService.getToken()}`,
            },
        });
        return data;
    },

    async updateStatus(updateData: IStatusUpdate) {
        const { data } = await axios.patch(
            `${API_URL}/purchase`,
            JSON.stringify(updateData),
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${UserService.getToken()}`,
                },
            }
        );
        return data;
    },
};
