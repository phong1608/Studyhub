import prisma from "../../prisma/prsima-client";
import { IDiscountCreate } from "../interfaces/models/discount.inteface";
import { DiscountType, DiscountStatus } from "@prisma/client";
import { getCourse } from "./course.service";

const addDiscount = async ({ code, courseId, amount, type, status, expiredAt, public: isPublic }: IDiscountCreate) => {
    const discount = await prisma.discount.create({
        data: {
            code,
            courseId,
            amount,
            type: type as DiscountType,
            status: status as DiscountStatus,
            expiredAt: new Date(expiredAt),
            public: isPublic,
        }
    });
    return discount;
}

const getAllDiscountByUserId = async (userId: string) => {
    const instructor = await prisma.instructor.findFirst({
        where: {
            userId: userId
        }
    })
    if (!instructor) {
        throw new Error("Instructor not found")
    }
    const discounts = await prisma.discount.findMany({
        where: {
            course: {
                instructorId: instructor.id
            }
        },
        include: {
            course: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    });
    return discounts;
}

const getDicountByCourseId = async (courseId: string) => {
    const discount = await prisma.discount.findFirst({
        where: {
            courseId: courseId,
            status: DiscountStatus.Active,
            public: true,
            expiredAt: {
                gte: new Date()
            }
        },
        include: {
            course: {
                select: {
                    id: true,
                    name: true,
                    price: true 
                }
            }
        }
    })
    if (!discount) {
        return null
    }
    return discount
}

const calculateDiscountedPrice = async (courseId: string) => {
    const course = await getCourse(courseId)
    const discount = await getDicountByCourseId(courseId);
    const originalPrice = course.price; 
    if(!discount)
    {
        return originalPrice
    }
    let discountedPrice = originalPrice;
    if (!discount || !discount.course) {
        return originalPrice
    }



    if (discount.type === DiscountType.Percentage) {
        discountedPrice = originalPrice - (originalPrice * discount.amount / 100);
    } else if (discount.type === DiscountType.Fixed) {
        discountedPrice = originalPrice - discount.amount;
    }

    return Math.max(discountedPrice, 0); 
}

export { addDiscount, getAllDiscountByUserId, getDicountByCourseId, calculateDiscountedPrice }