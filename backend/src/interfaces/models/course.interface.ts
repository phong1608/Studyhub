import { CourseLevel } from "@prisma/client"

export interface ICourseCreate{
  name:string,
  description:string,
  thumbnail:Buffer,
  level:CourseLevel,
  price:string,
  category:string
}


export interface ICourseContext{
  id:string;
  name:string;
  thumbnail:string;
  level:CourseLevel;
  price:number;
  discount_price:number;
  instructor:string,
  createdAt:Date;
  rating:number;
}
