import { addSection,updateSection,deleteLesson } from "../services/section.service";
import { StatusCodes } from "http-status-codes";
import {Request,Response,NextFunction} from 'express'

class SectionController{
  addSection = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{
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
}


export default new SectionController();
