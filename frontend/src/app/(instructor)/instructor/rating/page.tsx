'use client'
import ReviewCard,{ReviewCardProps} from "@/components/ReviewCard"


import {  useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { useAppContext } from "@/contexts/AuthContext"


const Page = ()=>{
    const router = useRouter()
    const {isAuthenticated,loading} = useAppContext()
        useEffect(() => {
          if (!isAuthenticated && !loading) {
              router.push("/login")
          }
      }, [isAuthenticated, loading, router])
    const [reviews, setReviews] = useState<ReviewCardProps[]>([])
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get("http://localhost:3333/rating/instructor",{withCredentials: true})
                setReviews(response.data)
            } catch (error) {
                console.error("Error fetching reviews:", error)
            }
        }

        fetchReviews()
    }, [])
    
    return (
        <div className="max-w-4xl mx-auto mt-16 w-full px-4 md:px-6">
        {/* Header */}
        <div className="bg-blue-600 text-white p-6 rounded-xl shadow-lg mb-6">
            <h1 className="text-3xl font-bold">Đánh giá khóa học</h1>
            <p className="text-lg mt-1">Xem và lọc các đánh giá từ học viên</p>
        </div>

        {/* Bộ lọc */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Bộ lọc</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Lọc theo số sao */}
            <div>
                <h3 className="font-medium mb-2">Số sao</h3>
                <select className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400">
                <option value="1">1 sao</option>
                <option value="2">2 sao</option>
                <option value="3">3 sao</option>
                <option value="4">4 sao</option>
                <option value="5">5 sao</option>
                </select>
            </div>

            {/* Lọc theo tiêu chí */}
            <div>
                <h3 className="font-medium mb-2">Lọc theo</h3>
                <select className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md p-2 w-full focus:ring-2 focus:ring-blue-400">
                <option value="course">Khóa học</option>
                <option value="newest">Mới nhất</option>
                <option value="oldest">Cũ nhất</option>
                </select>
            </div>
            </div>
        </div>

        {/* Phần Loading */}
        {loading ? (
            <div className="flex justify-center items-center py-10">
            <p className="text-lg font-medium">Loading...</p>
            </div>
        ) : (
            <div className=" w-full">
            {reviews.map((review, index) => (
                <ReviewCard key={index} review={review} />
            ))}
            </div>
        )}
        </div>

    )
}

export default Page