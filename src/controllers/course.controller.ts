import { Request,Response,NextFunction } from "express";
import { addCourse,getCourse,updateCourse,publishCourse } from "../services/course.service";
import { StatusCodes } from "http-status-codes";

class CourseController{
  addCourse = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{
      const course = req.body
      const newCourse = await addCourse(req.currentUser.id,course)
      res.status(StatusCodes.CREATED).json(newCourse)
    }
    catch(err)
    {
      next(err)
    }
  }
  getCourse = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{
      const course = await getCourse(req.params.id)
      res.status(StatusCodes.ACCEPTED).json(course)
    }
    catch(err)
    {
      next(err)
    }
  }
  updateCourse = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{
      const updatedCourse = await updateCourse(req.params.id,req.body)
      res.status(StatusCodes.ACCEPTED).json(updatedCourse)
    }
    catch(err)
    {
      next(err)
    }
  }
  publishCourse = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{
      const publishedCourse = await publishCourse(req.params.id)
      res.status(StatusCodes.ACCEPTED).json(publishedCourse)
    }
    catch(err)
    {
      next(err)
    }
  }

}

export default new CourseController()
