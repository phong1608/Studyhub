import { CoursePreview } from "./course.interface"

export default interface Enrollment{
    id:string
    userId:string
    courseId:string
    lessonId:string
    createdAt:string
    course:CoursePreview
    rating:number
}
