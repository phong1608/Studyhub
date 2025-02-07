import { winstonLogger } from '../utils/logger';
import { Logger } from 'winston';
import {ICourseCreate} from "../interfaces/models/course.interface"
import prisma from "../../prisma/prsima-client"
import { BadRequestError } from '../interfaces/error.interface';


const log:Logger = winstonLogger(process.env.ELASTIC_SEARCH_URL,'CourseService','debug')

const addCourse = async(instructorId:string,{title,description,thumbnail,price,categoryId,level}:ICourseCreate)=>{
  try{
    const instructor = await prisma.instructor.findFirst({where:{userId:instructorId}})
    if(!instructor){
      throw new Error(`Instructor with userId ${instructorId} does not exist`)
    }
    console.log(instructorId)
    const newCourse = await prisma.course.create({
      data:{
        name:title,
        description:description,
        thumbnail:thumbnail,
        price:price,
        level:level,
        categoryId:categoryId,
        instructorId:instructor.id
      }
    })
    if(!newCourse)
    {
      throw new BadRequestError('Course could not be added','Add Course')
    }
    log.info(`Course with title ${newCourse.name} has been added`)
    return newCourse
  }
  catch(err)
  {
    log.error(`addCourse() method ${err.message}`)
  }
}
const getCourse = async(courseId:string)=>{
  try{
    const course = await prisma.course.findFirst({
      where: { id: courseId },
      select: {
          id: true,
          name: true,
          description: true,
          price: true,
          thumbnail: true,
          level: true,
          categoryId: true,
          instructorId: true,
          Section: {
            select: {
            id: true,
            name: true,
            position: true,
            lessons: {
              select: {
              id: true,
              name: true,
              position: true,
              lessonType: true,

              }
            }
        }
      }
      }
    })
    return course
  }
  catch(err){
    log.error('getCourse() method' +err.message)
  }
}
const updateCourse = async(courseId:string,{title,description,thumbnail,price,categoryId,level}:ICourseCreate)=>{
  const updatedCourse = await prisma.course.update({
    where:{
      id:courseId
    },
    data:{
      name:title,
      description:description,
      thumbnail:thumbnail,
      price:price,
      level:level,
      categoryId:categoryId
    }
  })
  return updatedCourse
}
const publishCourse = async(courseId:string)=>{
  await prisma.course.update({
    where:{
      id:courseId
    },
    data:{
      isPublished:true
    }
  })
}

export {addCourse,getCourse,updateCourse,publishCourse}
