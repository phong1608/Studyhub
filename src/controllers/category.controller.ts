import { getAllCategory } from "../services/category.service";

import { Request,Response,NextFunction } from "express";



class CategoryController{
  getAllCategory = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{
      const categories = await getAllCategory()
      res.status(200).json(categories)
    }
    catch(err){
        next(err)
    }
  }
}

export default new CategoryController()
