export interface IBanner {
    id: number,
    image: string,
    expired_at: string
}

export interface INewBanner {
    image?: string,
    expired_at?: string
}