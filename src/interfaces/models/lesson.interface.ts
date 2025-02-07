import { LessonType } from "@prisma/client";

export interface ILesson{
  id:string;
  name:string;
  lessonType:LessonType;
  position:number;
  sectionId:string;
  attachment?: string;

}
export interface ILessonVideo extends ILesson{
  videoUrl:string
}
export interface ILessonText extends ILesson{
  content:string
}
