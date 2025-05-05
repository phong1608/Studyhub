import prisma from "../../prisma/prsima-client";

import { addNewRevenue } from './revenue.service';
import {calculateDiscountedPrice } from './discount.service';

const addEnrollemnt = async (cartId: string,courseId:string) => {
  try {
    const userCart = await prisma.cart.findUnique({
      where: {
        id: cartId
      },
      include: {
        user: true
      }
    })
    const newEnrollment = await prisma.enrollment.create({
      data: {
        userId: userCart.user.id,
        courseId: courseId
      }
    });
    return newEnrollment;
  }
   catch (err) {
    console.log(err);
  }
}
const addEnrollemntFromCart = async (cartId: string) => {
  try {
    const userCart = await prisma.cart.findUnique({
      where: {
        id: cartId
      },
      include: {
        cartItems: {
          include: {
            course: {
              select: {
                id: true,
                instructorId: true,
              }
            }
          }
        }
      }
    });
    const courses = userCart.cartItems.map((item) => item.course);

    courses.forEach(async (course) => {
      await addEnrollemnt(cartId, course.id);
      const amount = await calculateDiscountedPrice(course.id)
      await addNewRevenue(course.instructorId, amount);
    })
    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id
      }
    })
  }
   catch (err) {
    console.log(err);
  }
}
const getUserEnrollment = async (userId: string) => {
  try {
    const userEnrollment = await prisma.enrollment.findMany({
      where: {
        userId: userId,
      },
      include: {
        course: {
          select: {
            name: true,
            thumbnail: true,
            id: true,
          }
        },
        // lesson:{
        //   select:{
        //     id:true,
        //     name:true
        //   }
        // }
      }
    });
    return userEnrollment;
  } catch (err) {
    console.log(err);
    throw err
  }
}
const checkUserEnrollment = async (userId: string,courseId:string):Promise<boolean> =>{
  const userEnrollment=await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId: userId,
        courseId: courseId
      }
    }
  })
  return userEnrollment?true:false
}
export {addEnrollemnt,getUserEnrollment,checkUserEnrollment,addEnrollemntFromCart}
