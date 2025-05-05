import prisma from "../../prisma/prsima-client";
import { Logger } from "winston";
import { winstonLogger } from "../utils/logger";

const log:Logger = winstonLogger(process.env.ELASTIC_SEARCH_URL,'CommentService','debug')

const addComment = async({userId,lessonId,content,parentId})=>{
    try{

        const newComment = await prisma.comment.create({
            data:{
                userId: userId,
                lessonId: lessonId,
                message: content,
                parentId: parentId,
            },
            select:{
              id:true,
              message:true,
              parentId:true,
              createdAt:true,
              user:{
                select:{
                  id:true,
                  name:true
                }
              }
            }
        })

        log.info(`New comment added to course with id ${lessonId}`)
        return newComment
    }
    catch(err){
      console.log(userId)
      log.error(`addComment() method ${err.message}`);
      throw new Error(err.message)
    }
}
const getAllCommentsByLesson = async(lessonId:string)=>{
    try{
        const comments = await prisma.comment.findMany({
            where:{
                lessonId:lessonId,
                parentId:null
            },
            include:{
                user:{
                    select:{
                        id:true,
                        name:true,
                        profilePicture:true
                    }
                },
                children:{
                    select:{
                        id:true,
                        message:true,
                        user:{
                            select:{
                                id:true,
                                name:true,
                                profilePicture:true
                            }
                        },
                        lessonId:true,
                        parentId:true,
                        createdAt:true

                    }
                }
                
            }
        })
        return comments
    }
    catch(err){
        log.error(`getAllComments() method ${err.message}`);
    }
}
const getRootComments = async(commentId:string)=>{
    try{
        const comments = await prisma.comment.findMany({
            where:{
                id:commentId,
                parentId:null
            },
            select:{
                id:true,
                message:true,
                user:{
                    select:{
                        id:true,
                        name:true,
                        profilePicture:true
                    }
                },
                lessonId:true,
                parentId:true,
                children:{
                    select:{
                        id:true,
                        message:true,
                        user:{
                            select:{
                                id:true,
                                name:true,
                                profilePicture:true
                            }
                        },
                        lessonId:true,
                        parentId:true
                    }
                }
            }
        })
        return comments
    }
    catch(err){
        log.error(`getRootComments() method ${err.message}`);
    }
}

export {addComment,getRootComments,getAllCommentsByLesson}
