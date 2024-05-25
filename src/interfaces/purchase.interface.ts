import { IProduct } from "./product.interface";
import { IUser } from "./user.interface";

export interface IPurchase {
    id: number;
    address: string;
    payType: string;
    status: string;
    sum: number;
    user?: IUser;
    purchaseDetails: IPurchaseDetails[];
    created_at: string;
}

export interface INewPurchase {
    address?: string;
    payType?: string;
    status: string;
    sum: number;
    user?: number;
    products: IPurchaseProducts[]
}

export interface IStatusUpdate {
    id: number;
    status: string
}

export interface IPurchaseProducts {
    product?: number;
    count?: number;
  }

export interface ICartProduct{
    product: IProduct;
    count: number
}

export interface IPurchaseDetails {
    id: number;
    count: number;
    product: IProduct;
}
