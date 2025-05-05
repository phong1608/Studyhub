import { Request,Response,NextFunction } from "express";
import { addCourse,getCourse,updateCourse,publishCourse,getAllCourse,getCourseByInstructorId,getCourseByCategoryId,getCourseWithRating,getSearchCourse,getInstructorCourse,updateCourseByCourseId } from "../services/course.service";
import { StatusCodes } from "http-status-codes";

class CourseController{
  addCourse = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{
      const course = req.body
      course.thumbnail = req.file.buffer
      course.price = parseFloat(req.body.price)
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
      const course = await getCourse(req.params.courseId)
      res.status(StatusCodes.ACCEPTED).json(course)
    }
    catch(err)
    {
      next(err)
    }
  }
  getAllCourse = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{
      const courses = await getAllCourse()
      res.status(StatusCodes.ACCEPTED).json(courses)
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
      const publishedCourse = await publishCourse(req.params.courseId)
      res.status(StatusCodes.ACCEPTED).json(publishedCourse)
    }
    catch(err)
    {
      next(err)
    }
  }
  getCourseByInstructorId = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{
      const courses = await getCourseByInstructorId(req.params.instructorId)
      res.status(StatusCodes.ACCEPTED).json(courses)

    }
    catch(err)
    {
      next(err)
    }
  }
  getCourseByCategoryId = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{
      const courses = await getCourseByCategoryId(req.params.categoryId, parseInt(req.params.page, 10), 9, req.query);
      res.status(StatusCodes.ACCEPTED).json(courses)
    }
    catch(err)
    {
      next(err)
    }
  }
  getCourseWithRating = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{
      const courses = await getCourseWithRating(req.params.courseId);
      res.status(StatusCodes.ACCEPTED).json(courses)
    }
    catch(err)
    {
      next(err)
    }
  }
  getCourseBySearch = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{
      const courses = await getSearchCourse(req.params.search,parseInt(req.params.page, 10), 9, req.query);
      res.status(StatusCodes.ACCEPTED).json(courses)
    }
    catch(err)
    {
      next(err)
    }
  }
  getIntructorCourse = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{
      const courses = await getInstructorCourse(req.currentUser.id)
      res.status(StatusCodes.ACCEPTED).json(courses)
    }
    catch(err)
    {
      next(err)
    }
  }
  updateCourseByCourseId = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{
      const course = req.body
      if(req.file){

        course.thumbnail = req.file.buffer
      }
      const updatedCourse = await updateCourseByCourseId(req.params.courseId,course)
      console.log(course)
      res.status(StatusCodes.ACCEPTED).json(updatedCourse)
    }
    catch(err)
    {
      next(err)
    }
  }

}

export default new CourseController()
