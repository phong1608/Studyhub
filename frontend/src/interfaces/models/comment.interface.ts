
import { IUser } from "../auth.interface"
interface RootComment{
    id:string
    user:IUser
    courseId:string
    message:string
    children:NestComment[]
    createdAt:Date
}
interface NestComment{
    id:string,
    message:string,
    createdAt:Date,
    user:IUser
}

export type {RootComment}