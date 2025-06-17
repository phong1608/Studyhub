
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight,FaCloudUploadAlt  } from 'react-icons/fa';
import { GoTag } from 'react-icons/go';
export interface Course {
  id: string;
  name: string;
  category: Category;
  thumbnail:string
  isPublished:boolean
  price:number
}
export interface Category{
  id:string,
  name:string
}



const CardCoure: React.FC<{ course: Course }> = ({ course }) => {
  
  return (
    <>
      
        <div
          className={`rounded-lg px-5 py-[18px] border flex flex-col justify-center items-center w-full gap-[50px]
          transition-all duration-300 transform active:scale-95 active:bg-[rgb(217,217,217)] hover:shadow-xl`}
          
        >
          <div className="flex justify-center items-center gap-[18px] w-full">
            <div className="w-[150px] h-[150px] flex-shrink-0">
              <Image
                src={course.thumbnail}
                alt="icon-coure"
                width={150}
                height={150}
                className="rounded-t-lg "
              />
            </div>      
            <div className="flex flex-col text-left gap-[10px]">
              <p className="font-semibold text-lg">{course.name}</p>
              <div className="flex gap-[20px] ">
                <div className="flex gap-[5px] justify-center items-center">
                  <FaCloudUploadAlt className="text-2xl text-[rgb(102,102,255)]" />
                  <p className="text-[rgb(95,106,118)] text-base">{course.isPublished?'Đã xuất bản':'Chưa xuất bản'}</p>
                </div>
                <div className="flex gap-[5px] justify-center items-center">
                  <GoTag className="text-2xl text-[rgb(102,102,255)]" />
                  <p className="text-[rgb(95,106,118)] text-base">{course.category.name}</p>
                </div>
                
              </div>
            </div>
          </div>

          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out 
              max-h-[500px] opacity-100 p-5`}
          >
            <div className="flex flex-col gap-4 text-left">
              <Link
                href={`/instructor/course/${course.id}/section`}
                className="flex gap-1 items-center justify-center hover:brightness-90 transition-all duration-300 w-40 py-[10px] px-[10px] rounded-[20px] bg-[rgb(87,85,254)]"
              >
                <div className="text-white">Chi tiết</div>
                <FaArrowRight className="text-white" />
              </Link>
              
            </div>
          </div>      
          </div>
      
    </>
  );
};



export default CardCoure;
