import prisma from "../../prisma/prsima-client";



const addEnrollemnt = async (userId: string,courseId:string) => {
  try {
    const newEnrollment = await prisma.enrollment.create({
      data: {
        userId: userId,
        courseId: courseId
      }
    });
    return newEnrollment;
  }
   catch (err) {
    console.log(err);
  }
}
const addEnrollemntFromCart = async (userId: string) => {
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
              }
            }
          }
        }
      }
    });
    const courseId = userCart.cartItems.map((item) => item.course.id);

    courseId.forEach(async (courseId) => {
      await addEnrollemnt(userId, courseId);
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
