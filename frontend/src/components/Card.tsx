import Image from "next/image";
import Link from "next/link";
import React from "react";

interface LinkItem {
  src: string;
  alt: string;
  href: string
}

interface CardProps {
  img: string;
  title: string;
  position: string;
  links?: LinkItem[];
}

const Card: React.FC<CardProps> = ({ img, title, position, links = [] }) => {
  return (
    <div className="bg-[rgb(248,250,245)] p-[10px] rounded-[30px] flex flex-row gap-5 overflow-hidden">
      <div className="border-black border-8 rounded-[30px] shadow-xl shadow-gray-300 flex-shrink-0 max-w-full h-fit">
        <Image
          src={img}
          alt="avatar"
          width={150}
          height={318}
          quality={100}
          layout="intrinsic"
          className="rounded-[20px] object-fill block max-w-full h-auto"
        />
      </div>
      <div className="flex flex-col justify-center gap-[3px]">
        <h1 className="font-bold text-4xl">{title}</h1>
        <p className="text-[rgb(15,15,15)] text-base opacity-50 font-semibold">{position}</p>
        {links.length > 0 && (
          <div className="flex gap-2 mt-6">
            {links.map((link, index) => (
              <Link key={index} href={link.href}>
                <Image
                  src={link.src}
                  alt={link.alt}
                  width={20}
                  height={20}
                  quality={100}
                  className=""
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
