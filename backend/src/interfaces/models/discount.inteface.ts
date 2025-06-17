export interface IDiscountCreate {
    code: string;
    courseId: string;
    type: string;
    status: string;
    public: boolean;
    expiredAt: Date;
    amount: number;
}
export interface IDiscountUpdate {
    code?: string;
    discount?: number;
    courseId?: string;
    type?: string;
    status?: string;
    public?: boolean;
    expiredAt?: Date;
    amount?: number;
}
export interface IDiscountContext {
    id: string;
    code: string;
    discount: number;
    courseId: string;
    type: string;
    status: string;
    public: boolean;
    expiredAt: Date;
    amount: number;
    createdAt: Date;
    updatedAt: Date;
    course: {
        id: string;
        name: string;
    };
    rating:number;
}