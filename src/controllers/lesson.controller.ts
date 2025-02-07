import { LessonFactory } from "../services/lesson.service";
import { Request,Response,NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

class LessonController
{
  addLesson = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{
      const lesson = req.body
      const newLesson = await LessonFactory.createLesson(req.body.lessonType,lesson)
      res.status(StatusCodes.CREATED).json(newLesson)
    }
    catch(err)
    {
      next(err)
    }
  }
  getLessonById = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{
      const lesson = await LessonFactory.getLessonById(req.params.id)
      res.status(StatusCodes.OK).json(lesson)
    }
    catch(err)
    {
      next(err)
    }
  }
  updateLesson = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{
      const updatedLesson = await LessonFactory.updateLesson(req.body.lessonType,req.params.id,req.body)
      res.status(StatusCodes.ACCEPTED).json(updatedLesson)
    }
    catch(err)
    {
      next(err)
    }
  }
  deleteLesson = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{
      const deletedLesson = await LessonFactory.deleteLesson(req.params.id)
      res.status(StatusCodes.ACCEPTED).json(deletedLesson)
    }
    catch(err)
    {
      next(err)
    }
  }
}


export default new LessonController()
