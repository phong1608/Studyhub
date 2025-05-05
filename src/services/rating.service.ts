import prisma from "../../prisma/prsima-client";

import { winstonLogger } from "../utils/logger";
import { Logger } from 'winston'

const log:Logger = winstonLogger(process.env.ELASTIC_SEARCH_URL,'RatingService','debug')
const addRating = async (userId: string, courseId: string, rating: number, review: string) => {
  try {
    await prisma.rating.create({
      data: {
        userId: userId,
        courseId: courseId,
        rating: rating,
        review: review
      }
    });
    await prisma.enrollment.update({
      where: {
        userId_courseId: {
          userId: userId,
          courseId: courseId
        }
      },
      data: {
        rating: rating
      }
    });
    
    log.info(`Rating with userId ${userId} added to course with id ${courseId}`);
  } catch (err) {
    log.error(`addRating() method ${err.message}`);
  }
}
const getAllUserRating = async (courseId: string, page: number = 1, pageSize: number = 10) => {
  try {
    const skip = (page - 1) * pageSize;
    const ratings = await prisma.rating.findMany({
      where: {
        courseId: courseId
      },
      skip: skip,
      take: pageSize
    });
    return ratings;
  } catch (err) {
    log.error(`getAllUserRating() method ${err.message}`);
  }
}
const getRatingByInstructor = async(userId: string, page: number = 1, pageSize: number = 10) => {
  try {
    const instructor = await prisma.instructor.findFirst({
      where:{
        userId: userId
      }
    })
    const skip = (page - 1) * pageSize;
    const ratings = await prisma.rating.findMany({
      where: {
        course: {
          instructorId: instructor.id
        }
      },
      select:{
        rating:true,
        review:true,
        user:{
          select:{
            id:true,
            name:true,
            profilePicture:true
          }
        },
        course:{
          select:{
            id:true,
            name:true
          }
        }
      },
      skip: skip,
      take: pageSize
    });
    return ratings;
  } catch (err) {
    log.error(`getRatingByInstructor() method ${err.message}`);
  }
}
const getRatingByCourseId = async (courseId: string, page: number = 1, pageSize: number = 9) => {
  try {
    const skip = (page - 1) * pageSize;
    const ratings = await prisma.rating.findMany({
      where: {
        courseId: courseId
      },
      select:{
        rating:true,
        review:true,
        user:{
          select:{
            id:true,
            name:true,
            profilePicture:true
          }
        }
      },
      skip: skip,
      take: pageSize
    });
    return ratings;
  } catch (err) {
    log.error(`getRatingByCourseId() method ${err.message}`);
  }
}
const getAverageRating = async (courseId: string) => {
  try {
    const ratings = await prisma.rating.findMany({
      where: {
        courseId: courseId
      },
      select: {
        rating: true
      }
    });
    const totalRating = ratings.reduce((acc, rating) => acc + rating.rating, 0);
    const averageRating = totalRating / ratings.length;
    return averageRating;
  } catch (err) {
    log.error(`getAverageRating() method ${err.message}`);
  }
}
export {addRating,getAllUserRating,getRatingByInstructor,getRatingByCourseId,getAverageRating}
