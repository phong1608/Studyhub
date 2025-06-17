import {addRating,getAllUserRating,getRatingByInstructor,getRatingByCourseId} from '../services/rating.service'

import {Request,Response,NextFunction} from 'express'

import { StatusCodes } from "http-status-codes";
import { NotAuthorizedError } from '../interfaces/error.interface';


class RatingController{
  addRating = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{
        if(!req.currentUser)
        {
            throw new NotAuthorizedError("Authorization Required","Get User Credentials")
        }
        req.body.rating = parseFloat(req.body.rating)
        const {courseId,review,rating} = req.body
      const newRating = await addRating(req.currentUser.id,courseId,rating,review)
      res.status(StatusCodes.CREATED).json(newRating)
    }
    catch(err)
    {
      next(err)
    }
  }
  getAllUserRating = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{
      if(!req.currentUser)
      {
        throw new NotAuthorizedError("Authorization Required","Get User Credentials")
      }
      const ratings = await getAllUserRating(req.currentUser.id)
      res.status(StatusCodes.OK).json(ratings)
    }
    catch(err)
    {
      next(err)
    }
  }
  getRatingByInstructor = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{
      if(!req.currentUser)
      {
        throw new NotAuthorizedError("Authorization Required","Get User Credentials")
      }
      const ratings = await getRatingByInstructor(req.currentUser.id)
      res.status(StatusCodes.OK).json(ratings)
    }
    catch(err)
    {
      next(err)
    }
  }
  getRatingByCourseId = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{
      
      const ratings = await getRatingByCourseId(req.params.courseId, parseInt(req.params.page, 10), 9)
      res.status(StatusCodes.OK).json(ratings)
    }
    catch(err)
    {
      next(err)
    }
  }
}
export default new RatingController()