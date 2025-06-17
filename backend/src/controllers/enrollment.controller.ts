import {getUserEnrollment} from '../services/enrollment.service';
import { Request,Response,NextFunction } from "express";



class EnrollmentController{
    getUserEnrollment = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
        try{
            const userEnrollment = await getUserEnrollment(req.currentUser.id)
            res.status(200).json(userEnrollment)
            return; 
        }
        catch(err){
            next(err)
            
        }
    }
}

export default new EnrollmentController()