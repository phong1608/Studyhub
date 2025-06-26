'use client'
import { useState,useEffect, ChangeEvent, useRef } from 'react';
import Head from 'next/head';
import InputField from '@/components/InputField';
import {
    LuBookOpen,
    LuChartBar,
    LuDollarSign,
    LuUpload,
    LuSave,
    LuCircle,
    LuTag
  } from 'react-icons/lu';
import JoditEditor from 'jodit-react';
import Image from 'next/image';
import useApi from '@/hooks/useApi';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Category } from '@/components/GroupCourses';
import {toast} from 'react-toastify'
interface CourseData {
  id: string;
  name: string;
  description: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' 
  price: number;
  thumbnail: string | null;
  durationHours: number;
  lessonsCount: number;
  isPublished:boolean
}
import Link from 'next/link';



export default function UpdateCoursePage() {
    
    const { courseId } = useParams();
    const course = useApi<CourseData>(`course/${courseId}`, { method: 'GET' });
    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [name,setName] = useState<string | null|undefined>(course.data?.name)
    const [price,setPrice] = useState<string | null|undefined>(course.data?.price.toString())
    const [description,setContent] = useState<string | undefined>(course.data?.description)
    const editor = useRef(null)
    const [level,setLevel] = useState<string | null|undefined>(course.data?.level.toString())
    const [category,setcategory] = useState<string | null>(null)
    const [thumbnailPreview, setThumbnailPreview] = useState(course.data?.thumbnail);
    const { data } = useApi<Category[]>('category/get', { method: 'get' })
    
    const handleSubmit =async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSaving(true);
        setShowSuccess(false);
        const formData = new FormData();
        formData.append('name', name || '');
        formData.append('price', price ? price.toString() : '');
        formData.append('description', description || '');
        formData.append('level', level || '');
        formData.append('category', category || '');
        if (thumbnailPreview) {
        formData.append('thumbnail', thumbnailPreview);
        }
        await axios.put(`http://localhost:3333/course/update/${courseId}`, formData, {
        headers: {
        'Content-Type': 'multipart/form-data',
        },
        withCredentials: true
        });
        setIsSaving(false);
        setShowSuccess(true);
    };
    const handlePublish = async () => {
        await axios.post(`http://localhost:3333/course/publish/${courseId}`,{}, { withCredentials: true });
        toast.success("Khóa học đã được xuất bản")
        course.refetch()
    }
    const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setThumbnailPreview(reader.result as string);
        }
        reader.readAsDataURL(file);
    }
    }
    useEffect(() => {
        if (course.data) {
          setName(course.data.name);
          setPrice(course.data.price.toString());
          setContent(course.data.description);
          setLevel(course.data.level);
          setThumbnailPreview(course.data.thumbnail || null);
        }
      }, [course.data]);
    

    const iconProps = { size: 18, className: "text-gray-400 dark:text-gray-500" };

  return (



    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 md:p-10 font-sans">
        <Head>
            <title>Update Course - {course.data ? course.data.name : 'Loading...'}</title>
        </Head>
        {course.data && (
        <main className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
           <div className='p-6 md:p-8 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Cập nhật thông tin khóa học</h1>
                {!course.data.isPublished&&<button 
                    type="button"
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    onClick={handlePublish}
                >
                    <LuUpload size={18} /> Xuất bản khóa học
                </button>}
            </div>

            <form onSubmit={handleSubmit} className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                
                {/* Left Column */}
                <div className='col-span-1'>
                    <InputField id="title" label="Course Title" value={name??""} onChange={(e)=>{setName(e.target.value)}} icon={<LuBookOpen {...iconProps} />} placeholder="e.g., Introduction to Python" required />
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Danh mục<span className="text-red-500">*</span>
                    </label>
                    <div className="relative rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                    {<LuTag/>}
                    </div>
                    <select
                    onChange={(e)=>setcategory(e.target.value)}
                    className={`block w-full pl-10 pr-10 py-2.5 border ${ 'bg-white dark:bg-gray-900'} border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:text-white transition duration-150 ease-in-out appearance-none`}
                >
                    {data?.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>))
                    }
                </select>
                </div>
                    
                    
                </div>

                {/* Right Column */}
                <div className='col-span-1'>
                    <InputField id="level" label="Difficulty Level" type="select" value={course.data.level} onChange={(e)=>setLevel(e.target.value)} icon={<LuChartBar {...iconProps} />} required />

                    <InputField id="price" label="Giá (VNĐ)" type="number" value={price??""} onChange={(e)=>setPrice(e.target.value)} icon={<LuDollarSign {...iconProps} />} placeholder="e.g., 100.000" required />
                    
                     <div className='grid grid-cols-2 gap-4 mb-5'>
                        
                        
                    </div>
                </div>

                {/* Thumbnail Display */}
                <div className="col-1 md:col-span-2 mb-5">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Ảnh đại diện</label>
                    <div className='flex  items-center gap-4'>
                        {thumbnailPreview ? (
                            <Image src={thumbnailPreview} width={300} height={200} alt="Thumbnail Preview" className="w-48 h-32 object-cover rounded-lg border border-gray-300 dark:border-gray-600"/>
                        ) : (
                            <div className="w-48 h-32 bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center">
                                 <Image src={course.data.thumbnail||""} width={300} height={200} alt="Thumbnail Preview" className="w-48 h-32 object-cover rounded-lg border border-gray-300 dark:border-gray-600"/>
                            </div>
                        )}
                        <label htmlFor="thumbnailUpload" className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150">
                            <LuUpload size={18} className="mr-2 -ml-1"/>
                            Đổi ảnh đại diện
                            <input id="thumbnailUpload" name="thumbnailUpload" type="file" className="sr-only" accept="image/png, image/jpeg, image/webp" onChange={handleThumbnailChange}/>
                        </label>
                    </div>
                    <p className='text-xs text-gray-500 dark:text-gray-400 mt-2'>Recommended: 16:9 aspect ratio, JPG/PNG/WEBP, max 2MB.</p>
                </div>

                {/* Course Description */}
                <div className="col-span-1 md:col-span-2 mb-5">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Course Description</label>
                    <JoditEditor
                        ref={editor}
                        value={course.data.description}
                        onChange={(e) =>setContent(e)} 
                        
                    />
                </div>

                <div className="col-span-1 md:col-span-2 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4">
                     {showSuccess && (
                        <div className="text-sm text-green-600 dark:text-green-400 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Cập nhật khóa học thành công
                        </div>
                    )}
                    {!showSuccess && <div className='flex-1'></div>} {/* Spacer */}
                    
                    <div className='flex gap-3 w-full sm:w-auto'>
                        <Link 
                            href={`/instructor`}
                            type="button" 
                            className="flex-1 sm:flex-none justify-center py-2.5 px-5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out inline-flex items-center gap-2"
                        >
                           <LuCircle size={18}/> Hủy
                        </Link>
                        <button 
                            type="submit" 
                            disabled={isSaving}
                            className="flex-1 sm:flex-none justify-center py-2.5 px-6 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out inline-flex items-center gap-2"
                        >
                            {isSaving ? (
                                <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Đang lưu...
                                </>
                            ) : (
                                <><LuSave size={18}/> Lưu thay đổi</>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </main>)}
       
    </div>
  );
}
