import { IAuthPayload } from '../interfaces/auth.interface';
import { NextFunction,Request,Response } from "express";
import jwt from "jsonwebtoken"
import {NotAuthorizedError,ServerError} from "../interfaces/error.interface"

const verifyUser = async (req:Request, res:Response,next:NextFunction):Promise<void> => {
  try{

    const tokens = req.headers.authorization
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
export {verifyUser}
