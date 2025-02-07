import { signIn,signUp } from "../services/auth.service";
import {addInstructor,getInstructorProfile} from '../services/user.service'
import {NextFunction, Request,Response} from 'express'
import { StatusCodes } from "http-status-codes";
import {NotAuthorizedError} from '../interfaces/error.interface'
class UserController{
  signUp=async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{

      const user = req.body
      const newUser = await signUp(user)
      res.status(StatusCodes.CREATED).json(newUser)
    }
    catch(err)
    {
      next(err)
    }
  }
  signIn = async(req:Request, res:Response, next:NextFunction):Promise<void>=>{
    try{
      const {email,password} = req.body
      const user = await signIn({email,password})
      res.status(StatusCodes.OK).json(user)
    }
    catch(err){
      next(err)
  }
  }
  addInstructor = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{
      if(!req.currentUser)
      {
        throw new NotAuthorizedError("Authorization Required","Add Instructor")
      }
      res.status(StatusCodes.CREATED).json(await addInstructor({userId:req.currentUser.id}))
    }
    catch(err)
    {
      next(err)
    }
  }
  getInstructor = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{
      if(!req.currentUser)
      {
        throw new NotAuthorizedError("Authorization Required","Get Instructor")
      }
      res.status(StatusCodes.OK).json(await getInstructorProfile(req.currentUser.id))
    }
    catch(err)
    {
      next(err)
    }
  }
}

export default new UserController();
