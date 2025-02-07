import { CourseLevel,Category } from "@prisma/client"

export interface ICourseCreate{
  title:string,
  description:string,
  thumbnail:string,
  level:CourseLevel,
  price:number,
  categoryId:string,
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
