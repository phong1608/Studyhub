"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useAppContext } from "@/contexts/AuthContext";
import { CiShoppingCart } from "react-icons/ci";
import { useRouter } from "next/navigation";
import useApi from "@/hooks/useApi";
import { Category } from "./GroupCourses";
const Header = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true); // Trạng thái hiển thị Header
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // Trạng thái hiển thị dropdown
  const dropdownRef = useRef<HTMLDivElement>(null); 
  const lastScrollY = useRef(0); 
  const { user, isAuthenticated,logout } = useAppContext();
  const router = useRouter();

  const {data} = useApi<Category[]>('category/get', { method: 'get' })

  const hanldeLogout = async () => {
    try{
      await logout()
      router.push('/')
    }
    catch(err){
      console.log(err)
    }
  }
  // Đóng dropdown khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false); // Đóng dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Theo dõi scroll để ẩn/hiện Header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setIsHeaderVisible(false); // Ẩn header khi cuộn xuống
      } else {
        setIsHeaderVisible(true); // Hiện header khi cuộn lên
      }

      lastScrollY.current = currentScrollY; // Cập nhật vị trí cuộn trước đó
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
    <header
  className={`${
    isHeaderVisible ? "translate-y-0" : "-translate-y-full"
  } flex shadow-md py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] tracking-wide relative z-50 !border-none !border-0`}
>

      <div className="flex flex-wrap items-center justify-between gap-5 w-full">
        <Link href={"/"}>
          <Image
            src="/learning-school-svgrepo-com.svg"
            alt="Next.js"
            width={50}
            height={50}
          />
        </Link>

        <div className="max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50">
          <input
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-96"
            type="search"
            name="search"
            placeholder="Tìm kiếm khóa học..."
          />
        </div>

        <div className="flex max-lg:ml-auto space-x-4">
          {!isAuthenticated ? (
            <>
              <Link
                href="/login"
                className="px-4 py-2 text-sm rounded-full font-bold text-gray-500 border-2 bg-transparent hover:bg-gray-50 transition-all ease-in-out duration-300"
              >
                Đăng nhập
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]"
              >
                Đăng ký
              </Link>
            </>
          ) : (
            <div className="flex items-center space-x-8">
                <Link href={user?.userType=='Instructor'?'/instructor':'/signup/instructor'} className="text-sm font-thin px-2">Giảng viên</Link>
                <Link href={'/learn'} className="text-sm font-thin px-2">Khóa học</Link>
                <Link href={'/user/cart'} ><CiShoppingCart className="text-2xl" /></Link>
              <div ref={dropdownRef} className="relative">
                <button
                  className="flex items-center space-x-2"
                  onClick={() => setIsDropdownVisible(!isDropdownVisible)}
                >
                  <Image
                    src='/img/Avatar.jpg'
                    alt={user?.name || "User"}
                    width={30} 
                    height={30} 
                    className="rounded-full object-cover border-2 border-gray-200"
                  />
                </button>
                {isDropdownVisible && (
                  <div className="absolute top-12 right-0 bg-white shadow-lg rounded-md w-40 py-2">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={hanldeLogout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                  
                )}
              </div>
            </div>

          )}
        </div>
      </div>
    </header>
    <nav className="bg px-4 py-2">
      <ul className="flex justify-around">
        {data?.map((cat, idx) => (
          <Link href={`/catalog/courses/category/${cat.id}`} key={idx} className="text-black hover:underline cursor-pointer">
            {cat.name}
          </Link>
        ))}
      </ul>
    </nav>
    </div>
  );
};

export default Header;
