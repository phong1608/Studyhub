interface Course{
    id:string
    name:string
    description:string
    Section:ISection[]
    thumbnail:string
    price:number,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    instructor:any
}
interface CoursePreview{
    id:string,
    name:string,
    price:number,
    thumbnail:string
}
interface ISection{
    id:string
    name:string
    position:number
    lessons:Lesson[]
}
interface Lesson{
    id:string
    name:string
    lessonType:string
    position:number
}
interface ILesson{
    id:string
    name:string
    sectionId:string
    position:number
    lessonType:string
    attachment:string
    videoUrl:string
    lessonVideo:ILessonVideo
    lessonText:ILessonText
}
 interface ILessonVideo {
    videoUrl: string,
    summarize:string
  }
 interface ILessonText {
    content:string
  }
  
export type {Course, ISection, Lesson,CoursePreview,ILesson}