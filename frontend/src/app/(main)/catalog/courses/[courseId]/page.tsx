'use client'
import Image from 'next/image';
import useApi from '@/hooks/useApi';
import { useParams } from 'next/navigation'
import { Course } from '@/interfaces/models/course.interface';
import htmlParser from 'html-react-parser';
import { Section } from '@/components/Section';
import axios from "axios";
import { ReviewCardProps } from '@/components/ReviewCard';
import ReviewCard from '@/components/ReviewCard';
import { FaVideo,FaTv } from "react-icons/fa";
import { IoMdDocument } from "react-icons/io";
import {toast} from 'react-toastify'
import { useRouter } from 'next/navigation';

const CourseDetailPage = () => {
  const { courseId } = useParams()
  const course = useApi<Course>(`course/${courseId}`, { method: 'GET' })
  const reviews = useApi<ReviewCardProps[]>(`rating/course/${courseId}/page=1`, { method: 'GET' })
  const router = useRouter()
  const handleAddToCart = async () => {
    try {
      await axios.post(`http://localhost:3333/cart/add/${courseId}`, {}, { withCredentials: true });
      toast.success("✅ Đã thêm sản phẩm vào giỏ hàng");
    } catch (err) {
      console.log(err)
      toast.info("Khóa học đã mua hoặc đã có trong giỏ hàng");
    }
  };
  const handlePurchase = ()=>{
    router.push(`/payment/checkout/${courseId}`)
  }
 

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">
              {course.data?.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-gray-600">
              <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-full">
                <span className="text-yellow-600 text-lg">★★★★☆</span>
                <span className="ml-2 text-sm">4.5 (12 reviews)</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  20.5 giờ
                </span>
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  {course.data?.Section?.reduce((total, section) => total + (section.lessons?.length || 0), 0)} khóa học
                </span>
              </div>
            </div>

            <div className="flex items-center mt-4">
              <div className="flex items-center">
                <Image
                  width={48}
                  height={48}
                  src={course.data?.instructor?.user?.profilePicture || '/img/Avatar.jpg'}
                  alt="Instructor"
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div className="ml-3">
                  <p className="text-sm text-gray-500">Tạo bởi</p>
                  <p className="font-medium text-gray-900">
                    {course.data?.instructor?.user?.name || 'Unknown Instructor'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Course Description */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Về khóa học này</h2>
              <div className="prose max-w-none text-gray-600">
                {htmlParser(course.data?.description || '')}
              </div>
            </div>

            {/* Curriculum */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Nội dung khóa học</h2>
              <div className="border rounded-lg overflow-hidden">
                <Section 
                  isDisable={true} 
                  courseId={Array.isArray(courseId) ? courseId[0] : courseId} 
                  sections={course.data?.Section || []}
                />
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Đánh giá của học viên</h2>
                <span className="text-gray-500">{reviews.data?.length} đánh giá</span>
              </div>
              
              <div className="space-y-6">
                {reviews.data?.map((review, index) => (
                  <ReviewCard key={index} review={review} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <Image 
                  width={300}
                  height={300}
                  src={course.data?.thumbnail || '/img/course-placeholder.jpg'}
                  alt="Course thumbnail"
                  className="w-full h-full object-cover"
                />
                
                <div className="p-6">
                  <div className="mb-4">
                    <div className="flex items-end gap-2">
                    {course.data?.dicount_price &&course.data.dicount_price>0 ? (
                      <>
                        <span className="text-3xl font-bold text-gray-900">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(course.data.dicount_price)}
                        </span>
                        <span className="text-gray-500 line-through">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(course.data.price)}
                        </span>
                      </>
                    ) : (
                      <span className="text-3xl font-bold text-gray-900">
                        {course.data ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(course.data.price) : 'N/A'}
                      </span>
                    )}
                  </div>
                  </div>

                  <button 
                    onClick={handleAddToCart}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors duration-200"
                  >
                    Thêm vào giỏ hàng
                  </button>
                  
                  <button onClick={handlePurchase} className="w-full mt-3 bg-slate-100 hover:bg-gray-800  text-black py-3 px-4 rounded-lg transition-colors duration-200">
                    Mua luôn
                  </button>
                    <h2 className="text-sm mt-10 font-semibold text-gray-900 mb-4">Khóa học này bao gồm:</h2>
                    <ul className="mt-4 space-y-2 text-gray-700">

                    <li className="flex items-center gap-2">
                      <FaTv className="text-blue-600" />
                      <span>{(course.data?.Section?.reduce((total, section) => total + (section.lessons?.length || 0), 0)||0)*3} giờ</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <IoMdDocument className="text-green-600" />
                      <span>{course.data?.Section?.reduce((total, section) => total + (section.lessons?.length || 0), 0)} bài học</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <FaVideo className="text-red-600" />
                      <span>15 video</span>
                    </li>
                    </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;