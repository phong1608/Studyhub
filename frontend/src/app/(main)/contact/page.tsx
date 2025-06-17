'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { MdNavigateNext } from 'react-icons/md';

const FormContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    checked: false,
  });

  const isFormValid =
    formData.name.trim() !== '' &&
    formData.email.trim() !== '' &&
    formData.message.trim() !== '' &&
    formData.checked;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div>
      <div className="pt-[120px] pb-20 flex flex-col gap-20">
        <div className="flex flex-col items-center justify-center text-center gap-8 px-[60px]">
          <h2 className="text-5xl">Liên hệ với đội ngũ của chúng tôi</h2>
          <p className="text-xl">
            Vui lòng liên hệ bằng cách sử dụng biểu mẫu liên hệ bên dưới hoặc
            thông qua thông tin liên hệ được cung cấp. Chúng tôi sẽ phản hồi kịp
            thời để đảm bảo bạn có trải nghiệm thú vị khi tham gia với VisionIQ.
            Hãy kết nối và biến khát vọng AI của bạn thành hiện thực!
          </p>
        </div>
      </div>

      <div className=" flex justify-center items-center pb-20">
        <form
          action=""
          onSubmit={handleSubmit}
          className="rounded-tr-2xl rounded-bl-2xl flex flex-col gap-4 "
        >
          <div className="flex flex-row justify-center text-center items-center gap-4">
            <label htmlFor="" className="box-border">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Họ tên"
                className="p-4 text-sm border border-black rounded-tr-2xl rounded-bl-2xl focus:outline-none focus:border-[rgb(87,85,254)] focus:border-2"
              />
            </label>
            <label htmlFor="" className="box-border">
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="p-4 text-sm border border-black rounded-tr-2xl rounded-bl-2xl focus:outline-none focus:border-[rgb(87,85,254)] focus:border-2"
              />
            </label>
          </div>

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Lời nhắn"
            className="p-4 rounded-tr-2xl border border-black rounded-bl-2xl focus:outline-none focus:border-[rgb(87,85,254)] focus:border-2"
          ></textarea>

          <div className="flex gap-3 text-center items-center">
            <label htmlFor="">
              <input
                type="checkbox"
                name="checked"
                checked={formData.checked}
                onChange={handleChange}
                className=" box-border w-6 h-6 border border-black checked:bg-[rgb(87,85,254)]"
              />
            </label>
            <p>Tôi đồng ý với </p>
            <Link
              href={'/privacy_policy'}
              className="flex items-center gap-2 group"
            >
              <p className="text-lg group-hover:text-[rgb(87,85,254)] duration-300 hover:animate-bounce">
                Chính sách bảo mật
              </p>
              <MdNavigateNext className=" text-xl group-hover:text-[rgb(87,85,254)] group-hover:translate-x-1 transition duration-300" />
            </Link>
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className={`px-6 py-3 rounded-bl-2xl rounded-tr-2xl flex justify-center w-full  ${
              isFormValid
                ? 'bg-[rgb(87,85,254)] hover:bg-[rgb(87,85,254)] duration-300 hover:scale-125'
                : 'bg-slate-500'
            }`}
          >
            <p className="text-[18px] text-white font-normal ">Gửi</p>
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormContact;
