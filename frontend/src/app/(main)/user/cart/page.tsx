'use client'
import Image from "next/image"
import { useAppContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Course } from "@/components/GroupCourses";
import Link from "next/link";
import { FaDongSign } from "react-icons/fa6";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

interface UserCart{
    id:string,
    cartItems:CartItem[],
    totalPrice:number,
    discountPrice:number,
    finalPrice:number
}
interface CartItem{
    cartId:string,
    course:Course,

}
const CartPage = () => {
    const { isAuthenticated, loading } = useAppContext()
    const router = useRouter()
    const [cart,setCart] = useState<UserCart>()
    if(!loading&&isAuthenticated === false)
    {
        router.push('/')
    }
    const [isUpdate,setUpdate] = useState(false)
    useEffect(()=>{
        const fetchData=async()=>{

            const res=await axios.get("http://localhost:3333/cart/user/get",{withCredentials:true})
            setCart(res.data)
        }
        fetchData()
    },[isUpdate])
    const handleRemoveFromCart = async(courseId:string)=>{
        await axios.post(`http://localhost:3333/cart/delete/${courseId}`,{},{withCredentials:true})
        setUpdate(prev=>!prev)

        toast.info("Khóa học đã được xóa khỏi giỏ hàng")

      }
    return(
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
    <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Giỏ hàng</h2>

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
        <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
            {cart?.cartItems.length === 0 ? (
                <div className="flex items-center justify-center h-64 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
                <p className="text-gray-500 dark:text-gray-400">Giỏ hàng của bạn đang trống</p>
                </div>
            ) : (
                cart?.cartItems.map((item) => (
                <div key={item.course.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                    <a href="#" className="shrink-0 md:order-1">
                    {item.course.thumbnail ? (
                        <Image
                        width={500}
                        height={200}
                        className="w-full max-w-[500px] h-auto shrink-0 overflow-hidden rounded-md border border-gray-200 object-contain"
                        src={item.course.thumbnail}
                        alt={item.course.name || "Course thumbnail"}
                      />
                      
                    ) : (
                        <div className="h-20 w-20 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                            <span className="text-sm text-gray-500 dark:text-gray-400">No Image</span>
                        </div>
                    )}
                    </a>

                    <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                    <a href="#" className="text-base font-bold text-gray-900 hover:underline dark:text-white">{item.course.name}</a>
                    <div className="flex items-center text-base font-medium text-gray-900 hover:underline dark:text-white">
                        {item.course.price.toLocaleString('de-DE')}
                        <FaDongSign className="ml-1" />
                    </div>


                    <div className="flex items-center gap-4">
                        <button onClick={()=>handleRemoveFromCart(item.course.id)} type="button" className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                        <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                        </svg>
                        Xóa
                        </button>
                    </div>
                    </div>
                </div>
                </div>
            )))}
            
            
            </div>
            
        </div>

        <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
            <p className="text-xl font-semibold text-gray-900 dark:text-white">Tóm tắt đơn hàng</p>

            <div className="space-y-4">
                <div className="space-y-2">
                <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Giá gốc</dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">{cart?.finalPrice.toLocaleString('de-DE')} VNĐ</dd>
                </dl>

                <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tiết kiệm</dt>
                    <dd className="text-base font-medium text-green-600">{cart?.discountPrice.toLocaleString('de-DE')} VNĐ</dd>
                </dl>
                </div>

                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                <dt className="text-base font-bold text-gray-900 dark:text-white">Tổng thanh toán</dt>
                <dd className="text-base font-bold text-gray-900 dark:text-white">{cart?.finalPrice.toLocaleString('de-DE')} VNĐ</dd>
                </dl>
            </div>

            <a href="#" className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Proceed to Checkout</a>

            <div className="flex items-center justify-center gap-2">
                <a href="#" title="" className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
                Tiếp tục mua sắm
                <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                </svg>
                </a>
                
            </div>
            <Link href={'/payment/checkout'} type="submit" className="flex w-full items-center justify-center rounded-lg bg-cyan-600 px-5 py-2.5 text-sm font-medium text-black  hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Thanh toán</Link>
            </div>

            
        </div>
        </div>
    </div>
    </section>
    )
}
export default CartPage;