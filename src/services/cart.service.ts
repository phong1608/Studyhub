import prisma from '../../prisma/prsima-client'
import { winstonLogger } from '../utils/logger';
import { Logger } from 'winston';
import {BadRequestError} from '../interfaces/error.interface'
import {checkUserEnrollment} from './enrollment.service'
import {getDicountByCourseId} from './discount.service'
const log:Logger = winstonLogger(process.env.ELASTIC_SEARCH_URL,'CartService','debug')
const addToCart=async(userId:string,courseId:string)=>{
    try{
        const isEnrolled = await checkUserEnrollment(userId,courseId)
        if(isEnrolled){
            throw new BadRequestError('Bạn đã mua khóa học này','Add to Cart')
        }
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
            throw new BadRequestError('Khóa học đã có trong giỏ hàng','Add to Cart')
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

    if (!userCart) {
      return null;
    }
    let totalPrice = 0;
    let discountPrice = 0;
    const coupon = []
    for (const item of userCart.cartItems) {
      const coursePrice = item.course.price;
      totalPrice += coursePrice;

      const discount = await getDicountByCourseId(item.course.id);
      if (discount&& discount.type==='Percentage') {
        coupon.push(discount.code)
        discountPrice += (coursePrice * discount.amount) / 100;
      }
      if(discount&& discount.type==='Fixed') {
        coupon.push(discount.code)
        discountPrice += discount.amount;
      }
    }

    return {
    ...userCart,
    totalPrice,
    discountPrice,
    coupon,
    finalPrice: totalPrice - discountPrice
    };
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
const removeFromCart = async(userId:string,courseId:string)=>
{
  try{
    return await prisma.cartItem.deleteMany({
      where:{
        cart:{
          userId:userId
        },
        courseId:courseId
      }
    })
  }
  catch(err)
  {
    log.error(err)
  }
}

export {addToCart,getUserCart,deleteUserCart,removeFromCart}
