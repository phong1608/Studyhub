import { winstonLogger } from '../utils/logger';
import { Logger } from 'winston';
import {ICourseCreate} from "../interfaces/models/course.interface"
import prisma from "../../prisma/prsima-client"
import { BadRequestError } from '../interfaces/error.interface';
import {uploadFile} from '../utils/S3Upload'
import {fromBuffer} from 'file-type'

const log:Logger = winstonLogger(process.env.ELASTIC_SEARCH_URL,'CourseService','debug')

const addCourse = async(instructorId:string,{name,description,thumbnail,price,category,level}:ICourseCreate)=>{
  try{
    const instructor = await prisma.instructor.findFirst({where:{userId:instructorId}})
    if(!instructor){
      throw new Error(`Instructor with userId ${instructorId} does not exist`)
    }
    const file = (await fromBuffer(thumbnail)).ext
    const thumbnailUrl = await uploadFile(thumbnail,'CourseThumbnail/' + name + '.' + file)
    const newCourse = await prisma.course.create({
      data:{
        name:name,
        description:description,
        thumbnail:thumbnailUrl,
        CategoryId:category,
        price:price,
        level:level,
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
const getCourse = async(courseId:string) => {
  try {
    const course = await prisma.course.findFirst({
      where: { id: courseId },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        thumbnail: true,
        level: true,
        instructorId: true,
        category: true,
        isPublished: true,
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
              },
              orderBy: {
                position: 'asc'
              }
            }
          },
          orderBy: {
            position: 'asc'
          }
        }
      }
    });
    return course;
  } catch (err) {
    log.error('getCourse() method ' + err.message);
  }
}

const getAllCourse = async (page: number = 1, limit: number = 10) => {
  const offset = (page - 1) * limit;
  const courses = await prisma.course.findMany({
    skip: offset,
    take: limit,
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      thumbnail: true,
      level: true,
      instructorId: true,
      category: true
    }
  });
  return courses;
}
const updateCourse = async(courseId:string,{name,description,thumbnail,price,level}:ICourseCreate)=>{
  const file = (await fromBuffer(thumbnail)).ext
  const thumbnailUrl = await uploadFile(thumbnail, 'CourseThumbnail/' + name + '.' + file)
  const updatedCourse = await prisma.course.update({
    where:{
      id:courseId
    },
    data:{
      name:name,
      description:description,
      thumbnail:thumbnailUrl,
      price:price,
      level:level,
    }
  })

  return updatedCourse
}
const publishCourse = async(courseId:string)=>{
  return await prisma.course.update({
    where:{
      id:courseId
    },
    data:{
      isPublished:true
    }
  })
}
const getCourseBySearch =async(searchTerm:string)=>{
  const courses = await prisma.course.findMany({
    where:{
      OR:[
        {
          name:{
            contains:searchTerm
          }
        },
        {
          description:{
            contains:searchTerm
          }
        }
      ]
    }
  })
  return courses
}
const getCourseByCategoryId = async(categoryId: string, page: number = 1, limit: number = 10) => {
  const offset = (page - 1) * limit;
  const courses = await prisma.course.findMany({
    where: {
    },
    skip: offset,
    take: limit
  });
  return courses;
}
const getSearchCourse=(search:string)=>{
  const courses = prisma.course.findMany({
    where:{
      OR:[
        {
          name:{
            contains:search
          }
        },
        {
          description:{
            contains:search
          }
        }
      ]
    }
  })
  return courses
}
const getOrganizationCourse = async (organizationId:string)=>{
  const courses = await prisma.organizationCourse.findMany({
    where:{
      organizationId:organizationId
    },
    include:{
      course:{
        select:{
          name:true,
          thumbnail:true,
          id:true
        }
      }
    }
  })
  return courses

}
const getCourseByInstructorId = async(instructorId:string)=>{
  const courses = await prisma.course.findMany({
    where:{
      instructorId:instructorId
    },
    select:{
      id:true,
      name:true,
      thumbnail:true,
      isPublished:true,
      category:{
        select:{
          name:true,
          id:true
        }
      }
    }
  })
  return courses
}

export { addCourse, getCourse, updateCourse, publishCourse, getCourseByCategoryId,getSearchCourse,getOrganizationCourse,getAllCourse,getCourseBySearch,getCourseByInstructorId}
