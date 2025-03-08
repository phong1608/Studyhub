import { CourseLevel,Category } from "@prisma/client"

export interface ICourseCreate{
  name:string,
  description:string,
  thumbnail:Buffer,
  level:CourseLevel,
  price:number,
  category:string
}


export interface ICourseContext{
  name:string;
  description:string;
  thumbnail:string;
  level:CourseLevel;
  price:number;
  categories:Category[];
  instructor:string,
  createdAt:Date;
  updatedAt:Date;

}
