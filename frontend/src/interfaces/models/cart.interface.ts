
import { CoursePreview } from "./course.interface";
export  interface CartItem {
    cartId: string;
    courseId: string;
    createdAt: Date;
    updatedAt: Date;
    course: CoursePreview;
}
export  interface Cart {
    id: string;
    userId: string;
    createdAt: Date;
    cartItems: CartItem[];
}
