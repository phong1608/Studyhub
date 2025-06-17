"use client";

import Link from "next/link";
import React from "react";
import {
  PiFacebookLogoLight,
  PiInstagramLogoLight,
  PiLinkedinLogoLight,
} from "react-icons/pi";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();

  return (
    <footer className="bottom-0 flex border-t-[1px] p-10 items-center justify-center w-full bg-[radial-gradient(49%_62.8205%_at_50.7%_0%,_rgb(189,204,255)_0%,_rgb(217,225,255)_25%,_rgb(255,255,255)_100%)]">
      <div className="flex flex-col justify-center items-center gap-6">
        <div id="social" className="flex gap-2">
          <Link
            href="https://www.facebook.com/profile.php?id=61566030839191"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full p-2 bg-gray-400 hover:bg-lime-400 duration-300"
          >
            <PiFacebookLogoLight className=" text-[rgb(87,85,254)] hover:text-black h-5 w-5" />
          </Link>
          <Link
            href="https://www.linkedin.com/company/mca-consulting-analytics/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full p-2 bg-gray-400 hover:bg-lime-400 duration-300"
          >
            <PiLinkedinLogoLight className=" text-[rgb(87,85,254)] hover:text-black h-5 w-5" />
          </Link>
          <Link
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full p-2 bg-gray-400 hover:bg-lime-400 duration-300"
          >
            <PiInstagramLogoLight className=" text-[rgb(87,85,254)] hover:text-black h-5 w-5" />
          </Link>
        </div>

        <div className="flex gap-5">
          <p>
            <Link
              href={"/cookie_policy"}
              className={`text-base ${
                pathname === "/cookie_policy"
                  ? "text-[rgb(87,85,254)]"
                  : "hover:text-[rgb(87,85,254)]"
              }`}
            >
              Chính sách Cookie
            </Link>
          </p>
          <p>
            <Link
              href={"/privacy_policy"}
              className={`text-base ${
                pathname === "/privacy_policy"
                  ? "text-[rgb(87,85,254)]"
                  : "hover:text-[rgb(87,85,254)]"
              }`}
            >
              Chính sách bảo mật
            </Link>
          </p>
          <p>
            <Link
              href={"/terms_and_conditions"}
              className={`text-base ${
                pathname === "/terms_and_conditions"
                  ? "text-[rgb(87,85,254)]"
                  : "hover:text-[rgb(87,85,254)]"
              }`}
            >
              Điều khoản & Điều kiện
            </Link>
          </p>
        </div>

        <div className="flex flex-col justify-center items-center gap-[10px]">
          <p className="text-base">
            Địa chỉ: Toà nhà X, số 1, đường 19, phường Bình An, Hà Nội
          </p>
          <p>Hotline: 091 xxx xx xx</p>
          <p>Email: hoang160803@gmail.com</p>

          <p>Số đăng ký kinh doanh: 011082xxxx - CÔNG TY CỔ PHẦN ĐÀO TẠO </p>
        </div>

        <p>© 2024 LHE. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
