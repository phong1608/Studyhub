import prisma from "../../prisma/prsima-client";    
import { BadRequestError } from "../interfaces/error.interface";


const addNewRevenue = async (userId: string, amount: number) => {
    try {
        const instructor = await prisma.instructor.findFirst({
            where: {
                id: userId
            }
        })
        if (!instructor) {
            throw new BadRequestError('Instructor not found', 'Add Revenue')
        }
        const revenue = await prisma.revenue.create({
            data: {
                instructorId: instructor.id,
                amount: amount
            }
        })
        return revenue
    } catch (err) {
        throw new BadRequestError(err.message, 'Add Revenue')
    }
}

const getRevenueByUserId = async (userId: string) => {

    try{
        const instructor = await prisma.instructor.findFirst({
            where: {
                userId: userId
            }
        })
        if (!instructor) {
            throw new BadRequestError('Instructor not found', 'Get Revenue')
        }
        const revenue = await prisma.revenue.findMany({
            where: {
                instructorId: instructor.id
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        return revenue
    }
    catch(err){
        throw new BadRequestError(err.message, 'Get Revenue')
    }
}


export {addNewRevenue,getRevenueByUserId}