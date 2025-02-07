import prisma from '../../prisma/prsima-client'
import {BadRequestError,ServerError} from '../interfaces/error.interface'
import bcrypt from 'bcrypt'
import { createAuthToken } from '../utils/authUtils'
import { ISignup } from '../interfaces/auth.interface'
import { winstonLogger } from '../utils/logger'
import { Logger } from 'winston'
const log:Logger = winstonLogger(process.env.ELASTIC_SEARCH_URL,'AuthService','debug')


const signIn = async ({email,password})=>{
  try{
    const user = await prisma.user.findUnique({where:{email:email}})
    if(!user){
      throw new BadRequestError('Invalid Credentials','Sign In')
    }
    const match =await bcrypt.compare(password,user.password)
    if(!match)
    {
      throw new BadRequestError('Invalid Credentials','Sign In')
    }
    const userId = user.id
    const token = await createAuthToken({id:userId,username:user.name})
    return {
       userId:userId,
       token:token
      }
  }
  catch(err){
    log.error('Error','signIn() method',err.message)
    throw new ServerError('Internal Server Error ' + err,'Sign In')
  }
}
const signUp = async (user: ISignup) =>{
  try{
    if(await prisma.user.findUnique({where:{email:user.email}})){
      throw new BadRequestError(`User with email ${user.email} already exists`,'Create User')
    }
    const passwordHash = await bcrypt.hash(user.password,10)
    const newUser = await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: passwordHash
      }
    })
    log.info(`User with email ${newUser.email} has been added`)
    return {
      newUser:newUser,
      token: await createAuthToken({username:newUser.name,id:newUser.id})
    }
  }
  catch(err){
    log.error('error','addUser() method',err.message)
    console.log(err)
  }

}



export {signIn,signUp}
