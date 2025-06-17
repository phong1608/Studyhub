'use client';

// import useApi from '@/hooks/useApi';
import { useRef, useState } from 'react';
import { CiSearch } from 'react-icons/ci';

const CoursesPage = () => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  // const courses = useApi('course',{method:'GET'})
  return (
    <div className="relative">
      {/* Overlay tối */}
      {isFocused && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10"
          onClick={() => setIsFocused(false)} // Tắt overlay khi click ra ngoài
        ></div>
      )}
      <div
        className="flex flex-col gap-[30px] px-20 pb-20 pt-40 bg-gradient-to-b from-[rgb(189,204,255)] to-white"
        id="home-similar"
      >
        <div className="flex flex-col gap-4">
          <h2 className="font-bold text-xl uppercase">
            Khám phá những khoá học được chúng tôi cung cấp
          </h2>
          <h1 className="text-[50px]">Khóa học đơn lẻ</h1>
          <h2 className="font-semibold text-xl">
            Học từ các chuyên gia và thực hành trực tiếp trên trình duyệt của
            bạn. Các video hướng dẫn và bài tập tương tác sẽ giúp bạn rèn luyện
            và phát triển những kỹ năng mới.
          </h2>
        </div>
      </div>

      <div className="pt-10 pb-[100px] px-40">
        <div className="flex flex-col px-[15px] gap-14">
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

        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
