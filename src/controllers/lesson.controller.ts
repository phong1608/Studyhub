import { LessonFactory } from "../services/lesson.service";
import { Request,Response,NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
class LessonController
{
  addLesson = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{

      const video = req.file.buffer
      req.body.position = parseFloat(req.body.position)
      const newLesson = await LessonFactory.createLesson(req.body.lessonType,{videoUrl:video,...req.body})
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
  getCourseFirstLesson = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{
      const lesson = await LessonFactory.getFirstCourseLesson(req.params.courseId)
      res.status(StatusCodes.OK).json(lesson)
    }
    catch(err)
    {
      next(err)
    }
  }
}


export default new LessonController()
