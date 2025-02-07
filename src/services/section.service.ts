import prisma from "../../prisma/prsima-client";
import { winstonLogger } from "../utils/logger";
import { Logger } from "winston";


const log:Logger = winstonLogger(process.env.ELASTIC_SEARCH_URL,'SectionService','debug')
const addSection = async({courseId,name,position})=>{
    try{
        const newSection = await prisma.section.create({
            data:{
                name:name,
                courseId:courseId,
                position:position
            }
        })
        log.info('')
        return newSection
    }
    catch(err){
        console.log(err)
    }
}
const updateSection = async(sectionId:string,{name,position})=>{
    try{
        const updatedSection = await prisma.section.update({
            where:{
                id:sectionId
            },
            data:{
                name:name,
                position:position
            }
        })
        return updatedSection
    }
    catch(err){
        console.log(err)
    }
}
const deleteLesson = async(sectionId:string)=>{
    try{
        const deletedSection = await prisma.section.delete({
            where:{
                id:sectionId
            }
        })
        return deletedSection
    }
    catch(err){
        console.log(err)
    }
}

export {addSection,updateSection,deleteLesson}
