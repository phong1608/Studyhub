import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { MdNavigateNext } from 'react-icons/md';

const data = [
  {
    link: '/projects/detail/disaster-recovery-and-business-continuity',
    img: 'https://framerusercontent.com/images/9WvJGwXREbTWwGJukMoTeRsN7Xk.jpg',
    title: 'Khắc phục thảm họa và duy trì hoạt động kinh doanh',
  },
  {
    link: '/projects/detail/a-new-frontier-for-business-advancement',
    img: 'https://framerusercontent.com/images/PnciCgl17uJYw3fEvxlVvUDCFQ.jpg',
    title: 'Một giới hạn mới cho sự phát triển kinh doanh',
  },
  {
    link: '/projects/detail/navigating-the-cloud',
    img: 'https://framerusercontent.com/images/F58yN8TAd8I4Kqq8NNDLxyuKws.jpg',
    title: 'Navigating the Cloud',
  },
  {
    link: '/projects/detail/revolutionizing-the-business-landscape',
    img: 'https://framerusercontent.com/images/vji38ndf49HPCGc8QJ0VRpRg.jpg',
    title: 'Revolutionizing the Business Landscape',
  },
  {
    link: '/projects/detail/the-power-of-cloud-computing-for-businesses',
    img: 'https://framerusercontent.com/images/frB1IyfRBWGc9SUVk1uHOLk6rg.jpg',
    title: 'The Power of Cloud Computing for Businesses',
  },
  {
    link: '/projects/detail/unveiling-the-power-of-cloud-computing',
    img: 'https://framerusercontent.com/images/yfMmkpVDpnZUduaLy9mKK9R835o.jpg',
    title: 'Unveiling the Power of Cloud Computing',
  },
];

const Project = () => {
  return (
    <div className="p-20 flex flex-col gap-20">
        <h1 className="text-[50px]">NHỮNG DỰ ÁN KHÁC</h1>
        <div className="grid grid-cols-2 md:grid-cols-3">
          {data.map((slide, index) => (
            <Link
            key={index}
            href={slide.link}
            className="relative p-8 flex flex-col border duration-500 overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-950 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
    
            <Image
              src={slide.img}
              alt="img-project"
              fill
              className="absolute inset-0 object-cover -z-10 grayscale group-hover:grayscale-0 transition-all duration-500"
            />
    
            {/* Nội dung */}
            <div className="relative z-10 gap-6">
              <h2 className="inline-block px-[10px] py-1 rounded-bl-lg rounded-tr-lg text-xl font-semibold text-white backdrop-blur-md">
                DỰ ÁN
              </h2>
              <div className="mt-20 flex flex-col gap-2">
                <h3 className="text-xl text-[rgb(217,217,217)]">{slide.title}</h3>
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

export default Project;
