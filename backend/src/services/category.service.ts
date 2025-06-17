import prisma from "../../prisma/prsima-client";



const getAllCategory = async () =>{
    return await prisma.category.findMany()
}


export {getAllCategory}
