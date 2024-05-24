import { IBrand } from './brand.interface'

export interface ICategory {
    id: number;
    name: string;
    subcategory: string
    brands: IBrand[]
}