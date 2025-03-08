import prisma from "prisma/prsima-client";
import { winstonLogger } from "../utils/logger";
import { Logger } from 'winston'

const log:Logger = winstonLogger(process.env.ELASTIC_SEARCH_URL,'RatingService','debug')
const addRating = async (userId: string, courseId: string, rating: number,review:string) => {
    try {
        await prisma.rating.create({
            data: {
                userId: userId,
                courseId: courseId,
                rating: rating,
                review: review
            }
        });
        log.info(`Rating with userId ${userId} added to course with id ${courseId}`)
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

export {addRating,getAllUserRating}
