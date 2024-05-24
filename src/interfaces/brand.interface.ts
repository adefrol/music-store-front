import { ICategory } from './category.interface'

export interface IBrand {
    id: number;
    name: string
    categories: ICategory[]
}
