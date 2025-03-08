import { IAuthPayload } from '../interfaces/auth.interface';
import { NextFunction,Request,Response } from "express";
import jwt from "jsonwebtoken"
import {NotAuthorizedError,ServerError} from "../interfaces/error.interface"
import { checkUserEnrollment } from '../services/enrollment.service';
import { UserType } from '@prisma/client';




class AuthMiddleware{

   verifyUser = async (req:Request, res:Response,next:NextFunction):Promise<void> => {
    try{

      const tokens = req.cookies?.token;
      if(!req.cookies)
      {
          throw new NotAuthorizedError(`Authentication is required`,"Verify user")
      }
      if(!tokens)
          throw new NotAuthorizedError(`Authentication is required`,"Verify user")
      if(!process.env.JWT_KEY)
      {

          throw new ServerError('JWT is not provided','Verify User')
      }
      const decoder:IAuthPayload = await jwt.verify(tokens,process.env.JWT_KEY) as IAuthPayload
      req.currentUser=decoder
      next()
    }
    catch(err)
    {
        next(err)
    }
  }


   verifyUserEnrollment = async (req:Request, res:Response,next:NextFunction) => {
    try{
      if(!req.currentUser)
      {
          throw new NotAuthorizedError(`Authorization is required`,"Verify User Enrollment")
      }
      const isEnroll = await checkUserEnrollment(req.currentUser.id,req.params.courseId)
      if(!isEnroll)
      {
          throw new NotAuthorizedError(`User is not enrolled in the course`,"Verify User Enrollment")
      }
      next()
    }
      catch(err)
      {
          next(err)
      }
  }
  verifyOrganization = async(req:Request,res:Response,next:NextFunction) => {
    try{
      if(!req.currentUser)
        {
            throw new NotAuthorizedError(`Authorization is required`,"Verify Organization")
        }
        if(req.currentUser.userType!==UserType.Organization)
        {
            throw new NotAuthorizedError(`User is not an organization`,"Verify Organization")
        }
        next()
    }
    catch(err)
    {
        next(err)
    }

  }
}
export default new AuthMiddleware()
