import {  } from "./product.interface";
import { IPurchase,  } from "./purchase.interface";

export interface IUser {
    id?: string | number;
    name?: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
}


export interface IUserPurchases {
    id?: string | number;
    name?: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
    purchases: IPurchase[];
}

export interface IUserErrors {
    name?: string;
    email?: string;
    password?: string;
    phone?: string;
}

export interface ILogin {
    access_token?: string;
    status: number;
}
