'use client'
import React, {  useState } from 'react';
import useApi from '@/hooks/useApi';
import axios from 'axios';
import {  useParams,useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppContext } from '@/contexts/AuthContext';
import htmlParser from 'html-react-parser';
import { FaVideo } from 'react-icons/fa';
import { IoDocumentTextOutline } from 'react-icons/io5';
interface CourseProps{
    id: string,
    name: string,
    price: number,
    description: string,
    level: string,
    category: string,
    thumbnail: string,
    isPublished: boolean,
    Section: Section[]
}
interface Section{
    id: string,
    name: string,
    position: string,
    lessons: LessonProps[]
}
interface LessonProps{
    id: string,
    name: string,
    position: string,
    lessonType: string
}
const AddSectionPage: React.FC = () => {
    const router = useRouter();
    const { isAuthenticated, loading } = useAppContext();
    if(!loading && isAuthenticated === false){
        router.push('/');
    }
    const [name, setSectionname] = useState('');
    const { courseId } = useParams();
    const handleSubmit = async(e: React.FormEvent) => {
        await axios.post(`http://localhost:3333/section/create`, {name,courseId},{withCredentials: true});
        
        e.preventDefault();
        
    };
    const {data: course} = useApi<CourseProps>(`course/${courseId}`,{method: 'GET'});
    const sections = course?.Section;
    const [showForm, setShowForm] = useState(false);
    const handlePublish = async () => {
            await axios.post(`http://localhost:3333/course/publish/${courseId}`,{}, { withCredentials: true });
       
    }
    return (
        <div className="p-4 sm:ml-64">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            <h2 className="text-center text-2xl font-bold mb-6">{course?.name}</h2>
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Mô tả</h3>
                <div>{htmlParser(course?.description || '')}</div>
            </div>
            {/* List of sections will be displayed here */}
            {!course?.isPublished && (
                <button
                    onClick={handlePublish}
                    className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                >
                    Publish Course
                </button>
            )}
            <ul>
                {sections && sections.length > 0 ? (
                    sections.map((section,index) => (
                        <li key={index} className="mb-4">
                            <details className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                                <summary className="text-xl font-semibold mb-2 cursor-pointer">{index+1}.{section.name}</summary>
                                <ul className="mt-4">
                                    {section.lessons.length > 0 ? (
                                        section.lessons.map((lesson,idx) => (
                                        <li
                                        key={idx}
                                        className="mb-2 cursor-pointer text-blue-500 hover:underline flex items-center"
                                        >
                                            <Link href={`/instructor/course/lesson/${lesson.id}`} className="flex items-center">
                                                {lesson.lessonType === "Video" ? (
                                                    <FaVideo className="mr-5 text-blue-500" />
                                                ) : (
                                                    <IoDocumentTextOutline className="mr-5 text-green-500" />
                                                )}
                                                {idx+1}.{lesson.name}
                                            </Link>
                                        </li>
                                        ))
                                    ) : (
                                        <h2>No lessons available</h2>
                                    )}
                                </ul>
                                <Link href={`/instructor/course/${courseId}/section/${section.id}/lesson`}>
                                    <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
                                        Thêm bài học
                                    </button>
                                </Link>
                            </details>
                        </li>
                    ))
                ) : (
                    <h1>No sections available</h1>
                )}
            </ul>
            <button
                onClick={() => setShowForm(true)}
                className=" bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4"
            >
                Thêm chương mới
            </button>
            </div>
            {showForm && (
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">    
                <h2 className="text-2xl font-bold mb-6">Thêm chương mới</h2>
                <form onSubmit={handleSubmit}>
                
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                    Section name
                    </label>
                    <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setSectionname(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    />
                </div>
                
                <button
                    type="submit"
                    className=" bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Thêm chương
                </button>
                <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="ml-2 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                    Hủy 
                </button>
                </form>
            </div>
            )}
        </div>
    );
};

export default AddSectionPage