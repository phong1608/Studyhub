import { UserType } from "@prisma/client";
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      currentUser?: IAuthPayload;
    }
  }
}

export interface IAuthPayload {
  id: string;
  username: string;
  userType:UserType;
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
