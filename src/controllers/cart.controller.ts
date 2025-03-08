import {addToCart,getUserCart} from '../services/cart.service'
import {addEnrollemntFromCart} from '../services/enrollment.service'
import { Request,Response,NextFunction } from "express";
import { StatusCodes } from "http-status-codes";


class CartController{
    addToCart = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
        try{
            await addToCart(req.currentUser.id,req.params.courseId)
             res.status(StatusCodes.CREATED).json({message:"Course added to cart"})
            ; // Prevent further code execution
        }
        catch(err){
            next(err)
        }
    }
    getUserCart = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
        try{
            const userCart = await getUserCart(req.currentUser.id)
            res.status(StatusCodes.ACCEPTED).json(userCart)
            return; // Prevent further code execution
        }
        catch(err){
            next(err)
        }
    }
    cartCheckout = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
        try{
            await addEnrollemntFromCart(req.currentUser.id)
            res.status(StatusCodes.CREATED).json({message:"Cart checkout successful"})
            return;
        }
        catch(err){
            next(err)
            
        }
    }
}
export default new CartController()