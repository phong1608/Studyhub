import prisma from "prisma/prsima-client";
import { winstonLogger } from "../utils/logger";
import { Logger } from "winston";


const log:Logger = winstonLogger(process.env.ELASTIC_SEARCH_URL,'DiscountService','debug')


const addUser = (organizationId:string,userId:string)=>{
    try{
        prisma.userOrganization.create({
            data:{
                organizationId:organizationId,
                userId:userId

            }
        })
        log.info(`User with id ${userId} has been added to organization with id ${organizationId}`)
    }
    catch(err){
        log.error(`addUser() method ${err.message}`);
    }

}

const addOrganizationCourse = async(courseId:string,organizationId:string)=>{
  const organizationCourse = await prisma.organizationCourse.create({
    data:{
      courseId:courseId,
      organizationId:organizationId
    }
  })
  return organizationCourse
}
export {addUser,addOrganizationCourse}
