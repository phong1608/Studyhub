'use client'
import { useAppContext } from "@/contexts/AuthContext"
import React, { useState, useEffect } from "react"
import axios from "axios"
import { useRouter,useParams } from 'next/navigation'
import RichTextEditor from "@/components/TextEditor";
export type Category = {
  id: string,
  name: string
}

export type CourseLevel = 'Intermediate' | 'Advanced' | 'Beginner';
const NewCoursePage = () => {
    const { isAuthenticated, loading } = useAppContext()
    const router = useRouter()
    
  useEffect(() => {
    if (!loading && isAuthenticated === false) {
      router.push('/')
    }
  }, [isAuthenticated, router,loading])
  const [thumbnail, setPreviewImage] = useState<File  | null>(null)
  const [name,setName] = useState<string | null>(null)

  const [description,setContent] = useState<string | undefined>('')
  const [option,setOption] = useState<string | null>(null)
  const { sectionId,courseId } = useParams();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPreviewImage(e.target.files[0]);
    }
  }
const onChange = (content: string) => {
    setContent(content);
}
const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (isSubmitting) return; // Chặn nếu đang submit
  setIsSubmitting(true);

  try {
    const formData = new FormData();
    formData.append('name', name || '');
    formData.append('sectionId', sectionId?.toString() || '');
    formData.append('lessonType', option || '');
    
    if (option === 'Video' && thumbnail) {
      formData.append('videoUrl', thumbnail);
    } else {
      formData.append('content', description || '');
    }

    await axios.post(`http://localhost:3333/lesson/create`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true
    });
    router.push(`/instructor/course/${courseId}/section`);
  } catch (error) {
    console.error("Error submitting form", error);
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <div className="overflow-hidden flex w-full" style={{ background: '#edf2f7' }}>
      <section className="max-w-4xl p-6 mx-auto rounded-md dark:bg-gray-800 mt-20 w-full overflow-auto" >
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Thiết lập bài học</h1>
            <span className="text-sm text-slate-700">
              Hoàn thành các mục sau
            </span>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mt-16">
            <div>
                <label className="text-black dark:text-gray-200">Tên bài học </label>
                <input id="username" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" onChange={(e) =>setName(e.target.value)}/>
            </div>
            

            <div>
              <label className="text-black dark:text-gray-200" >Loại bài học</label>
              <select 
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                onChange={(e) => setOption(e.target.value)}
                defaultValue=""
              >
               <option value="" disabled>Chọn loại bài học</option>
                <option value="Video">Bài giảng video</option>
                <option value="Text">Bài giảng văn bản</option>
              </select>
            </div>
            
            
            
            {option === 'Text' && (
              <div>
              <label className="text-black dark:text-gray-200" >Mô tả khóa học</label>
              <RichTextEditor  content={description||""} onChange={onChange} />
              </div>
            )}
            {option === 'Video' && (
              <div>
              <label className="text-black dark:text-gray-200" >Ảnh khóa học</label>
              <div className="flex flex-col items-center text-sm text-gray-600 mt-4 p-4 border-2 border-dashed border-gray-300 rounded-md bg-white hover:bg-gray-50">
                <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                <span>Upload a file</span>
                <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                onChange={handleFileChange}
                accept="video/*"
                />
                </label>
              <p className="mt-2 text-black">or drag and drop</p>
              </div>
              <p className="mt-1 text-xs text-black">PNG, JPG, GIF up to 10MB</p>

              {thumbnail && (
              <div className="mt-4">
                <video
                src={thumbnail ? URL.createObjectURL(thumbnail) : ''}
                width={200} 
                height={200} 
                controls
                className="w-max h-auto rounded-md shadow-sm"
                />
              </div>
              )}
              </div>
            )}
          </div>
          <div className="flex justify-end mt-6">
            <button type="submit" className="px-6 py-2 leading-5 text-black transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">Save</button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default NewCoursePage