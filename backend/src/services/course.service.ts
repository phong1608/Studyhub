import { winstonLogger } from '../utils/logger';
import { Logger } from 'winston';
import { ICourseCreate} from "../interfaces/models/course.interface"
import prisma from "../../prisma/prsima-client"
import { BadRequestError } from '../interfaces/error.interface';
import {uploadFile} from '../utils/S3Upload'
import {fromBuffer} from 'file-type'
import { CourseLevel } from '@prisma/client';
import { getAverageRating } from './rating.service';
import {getDicountByCourseId} from './discount.service'
import { DiscountType } from '@prisma/client';
import { removeUndefinedObject } from '../utils/index';
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
        price:parseFloat(price),
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
        instructor:{
          select:{
            user:{
              select:{
                id:true,
                name:true,
                profilePicture:true
              }
            }
          }
        },
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
    const rating = await getAverageRating(courseId)
    return {...course,rating:rating};
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
      category: true,
      isPublished:true
    }
  });
  const courseContext = await Promise.all(
    courses.map(async (course) => {
      const rating = await getAverageRating(course.id);
      const discount = await getDicountByCourseId(course.id)
      let dicount_price = null
      if(discount && discount.type === DiscountType.Percentage){
        dicount_price = course.price - (course.price * discount.amount) / 100
      }
      else if(discount && discount.type === DiscountType.Fixed){
        dicount_price = course.price - discount.amount
      }

      return { ...course, rating,dicount_price };
    })
  );
  return courseContext;
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
      price:parseFloat(price),
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

type CourseFilter = {
  price?: number;
  totalRating?: string;
  level?: string;
}
const getCourseByCategoryId = async(categoryId: string, page: number = 1, limit: number = 9, { totalRating, level}: CourseFilter) => {
  const offset = (page - 1) * limit;
 
  const courses = await prisma.category.findFirst({
    where: {
      id: categoryId,
    },
    select: {
      name: true,
      Course: {
        where: {
          ...(totalRating && { totalRating: { gte: parseInt(totalRating) } }),
          ...(level && { level: level as CourseLevel }),
        },
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
          isPublished: true,
          _count: {
            select: {
              Rating: true,
            },
          },
        },
      },
    },
  });
  
  return courses;
}
const getSearchCourse = async (search: string, page: number = 1, limit: number = 10, { totalRating, level }: CourseFilter) => {
  try {
    const offset = (page - 1) * limit;

    const courses = await prisma.course.findMany({
      where: {
        OR: [
          {
            name: {
              contains: search,
            },
          },
          {
            description: {
              contains: search,
            },
          },
        ],
        ...(totalRating && { totalRating: { gte: parseInt(totalRating) } }),
        ...(level && { level: level as CourseLevel }),
      },
      skip: offset,
      take: limit,
    });

    return courses;
  } catch (err) {
    log.error(`getSearchCourse() method ${err.message}`);
    throw new Error(err.message);
  }
};
const getInstructorCourse = async (userId: string) => {
  const instructor = await prisma.instructor.findFirst({
    where: {
      userId: userId,
    },
  });

  if (!instructor) {
    throw new BadRequestError("Instructor not found", "Get Instructor Course");
  }

  const courses = await prisma.course.findMany({
    where: {
      instructorId: instructor.id,
    },
    select: {
      id: true,
      name: true,
      price: true,
      thumbnail: true,
      level: true,
      instructorId: true,
      isPublished: true,
      createdAt: true,
      _count: {
        select: {
          enrollments: true,
        },
      },
    },
  });

  return courses.map(course => ({
    ...course,
    enrollment: course._count.enrollments, 
    _count: undefined
  }));
};

const getCourseByInstructorId = async(userId:string)=>{
  if(!userId){
    throw new Error('InstructorId is required')
  }
  const instructor = await prisma.instructor.findFirst({
    where:{
      userId:userId
    }
  })
  const courses = await prisma.course.findMany({
    where:{
      instructorId:instructor.id
    },
    select:{
      id:true,
      name:true,
      thumbnail:true,
      price:true,
      isPublished:true,
      instructorId:true,
      category:{
        select:{
          name:true,
          id:true
        }
      },
      _count:{
        select: {
          enrollments: true, 
        }
      }
    }
  })
  return courses
}
const getCourseWithRating = async(courseId:string)=>{
  const course = await prisma.course.findFirst({
    where: {
      id: courseId
    },
    select: {
      name: true,
      price: true,
      CategoryId: true,
      _count: {
        select: { Rating: true }
      },
      Rating: {
        select: {
          rating: true 
        }
      }
    }
  });

  if (course && course.Rating.length > 0) {
    const totalRating = course.Rating.reduce((sum, rating) => sum + rating.rating, 0);
    const averageRating = totalRating / course.Rating.length;
    return { ...course, averageRating };
  }

  return { ...course, averageRating: null };
}
const updateCourseByCourseId = async(courseId:string,{name,description,price,level,category}:ICourseCreate)=>{
  try{
    const updateBody = removeUndefinedObject({name,description,price:parseFloat(price),level,CategoryId:category})
    const updatedCourse = await prisma.course.update({
      where:{
        id:courseId
      },
      data:{
        ...updateBody
      }
    })
    return updatedCourse
  }
  catch(err)
  {
    log.error(`updateCourseByCourseId() method ${err.message}`)
    throw new Error(err.message)
  }
}
const getTopCourse = async()=>{
  const topCourses = await prisma.course.findMany({
    take: 4,
    orderBy: {
      enrollments: {
        _count: 'desc',
      },
    },
    include: {
      _count: {
        select: { enrollments: true },
      },
    },
  });
return topCourses  
}


export { addCourse, getCourse, updateCourse, publishCourse, getCourseByCategoryId,getSearchCourse,getAllCourse,getCourseByInstructorId,getCourseWithRating,getInstructorCourse,updateCourseByCourseId,getTopCourse}
