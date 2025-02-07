
import { UserType } from "@prisma/client";
export interface IUser {
  id: string;
  email: string;
  password:string;
  name?: string;
  userType: UserType;
  profilePicture: string;
  bio?: string;

}


