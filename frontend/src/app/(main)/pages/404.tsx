import Link from 'next/link';
import React from 'react';

const Custom404 = () => {
  return (
    <div className="animate-slide-up flex flex-col gap-10 justify-center items-center text-center pt-60 pb-[120px] px-[120px]">
      <div className="flex flex-col justify-center items-center text-center gap-6">
        <h2 className="text-xl">404</h2>
        <h1 className="text-[50px]">Page not found &gt;_&lt;</h1>
        <Link
          href={'/'}
          className="bg-[rgb(87,85,254)] text-white hover:bg-black duration-300 px-6 py-3 w-fit rounded-bl-2xl rounded-tr-2xl"
        >
          Quay lại trang chủ
        </Link>
      </div>
    </div>
  );
};

export default Custom404;
