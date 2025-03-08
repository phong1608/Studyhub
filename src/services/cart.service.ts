import prisma from '../../prisma/prsima-client'
import { winstonLogger } from '../utils/logger';
import { Logger } from 'winston';
import {BadRequestError} from '../interfaces/error.interface'
const log:Logger = winstonLogger(process.env.ELASTIC_SEARCH_URL,'CartService','debug')
const addToCart=async(userId:string,courseId:string)=>{
    try{
        let userCart = await prisma.cart.findUnique({
          where: {
            userId: userId
          }
          
        });
        if (!userCart) {
            userCart=await prisma.cart.create({
            data: {
              userId: userId
            }
          });
        }
        const cartItem = await prisma.cartItem.findFirst({
            where:{
                courseId:courseId,
            }
        })
        if(cartItem)
        {
            throw new BadRequestError('Course already in cart','Add to Cart')
        }
        else{

            await prisma.cartItem.create({
                data:{
                    courseId:courseId,
                    cartId:userCart.id
                }})
        }
         return userCart

    }
    catch(err){
        log.error(`addToCart() method ${err.message}`)
        throw err
    }
}
const getUserCart = async (userId: string) => {
    try {
      const userCart = await prisma.cart.findUnique({
        where: {
          userId: userId
        },
        include: {
          cartItems: {
            include: {
              course: {
                select: {
                  id: true,
                  name: true,
                  thumbnail: true,
                  price: true
                }
              }
            }
          }
        }
      });
      return userCart;
    } catch (err) {
      console.log(err);
    }

}

const deleteUserCart = async (userId: string) => {
    try {
      await prisma.cartItem.deleteMany({
        where: {
          cart: {
            userId: userId
          }
        }
      });

    } catch (err) {
      console.log(err);
}
}

export {addToCart,getUserCart,deleteUserCart}
