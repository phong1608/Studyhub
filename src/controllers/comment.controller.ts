import { addComment,getAllCommentsByLesson,getRootComments } from "../services/comment.service";

import { Request,Response,NextFunction } from "express";


class CommentController{
  addComment = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{
      const {lessonId,content,parentId} = req.body
      const userId=req.currentUser.id
      const newComment = await addComment({userId,lessonId,content,parentId})
      res.status(201).json(newComment)
    }
    catch(err){
        next(err)
    }
  }
  getAllCommentsByLesson = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{
      const comments = await getAllCommentsByLesson(req.params.lessonId)
      res.status(200).json(comments)
    }
    catch(err){
        next(err)
    }
  }
  getRootComments = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{
      const comments = await getRootComments(req.params.commentId)
      res.status(200).json(comments)
    }
    catch(err){
        next(err)
    }
  }

}

export default new CommentController()
