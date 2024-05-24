import { IBrand } from "./brand.interface";
import { ICategory } from "./category.interface";
import { IDiscount } from './discount.interface'

export interface IProduct {
    id: number;
    brand: IBrand;
    model: string;
    category: ICategory;
    price: string;
    description: string;
    image: string;
    extra_parameters: string | Object;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    discount: IDiscount
}

export interface IProductInCart {
    id?: number;
    brand?: IBrand;
    model?: string;
    category?: ICategory;
    price?: string;
    description?: string;
    image?: string;
    extra_parameters?: string | Object;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
    discount?: IDiscount
}

export interface IProductCreate {
    brand?: number;
    model?: string;
    category?: number;
    price?: string;
    description?: string;
    image?: string;
    extra_parameters?: string;
}
