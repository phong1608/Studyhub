'use client'
import Image from "next/image";
import useApi from "@/hooks/useApi";
import axios from "axios";
import { Course } from "@/components/GroupCourses";
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

const CheckoutPage = ()=>{
    const {data} = useApi<UserCart>(`cart/user/get`,{method:'GET',withCredentials:true,data:{}})

    const handleCheckout = async () => {
        const res=await axios.post(`http://localhost:3333/payment/cod`,{}, { withCredentials: true });
        if (res.data.url) {
            // Điều hướng sang URL thanh toán VNPAY
            window.location.href = res.data.url;
          } else {
            console.error('Không lấy được URL thanh toán');
          }   
    } 
    return(
    <>
        <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Thanh toán</h1>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {data?.cartItems&&data?.cartItems.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {/* Cart Items */}
              <div className="px-4 py-6 sm:px-6">
                <h2 className="text-2xl font-blod font-medium text-gray-900 mb-4">Đơn hàng</h2>
                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>

                <ul className="divide-y divide-gray-200">
                  {data.cartItems.map((item) => (
                    <li key={item.course.id} className="py-4 flex items-start gap-4">
                    <Image
                      src={item.course.thumbnail}
                      alt={item.course.name}
                      className="w-24 h-24 object-cover rounded-lg border"
                      width={96}
                      height={96}
                    />
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-gray-900">{item.course.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{item.course.price.toLocaleString('de-DE')} VNĐ</p>
                    </div>
                  </li>
                  
                  ))}
                </ul>
              </div>
              
              <div className="px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                    <p>Tổng tiền</p>
                    <p>{data.finalPrice.toLocaleString('de-DE')} VNĐ</p>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <p>Khuyến mãi</p>
                    <p>{data.discountPrice.toLocaleString('de-DE')} VNĐ</p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900 mb-6">
                    <p>Tổng thanh toán</p>
                    <p>{data.finalPrice.toLocaleString('de-DE')} VNĐ</p>
                </div>

                    <Image
                        src="/vnpay-logo-inkythuatso.svg"
                        alt="VNPAY"
                        className="h-20 w-20"
                        width={200}
                        height={200}
                    />
                <div className="flex justify-end">
                    <button
                    onClick={handleCheckout}
                    className="bg-indigo-600 border border-transparent rounded-md py-2 px-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center gap-2"
                    >
                    Thanh toán
                    </button>
                </div>
                </div>

            </div>
          ) : (
            <div className="px-4 py-6 sm:px-6 text-center">
              <p className="text-gray-500 mb-4">Giỏ hàng trống</p>
              <button
                className="text-indigo-600 font-medium hover:text-indigo-500"
               
              >
                Tiếp tục mua sắm
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
    </>

    )
}
export default CheckoutPage;