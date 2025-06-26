'use client'
import { useAppContext } from '@/contexts/AuthContext';
import useApi from '@/hooks/useApi';
import { useRouter } from 'next/navigation';
import {RevenueChart,RevenueData} from '@/components/Chart';
import React from 'react';
import {  
    HiDocumentText,  
      
  } from 'react-icons/hi2';
import { FaDongSign } from "react-icons/fa6";

import { useEffect } from 'react';
export type CourseProps = {
    id:string,
    name:string,
    price:number,
    level:string,
    isPublished:boolean,
    enrollment:number,
    createdAt:string
    
}

export default function AdminDashboard() {
    const router = useRouter()
    const {isAuthenticated,loading} = useAppContext()
    useEffect(() => {
      if (!isAuthenticated && !loading) {
          router.push("/login")
      }
  }, [isAuthenticated, loading, router])
    const courses = useApi<CourseProps[]>('course/me', { method: 'get',withCredentials:true });
    const revenue = useApi<RevenueData[]>('revenue/me',{withCredentials:true})
    const formattedData = revenue?.data?.map((item) => {
      const date = new Date(item.createdAt);
      const formatted = date.toLocaleDateString('vi-VN')

      return {
        amount: item.amount,
        createdAt: formatted,
      };
    });
    
  
    return (
      <div className="p-4 sm:ml-64 flex flex-col justify-start bg-gray-100 ">
        {/* Header */}
        
        <h1 className="text-4xl  font-bold text-gray-800 mb-4">Tổng Quan</h1>
        {/* Dashboard Stats */}
         {/* Revenue Chart */}
        <div className="mt-6">
          <RevenueChart data={formattedData || []} />
        </div>
        <div className="grid mt-10 grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
            <HiDocumentText className="h-10 w-10 text-green-500" />
            <div>
              <p className="text-gray-500">Tổng số khóa học</p>
              <p className="text-2xl font-bold">{courses.data?.length}</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
            <HiDocumentText className="h-10 w-10 text-blue-500" />
            <div>
              <p className="text-gray-500">Tổng số học sinh</p>
              <p className="text-2xl font-bold">
                {courses.data?.reduce((total, course) => total + course.enrollment, 0)}
              </p>
            </div>
          </div>
        </div>
  
        {/* Courses Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Khóa học</h2>
            
          </div>
  
          {/* Courses Table */}
          <table className="w-full text-left">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-3">Tên</th>
                <th className="p-3">Số học viên</th>
                <th className="p-3">Giá</th>
                <th className="p-3">Ngày tạo</th>
                <th className="p-3">Tình trạng</th>
              </tr>
            </thead>
            <tbody>
              {courses.data?.map((course) => (
                <tr key={course.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{course.name}</td>
                  <td className="p-3">{course.enrollment}</td>
                  <td className="p-3">{course.price.toLocaleString('de-DE')}<FaDongSign /></td>
                  <td className="p-3">{new Date(course.createdAt).toLocaleString()}</td>
                  <td className="p-3">
                    <span className={`
                      px-2 py-1 rounded text-xs font-medium
                      ${course.isPublished === true 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'}
                    `}>
                      {course.isPublished === true ? 'Đã xuất bản' : 'Chưa xuất bản'}
                    </span>
                  </td>
                  <td className="p-3">

                  <button 
                    className="px-3 py-1 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
                    onClick={() => router.push(`/instructor/course/update/${course.id}`)}
                  >
                    Sửa
                  </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }