'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { BsFillStarFill } from 'react-icons/bs';

import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { logoday } from '@/constants/logo';
import { MdNavigateNext } from 'react-icons/md';

const AcademyPage = () => {
  const animation = { duration: 2000, easing: (t: number) => t };

  // const logos = [
  //   './next.svg',
  //   './vercel.svg',
  //   './window.svg',
  //   './file.svg',
  //   './globe.svg',
  //   '/x.png',
  // ];
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    renderMode: 'performance',
    drag: false,
    slides: {
      perView: 8,
      spacing: 40,
    },
    created(s) {
      s.moveToIdx(1, true, animation);
    },
    //   updated(s) {
    //     s.moveToIdx(s.track.details.abs + 1, true, animation)
    //   },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 1, true, animation);
    },
  });

  const [formContact, setFormContact] = useState({
    name: '',
    email: '',
  });

  const isFormValid =
    formContact.name.trim() !== '' && formContact.email.trim() !== '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormContact({ ...formContact, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formContact);
  };
  return (
    <div>
      <div id="hero" className="pt-[200px] pb-10 bg-[#F8F8F8]">
        <div className="flex flex-col gap-20">
          <div className="px-20 grid sm:grid-cols-2 gap-20">
            <div className="relative ">
              <Image
                src={
                  'https://framerusercontent.com/images/aTjtJJGxuy3avHrtmudaw8F06g.png?scale-down-to=512'
                }
                alt="icon"
                width={150}
                height={150}
                className="object-cover absolute top-0 left-0 transform translate-y-24 z-0"
              />
              <div className="flex flex-col gap-6 pl-6 pr-1 relative z-10">
                <p className="text-7xl text-[rgb(15,23,40)]">
                  Giúp bạn thoải mái hơn trong hoạt động kinh doanh.
                </p>
                <p className="text-[rgb(71,84,102)] text-[22px]">
                  Từ quản lý tác vụ trực quan đến phân tích dữ liệu nâng cao,
                  phần mềm của chúng tôi trang bị cho bạn những công cụ bạn cần
                  để phát triển trong bối cảnh kinh doanh cạnh tranh ngày nay.
                </p>
                <div className="flex flex-row items-center gap-4">
                  <div className="flex flex-row relative">
                    <div
                      id="container-avatar"
                      className="rounded-full border-white border-2 flex-shrink-0 w-9 h-9 overflow-hidden hover:-translate-y-3 duration-500 z-0"
                    >
                      <Image
                        src="https://framerusercontent.com/images/PUja2jlMhB77g7YskLJxlVzkBAA.jpg"
                        alt="avatar"
                        height={100}
                        width={100}
                        quality={100}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div
                      id="container-avatar"
                      className="rounded-full border-white border-2 flex-shrink-0 w-9 h-9 overflow-hidden hover:-translate-y-3 duration-500 -ml-2 z-10"
                    >
                      <Image
                        src="https://framerusercontent.com/images/0OBj7uN1ncKrMVzB0GprNt5uI.jpg"
                        alt="avatar"
                        height={100}
                        width={100}
                        quality={100}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div
                      id="container-avatar"
                      className="rounded-full border-white border-2 flex-shrink-0 w-9 h-9 overflow-hidden hover:-translate-y-3 duration-500 -ml-2 z-10"
                    >
                      <Image
                        src="https://framerusercontent.com/images/lVDVGe7ZXiK6CfmkoqwS5fUXY.jpg"
                        alt="avatar"
                        height={100}
                        width={100}
                        quality={100}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div
                      id="container-avatar"
                      className="rounded-full border-white border-2 flex-shrink-0 w-9 h-9 overflow-hidden hover:-translate-y-3 duration-500 -ml-2 z-10"
                    >
                      <Image
                        src="https://framerusercontent.com/images/JhbGle453RWF0QjzZnSxbtxRBiA.jpg"
                        alt="avatar"
                        height={100}
                        width={100}
                        quality={100}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>

                  <div id="star" className="flex flex-row justify-center gap-1">
                    <BsFillStarFill className="text-yellow-500" />
                    <BsFillStarFill className="text-yellow-500" />
                    <BsFillStarFill className="text-yellow-500" />
                    <BsFillStarFill className="text-yellow-500" />
                    <BsFillStarFill className="text-yellow-500" />
                  </div>
                </div>
              </div>
            </div>

            <div className="relative w-full">
              <Image
                src={
                  'https://framerusercontent.com/images/uTKvR6qfTzsBtXOvlLGL21I53YY.png'
                }
                alt="icon"
                width={250}
                height={250}
                className="object-cover absolute top-0 left-0 transform -translate-x-2/3 z-0"
              />
              <div className="bg-white px-8 py-10 rounded-3xl flex flex-col justify-center items-center text-center gap-6 relative z-10">
                <div className="flex flex-col gap-3 relative">
                  <p className="text-[26px] text-[rgb(15,23,40)] font-semibold">
                    Đảm bảo vị trí của bạn bây giờ
                  </p>
                  <p className="text-base text-[rgb(71,84,102)]">
                    Hãy là người đầu tiên biết thời điểm sản phẩm ra mắt và
                    những cập nhật không thể bỏ lỡ khác.
                  </p>
                </div>
                <div id="register" className="w-full relative">
                  <form
                    action=""
                    method="post"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-[15px] w-full"
                  >
                    <div className="grid gap-[15px]">
                      <input
                        type="text"
                        name="name"
                        placeholder="Họ tên"
                        onChange={handleChange}
                        className={`p-[15px] rounded-lg bg-gray-300 border-2 ${
                          isFormValid
                            ? 'border-[rgb(133,77,252)]'
                            : 'border-red-500'
                        }`}
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        className={`p-[15px] rounded-lg bg-gray-300 border-2 ${
                          isFormValid
                            ? 'border-[rgb(133,77,252)]'
                            : 'border-red-500'
                        }`}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={!isFormValid}
                      className={`p-[15px] rounded-lg text-white font-semibold ${
                        isFormValid
                          ? 'bg-[rgb(133,77,252)] hover:opacity-80'
                          : 'bg-slate-500'
                      }`}
                    >
                      Đăng ký
                    </button>
                  </form>
                </div>
                <p className="text-sm text-[rgb(156,163,189)]">
                  Bằng cách đăng ký, bạn đồng ý với
                  <Link
                    href={'terms_and_conditions'}
                    className="text-[rgb(87,85,254)] pl-2"
                  >
                    Điều khoản của chúng tôi
                  </Link>
                </p>
              </div>
              <Image
                src={
                  'https://framerusercontent.com/images/AM9PX8l3tcHV41oVhZ9gWUkBSE.png'
                }
                alt="icon"
                width={300}
                height={250}
                className="object-cover absolute bottom-0 right-0 transform translate-x-1/4 translate-y-2/4 -rotate-45 z-0"
              />
            </div>
          </div>

          <div
            id="logo"
            className="flex flex-col gap-4 justify-center items-center py-8 relative"
          >
            <p className="text-gray-600 text-xl">
              Tham gia cùng các đội ngũ công nghệ khác:
            </p>
            <section className="p-4 flex overflow-hidden w-full relative">
              {/* Hiệu ứng mờ dần bên trái */}
              <div className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-[#F8F8F8] to-transparent pointer-events-none z-10"></div>

              {/* Slider */}
              <div ref={sliderRef} className="keen-slider w-ful border-none">
                {logoday.map((logo, index) => (
                  <div
                    key={index}
                    className="keen-slider__slide flex justify-center items-center"
                  >
                    <Image
                      src={logo}
                      alt={`Logo ${index + 1}`}
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>

              {/* Hiệu ứng mờ dần bên phải */}
              <div className="absolute top-0 right-0 h-full w-1/2 bg-gradient-to-l from-[#F8F8F8] to-transparent pointer-events-none z-10"></div>
            </section>
          </div>
        </div>
      </div>

      <div
        id="Benefit"
        className="px-8 pt-20 pb-[120px] flex flex-col justify-center items-center gap-[60px]"
      >
        <div className="xl:px-40 md:px-40 flex flex-col gap-5 justify-center items-center text-center">
          <p className="text-[rgb(15,23,40)] text-6xl font-semibold">
            Lộ trình học tập được thiết kế bởi các chuyên gia
          </p>
          <p className="text-[rgb(71,84,102)] text-xl">
            Nói lời tạm biệt với những phức tạp trong quá khứ và mở ra con đường
            thành công suôn sẻ hơn. Chào mừng đến với kỷ nguyên mới của sự đơn
            giản và hiệu quả.
          </p>
        </div>
        <div className="flex flex-row gap-6 w-full" id="Bottom">
          <Link
            href={'/'}
            id="contain-python"
            className="rounded-lg p-10 w-full hover:bg-[rgb(198,197,250)] bg-slate-100 duration-300"
          >
            <Image
              src="https://framerusercontent.com/assets/uil2mTEAz02rb3oAEVNXy2zG4dQ.png"
              alt="python"
              height={500}
              width={500}
              quality={100}
              className="object-fit w-full h-9"
            />
          </Link>
          <Link
            href={'/'}
            id="contain-python"
            className="rounded-lg p-10 w-full hover:bg-[rgb(198,197,250)] bg-slate-100 duration-300"
          >
            <Image
              src="https://framerusercontent.com/assets/FrRh7T5m2HRx9AnkG0PrgUEUtI.png"
              alt="python"
              height={500}
              width={500}
              quality={100}
              className="object-fit w-full h-9"
            />
          </Link>
          <Link
            href={'/'}
            id="contain-python"
            className="rounded-lg p-10 w-full hover:bg-[rgb(198,197,250)] bg-slate-100 duration-300"
          >
            <Image
              src="https://framerusercontent.com/assets/s9XsslOpZSqDTVLUWQofdwOtgg.png"
              alt="python"
              height={500}
              width={500}
              quality={100}
              className="object-fit w-full h-9"
            />
          </Link>
          <Link
            href={'/'}
            id="contain-python"
            className="rounded-lg p-10 w-full hover:bg-[rgb(198,197,250)] bg-slate-100 duration-300"
          >
            <Image
              src="https://framerusercontent.com/assets/o5k0pEIz0Ypm8bVaAnF1PzgTSeo.png"
              alt="python"
              height={500}
              width={500}
              quality={100}
              className="object-fit w-full h-9"
            />
          </Link>
        </div>
      </div>

      <div
        id="Benefit"
        className="px-8 pt-20 pb-[120px] flex flex-col justify-center items-center gap-[60px]"
      >
        <div className="xl:px-40 md:px-40 flex flex-col gap-5 justify-center items-center text-center">
          <p className="text-[rgb(15,23,40)] text-6xl font-semibold">
            Khởi đầu sự nghiệp của bạn
          </p>
          <p className="text-[rgb(71,84,102)] text-xl">
            Nói lời tạm biệt với những phức tạp trong quá khứ và mở ra con đường
            thành công suôn sẻ hơn. Chào mừng đến với kỷ nguyên mới của sự đơn
            giản và hiệu quả.
          </p>
        </div>
        <div className="flex flex-row gap-6 w-full" id="Bottom">
          <Link
            href={'/'}
            id="contain-python"
            className="rounded-lg flex justify-center items-center p-10 w-full hover:bg-[rgb(198,197,250)] bg-slate-100 duration-300"
          >
            <p className="text-lg">Data Scientist</p>
          </Link>
          <Link
            href={'/'}
            id="contain-python"
            className="rounded-lg flex justify-center items-center p-10 w-full hover:bg-[rgb(198,197,250)] bg-slate-100 duration-300"
          >
            <p className="text-lg">Data Engineer</p>
          </Link>
          <Link
            href={'/'}
            id="contain-python"
            className="rounded-lg flex justify-center items-center p-10 w-full hover:bg-[rgb(198,197,250)] bg-slate-100 duration-300"
          >
            <p className="text-lg">Statistician</p>
          </Link>
          <Link
            href={'/'}
            id="contain-python"
            className="rounded-lg flex justify-center items-center p-10 w-full hover:bg-[rgb(198,197,250)] bg-slate-100 duration-300"
          >
            <p className="text-lg">Data/BI Analyst</p>
          </Link>
        </div>
      </div>

      <div className=" overflow-visible relative animate-slide-up" id="banner">
        <div className=" bg-gradient-to-t from-[#f7dbff] to-white ">
        <Image
          src={
            'https://framerusercontent.com/images/KBgv9fIO9WftiWWoYNmjOCTZ0.png'
          }
          alt="icon"
          width={250}
          height={250}
          className="object-cover absolute top-0 left-0 translate-y-2/3 z-0"
        />
          <div id="content-banner" className="flex flex-col justify-center items-center px-10 py-[120px] gap-[30px] relative z-10">
            <h2 className="text-5xl font-semibold">
              Đăng ký miễn phí ngay hôm nay
            </h2>
            <p className="">
              Hãy chúc mừng niềm vui khi đạt được thành quả bằng một ứng dụng
              được thiết kế để theo dõi sự tiến bộ của bạn và thúc đẩy nỗ lực
              của bạn.
            </p>
            <div className="flex gap-3">
              <Link
                href={'/contact'}
                className="bg-[rgb(87,85,254)] text-white hover:bg-opacity-70 duration-300 px-6 py-3 w-fit rounded-[10px] animate-slide-up"
              >
                Xem dịch vụ
              </Link>
              <Link
                href={'/privacy_policy'}
                className="flex items-center gap-2 group"
              >
                <p className="text-lg group-hover:text-[rgb(87,85,254)] group-hover:opacity-80 duration-300 hover:text">
                  Liên hệ
                </p>
                <MdNavigateNext className=" text-xl group-hover:text-[rgb(87,85,254)] group-hover:opacity-80 group-hover:translate-x-1 transition duration-300" />
              </Link>
            </div>
          </div>
          <Image
                src={
                  'https://framerusercontent.com/images/aVGhLHqpdOKuuyRiu68aVLRLL2k.png'
                }
                alt="icon"
                width={300}
                height={250}
                className="object-cover absolute bottom-0 right-0 transform -translate-y-1/3 z-0"
              />
        </div>
      </div>
    </div>
  );
};

export default AcademyPage;
