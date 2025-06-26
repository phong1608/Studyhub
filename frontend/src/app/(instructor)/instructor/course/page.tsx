'use client'
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { useEffect, useState,useRef } from "react"
import { CiSearch } from 'react-icons/ci';

import CardCourse,{  Course } from "@/components/GroupCourses"
import { useAppContext } from "@/contexts/AuthContext"
export default  function InstructorPage() {
  const { user,loading,isAuthenticated } = useAppContext()
  const [courses, setCourses] = useState<Course[]>([])
  const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
  console.log(user?.id)
  useEffect(() => {
    if (!loading && isAuthenticated) {
      fetch(`http://localhost:3333/course/instructor/${user?.id}`)
        .then((res) => res.json())
        .then((data) => setCourses(data))
    }
  }, [loading, isAuthenticated, user])
  
    return (
      <div className="pt-16">
        <div className="p-4 sm:ml-64 flex flex-col justify-start">
          <h1 className="text-2xl font-bold mb-4">Khóa học của bạn</h1>

          <div
            className={`relative z-20 flex items-center gap-3 px-4 py-3 rounded-full bg-white 
          border-2 transition-all duration-300 ${
            isFocused
              ? 'shadow-2xl scale-105 border-gray-400'
              : 'shadow-md border-gray-200'
          }`}
            onClick={() => inputRef.current?.focus()}
          >
            <CiSearch className="text-gray-500" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search..."
              className="w-full outline-none text-gray-700 bg-transparent"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </div>
          <div className="w-full mt-10 flex flex-row items-start gap-4">
        {courses && courses.map((course) => (
          <CardCourse course={course} key={course.id} />
        ))}
          </div>
          <div className="fixed right-10">
        <Button asChild>
          <Link href="/instructor/course/create">Khóa học mới</Link>
        </Button>
          </div>
        </div>
      </div>
    )
  }
  
