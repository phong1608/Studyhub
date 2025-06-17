import { data } from '@/constants/dataProjects';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { MdNavigateNext } from 'react-icons/md';

const Project1 = () => {
  return (
    <div className="p-20 flex flex-col gap-20">
      <h1 className="text-[50px]">NHỮNG DỰ ÁN KHÁC</h1>
      <div className="grid grid-cols-2 md:grid-cols-3">
        {data.map((slide, index) => (
          <Link
            key={index}
            href={`/projects/detail/${slide.id}`}
            className="relative p-8 flex flex-col border duration-500 overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-950 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>

            <Image
              src={slide.img}
              alt={`img-${slide.id}`}
              fill
              className="absolute inset-0 object-cover -z-10 grayscale group-hover:grayscale-0 transition-all duration-500"
            />

            <div className="relative z-10 gap-6">
              <h2 className="inline-block px-[10px] py-1 rounded-bl-lg rounded-tr-lg text-xl font-semibold text-white backdrop-blur-md">
                DỰ ÁN
              </h2>
              <div className="mt-20 flex flex-col gap-2">
                <h3 className="text-xl text-[rgb(217,217,217)]">
                  {slide.title}
                </h3>
                <div className="flex items-center gap-2 group/readmore">
                  <p className="text-lg text-white group-hover/readmore:text-[rgb(87,85,254)] duration-300">
                    Đọc thêm
                  </p>
                  <MdNavigateNext className="text-white text-xl group-hover/readmore:text-[rgb(87,85,254)] group-hover:translate-x-1 transition duration-300" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Project1;
