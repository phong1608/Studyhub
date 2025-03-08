import prisma from "prisma/prsima-client";
import { winstonLogger } from "../utils/logger";
import { Logger } from "winston";
import Discount from "../interfaces/models/discount.interface";


const log:Logger = winstonLogger(process.env.ELASTIC_SEARCH_URL,'DiscountService','debug')

const addDiscount = async(userId:string,{courseId,amount,code,isPublic}:Discount)=>{
    try{
        const course = await prisma.course.findUnique({
            where:{
                id:courseId,
                instructorId:userId
            }
        }
        )
        if(!course){
            throw new Error('User is not authorized to add discount')
        }
        const discount = await prisma.discount.create({
            data:{
                amount:amount,
                courseId:courseId,
                code:code,
                public:isPublic
            }
        })
        log.info(`New discount added to ${courseId}`)
        return discount
    }
    catch(err){
        log.error(`addDiscount() method ${err.message}`);
        throw err
    }
}

const deleteDiscount = (discountId:string)=>{
    try{
        prisma.discount.delete({
            where:{
                id:discountId
            }
        })
        log.info(`Discount with id ${discountId} has been deleted`)
    }
    catch(err){
        log.error(`deleteDiscount() method ${err.message}`)
        throw err
    }
}
const applyDiscount = async(code:string,courseId:string)=>{
    try{
        const discount = await prisma.discount.findUnique({
            where:{
                code:code,
                courseId:courseId
            }
        })
        if(!discount)
        {
            throw new Error('Discount not found')
        }
        return discount
        
        
    }
    catch(err){
        log.error(`applyDiscount() method ${err.message}`)
        throw err
    }
}
export {addDiscount, deleteDiscount,applyDiscount}
