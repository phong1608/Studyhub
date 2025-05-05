import { IInstructor } from '../interfaces/models/instructor.interface';
import prisma from '../../prisma/prsima-client'
import { Logger } from 'winston'
import { winstonLogger } from '../utils/logger'
import { BadRequestError } from '../interfaces/error.interface'
import { Instructor } from '@prisma/client';
import { UserType } from '@prisma/client';
import { IUserCredentials } from '../interfaces/models/user.interface';
import { fromBuffer } from 'file-type';
import { uploadFile } from '../utils/S3Upload';
import { removeUndefinedObject } from '../utils';
const log:Logger = winstonLogger(process.env.ELASTIC_SEARCH_URL,'UserService','debug')
const addInstructor = async({userId}:IInstructor)=>{
  try{
    const user = prisma.user.findFirst({where:{id:userId}})
    if(!user){
      throw new BadRequestError(`User with userId ${userId} does not exist`,'Create Instructor')
    }
    if(await prisma.instructor.findFirst({where:{userId:userId}})){
      throw new BadRequestError(`Instructor with userId ${userId} already exists`,'Create Instructor')
    }
    const newInstructor = await prisma.instructor.create({
      data: {
        userId: userId
      }
    })
    await prisma.user.update({where:{id:userId},data:{userType:UserType.Instructor}})
    log.info(`Instructor with userId ${newInstructor.userId} has been added`)
    return newInstructor
  }
  catch(err){
    log.error('error','addInstructor() method',err.message)
    console.log(err)
  }

}
const getUserCredentials = async(userId:string)=>{
  return await prisma.user.findFirst({where:{id:userId}})
}
const getInstructorProfile = async(userId:string):Promise<Instructor|undefined>=>{
  try{
    const instructor = await prisma.instructor.findFirst({
      where: { userId: userId },
      include: {
      user: {
        select: {
        id: true,
        name: true,
        email: true,
        }
      }
      }
    })
    return instructor
  }
  catch(err){
    log.error('error','getInstructorProfile() method',err.message)
    console.log(err)
  }
}

const updateUserProfile = async(userId: string, { name, bio, profilePicture }: IUserCredentials) => {
  try {
    const user = await prisma.user.findFirst({ where: { id: userId } });
    if (!user) {
      throw new BadRequestError(`User with userId ${userId} does not exist`, 'Update User Profile');
    }

    const updatedObject = removeUndefinedObject({ name: name, bio: bio });
    let profilePictureUrl = null;

    if (profilePicture) {
      const file = (await fromBuffer(profilePicture)).ext;
      profilePictureUrl = await uploadFile(profilePicture, 'UserProfile/' + userId + '.' + file);
      updatedObject.profilePicture = profilePictureUrl;
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updatedObject,
    });
    return updatedUser;
  } catch (err) {
    log.error('error', 'updateUserProfile() method', err.message);
  }
};
export {addInstructor,getInstructorProfile,getUserCredentials,updateUserProfile}

