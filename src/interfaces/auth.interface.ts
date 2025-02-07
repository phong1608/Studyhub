
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      currentUser?: IAuthPayload;
    }
  }
}
import { UserType } from "@prisma/client";

export interface IAuthPayload {
  id: string;
  username: string;
}

export interface ISignin{
  email:string;
  password:string;
}
export interface ISignup{
    email: string;
    password:string;
    name?: string;
    userType: UserType;
    bio?:string;
    profilePicture?: string;
}
