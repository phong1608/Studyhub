import { addSection,updateSection,deleteLesson,getAllCourseSections } from "../services/section.service";
import { StatusCodes } from "http-status-codes";
import {Request,Response,NextFunction} from 'express'

class SectionController{
  addSection = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{
      req.body.position = parseFloat(req.body.position)
      const newSection = await addSection(req.body)
      res.status(StatusCodes.CREATED).json(newSection)
    }
    catch(err)
    {
      next(err)
    }
  }
  updateSection = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{
      const updatedSection = await updateSection(req.params.id,req.body)
      res.status(StatusCodes.ACCEPTED).json(updatedSection)
    }
    catch(err)
    {
      next(err)
    }
  }
  deleteSection = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{
      const deletedSection = await deleteLesson(req.params.id)
      res.status(StatusCodes.ACCEPTED).json(deletedSection)
    }
    catch(err)
    {
      next(err)
    }
  }
  getAllCourseSections = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{
      const sections = await getAllCourseSections(req.params.courseId)
      res.status(StatusCodes.ACCEPTED).json(sections)
    }
    catch(err)
    {
      next(err)
    }
  }
}


export default new SectionController();
