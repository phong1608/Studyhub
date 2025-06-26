'use client'
import Image from "next/image";
import useApi from "@/hooks/useApi";
import Enrollment from "@/interfaces/models/enrollment.interface";
import axios from "axios";
import { useCourseContext } from "@/contexts/CourseContext";
import { useRouter } from "next/navigation";
import { ILesson } from "@/interfaces/models/course.interface";
import Rating from "@/components/Rating";
import { useState } from "react";

const Page = () => {
  const { data } = useApi<Enrollment[]>('enrollment/user/get', { method: 'GET', withCredentials: true });
  const { setSelectedCourse } = useCourseContext();
  const router = useRouter();
  const [showRating, setShowRating] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const handleLearnCourse = async (enrollment: Enrollment) => {
    setSelectedCourse(enrollment.course);
    const response = await axios.get<ILesson>(`http://localhost:3333/lesson/course/${enrollment.course.id}`, { withCredentials: true });
    if (!enrollment.lessonId) {
      router.push(`/learn/${enrollment.course.id}/lesson/${response.data.id}`);
    }
  };

  const handleShowRating = (courseId: string) => {
    setSelectedCourseId(courseId);
    setShowRating(true);
  };

  const handleCloseRating = () => {
    setShowRating(false);
    setSelectedCourseId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <header className="text-center space-y-6 mb-12 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
        Khóa học của bạn
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
        Khám phá các khóa học chất lượng cao được thiết kế bởi chuyên gia
        </p>
      </header>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 sm:p-8">
        <div className="mb-8 relative max-w-xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          </div>
          <input
          type="text"
          placeholder="Tìm kiếm khóa học..."
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {data?.map((item) => (
    <div key={item.course.id} className="group bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col">
      <div className="p-6 flex flex-col h-full">
        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={item.course.thumbnail}
            alt="Course thumbnail"
            width={200}
            height={200}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-4">{item.course.name}</h3>

        {/* Đẩy phần này xuống dưới cùng */}
        <div className="flex items-center justify-between mt-auto pt-4">
          

          {!item.rating  ? (
            <>
            <button
              onClick={() => handleShowRating(item.course.id)}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
              Đánh giá
            </button>
            <button
              onClick={() => handleLearnCourse(item)}
              className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              Học ngay 
            </button>
              </>
            
          ) : (
            <>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-sm">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {item.rating}
          </span>
            <button
              onClick={() => handleLearnCourse(item)}
              className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              Học ngay 
            </button>
            </>
          )}
        </div>
      </div>
    </div>
  ))}
</div>

        </div>
      </div>
      </div>

      {showRating && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button
          onClick={handleCloseRating}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        {selectedCourseId && <Rating  courseId={selectedCourseId} />}
       
        </div>
      </div>
      )}
    </div>
  );
};

export default Page;