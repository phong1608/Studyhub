import prisma from '../../prisma/prsima-client'
import { winstonLogger } from '../utils/logger'
import { Logger } from 'winston'
import { LessonType } from '@prisma/client'
import {  ILessonText, ILessonVideo } from '../interfaces/models/lesson.interface'
import { removeUndefinedObject } from '../utils/index'
import { ServerError } from '@elearn/interfaces/error.interface'
const log:Logger = winstonLogger(process.env.ELASTIC_SEARCH_URL,'LessonService','debug')

class LessonFactory{
  static async createLesson(type:string,payload:ILessonText|ILessonVideo){
    switch(type){
      case LessonType.Video:
        return new LessonVideo(payload).createLesson()
      case LessonType.Text:
        return new LessonText(payload).createLesson()
    }
  }
  static async getLessonById(id:string)
  {
    try{
        const lesson = await prisma.lesson.findUnique({
            where:{
                id:id
            },
            include:{
                lessonText:true,
                lessonVideo:true
            }
        })
        return lesson
    }
    catch(err){
        console.log(err)
    }
  }
  static async updateLesson(type:string,lessonId:string,payload:ILessonText|ILessonVideo)
  {
    switch(type){
      case LessonType.Video:
        return new LessonVideo(payload).updateLesson(lessonId)
      case LessonType.Text:
        return new LessonText(payload).updateLesson(lessonId)
    }
  }
  static async deleteLesson(id:string)
  {
    try{
        const lesson = await prisma.lesson.delete({
            where:{
                id:id
            }
        })
        return lesson
    }
    catch(err){
        console.log(err)
    }
  }

}

class Lesson{
  public lesson:ILessonText|ILessonVideo
  constructor(lesson:ILessonText|ILessonVideo){
    this.lesson=lesson

  }
  async createLesson()
  {
    try{
        const newLesson=await prisma.lesson.create({
            data:{
                name:this.lesson.name,
                sectionId:this.lesson.sectionId,
                position:this.lesson.position,
                lessonType:this.lesson.lessonType,
                attachment:this.lesson.attachment
            }
        })
        log.info('New lesson has been add')
        return newLesson
    }
    catch(err){
        console.log(err)
    }
  }
  async updateLesson(lessonId:string)
  {
    try{
      const updatedLesson:ILessonText|ILessonVideo = removeUndefinedObject(this)
      const lesson=await prisma.lesson.update({
        where:{
          id:lessonId
        },
        data:{
          name:updatedLesson.name,
          position:updatedLesson.position,
          attachment:updatedLesson.attachment,

        }
      })
      return lesson
    }
    catch(err)
    {
      throw new ServerError('Internal Server Error',err.message)
    }
  }



}
class LessonVideo extends Lesson{
  async createLesson(){
    const newLesson = await super.createLesson()
    await prisma.lessonVideo.create({
      data:{
        videoUrl:(this.lesson as ILessonVideo).videoUrl,
        lessonId:newLesson.id
      }
    })
    return newLesson
  }
  async updateLesson(lessonId:string)
  {
    try{
      const updatedLesson:ILessonText|ILessonVideo = removeUndefinedObject(this)

      await prisma.lessonVideo.update({
        where:{
          lessonId:lessonId
        },
        data:{
          videoUrl:(updatedLesson as ILessonVideo).videoUrl
        }
      })
      const lesson = await super.updateLesson(lessonId)
      return lesson
    }
    catch(err)
    {
      throw new ServerError('Internal Server Error',err.message)
    }
  }
}

class LessonText extends Lesson
{
  async createLesson(){
    const newLesson = await super.createLesson()
    await prisma.lessonText.create({
      data:{
        content:(this.lesson as ILessonText).content,
        lessonId:newLesson.id
      }
    })
    return newLesson
  }
  async updateLesson(lessonId:string)
  {
    try{
      const updatedLesson:ILessonText|ILessonVideo = removeUndefinedObject(this)

      await prisma.lessonText.update({
        where:{
          lessonId:lessonId
        },
        data:{
          content:(updatedLesson as ILessonText).content
        }
      })
      const lesson = await super.updateLesson(lessonId)
      return lesson
    }
    catch(err)
    {
      throw new ServerError('Internal Server Error',err.message)
    }
  }
}

export {LessonFactory}
