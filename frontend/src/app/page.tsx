'use client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import 'keen-slider/keen-slider.min.css';
import CardReview from '../components/CardReview';

const Home = () => {
  return (
    <div>
      <Header/>
      <div className="overflow-hidden bg-gradient-to-tr from-[rgb(8,50,189)] via-[rgb(189,204,255)] to-[rgb(235,239,255)] px-10 pt-[100px] pb-[90px]">
        {' '}
        {/* relative */}
        <Image
          src={
            'https://framerusercontent.com/images/CoAe1eW9S1x6kWgYfFZw038Bw.png'
          }
          alt="icon1"
          width={236}
          height={236}
          className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"
        />
        <div className="flex flex-row relative z-10">
          <div className="flex flex-col gap-2.5">
            <span className=" text-7xl text-left">
            Cùng bạn học tập và phát triển mỗi ngày.
            </span>
          
            

            <p className="my-10 text-lg font-sans text-white">
            Chinh phục tri thức, mở lối tương lai! • Tự tin đổi mới
            </p>
            <Link
              href={'/'}
              className="flex gap-1 items-center group transition-all duration-300 w-20"
            >
              <div className="group-hover:text-blue-500 duration-300 text-white">
                Khám phá
              </div>
              <FaArrowRight className="text-white group-hover:invisible transition duration-300 " />
            </Link>
          </div>

          <Image
            src={
              'https://framerusercontent.com/images/mS28QhWcSped7JSQ7vltnisa5c8.png'
            }
            alt="icon"
            width={500}
            height={250}
            className="animate-bounce [animation-duration:7s] rotate-180"
          />
        </div>
        
      </div>

     

      
    <div className="flex flex-col gap-[30px]  p-20" id="home-similar">
      <section className="text-center bg-gradient-to-r from-blue-500 to-blue-300 text-white py-16">
        <div className="flex justify-center items-center gap-8 text-xl font-bold">
          <div>
        <div className="text-4xl">250+</div>
        <span className="block text-white text-base mt-2">Khóa học</span>
          </div>
          <div className="w-14 h-0 origin-top-left rotate-90 outline outline-4 outline-offset-[-2px] outline-white"></div>

          <div>
        <div className="text-4xl">1000+</div>
        <span className="block text-white text-base mt-2">Giảng viên chuyên môn cao</span>
          </div>
          <div className="w-14 h-0 origin-top-left rotate-90 outline outline-4 outline-offset-[-2px] outline-white"></div>

          <div>
        <div className="text-4xl">15+</div>
        <span className="block text-white text-base mt-2">Đa dạng chủ đề</span>
          </div>
          <div className="w-14 h-0 origin-top-left rotate-90 outline outline-4 outline-offset-[-2px] outline-white"></div>

          <div>
        <div className="text-4xl">2400+</div>
        <span className="block text-white text-base mt-2">Học viên theo học</span>
          </div>
        </div>
      </section>
    <section className="p-10">
        <h2 className="text-2xl font-bold mb-10">Những danh mục nổi bật</h2>
        <div className="grid grid-cols-4 gap-6 mt-5">
            <div className="p-5 bg-white shadow rounded-lg text-center flex flex-col items-center">
              <Image alt='data-platform' src={'/Science.png'} height={50} width={50} className="mb-2" />
              <span className='text-xl font-bold'>Astrology</span>
            </div>
            <div className="p-5 bg-white shadow rounded-lg text-center flex flex-col items-center">
              <Image alt='data-platform' src={'/Development.png'} height={50} width={50} className="mb-2" />
              <span className='text-xl font-bold'>Lập trình</span>
            </div>
            <div className="p-5 bg-white shadow rounded-lg text-center flex flex-col items-center">
              <Image alt='data-platform' src={'/Bussiness.png'} height={50} width={50} className="mb-2" />
              <span className='text-xl font-bold'>Marketting</span>
            </div>
            <div className="p-5 bg-white shadow rounded-lg text-center flex flex-col items-center">
              <Image alt='data-platform' src={'/DataScience.png'} height={50} width={50} className="mb-2" />
              <span className='text-xl font-bold'>Khoa học dữ liệu</span>
            </div>
        </div>
    </section>
          
      </div>

      <div
        className="flex flex-col gap-[30px] px-10 pb-20 pt-0"
        id="home-similar"
      >
        <div className="flex flex-col gap-4 p-20">
          <h1 className="text-[50px]">Những gì khách hàng nghĩ về chúng tôi</h1>
        </div>

        <div>
          <section>
            {/* cho ul li hiển thị card review */}
            <CardReview />
          </section>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-20">
        <h2 className="font-medium text-xl ">Thông tin thêm về chúng tôi</h2>
        <h1 className="text-[50px]">Những thứ chúng tôi đã đạt được</h1>

        <div className="flex flex-row">
          <div className="p-8 gap-6">
            <div className="text-[50px] text-[rgb(87,85,254)]">7,000</div>
            <p className="text-lg">
              Hơn 7.000 cá nhân được đào tạo, với tỷ lệ hài lòng đặc biệt là
              4,9/5.
            </p>
          </div>

          <div className="p-8 gap-6">
            <div className="text-[50px] text-[rgb(87,85,254)]">200</div>
            <p className="text-lg">
              Tốc độ mạng: Trải nghiệm tốc độ mạng nhanh như chớp với đảm bảo
              thời gian hoạt động 99,9%, đảm bảo hiệu suất tối ưu cho các ứng
              dụng và dịch vụ dựa trên đám mây của bạn.
            </p>
          </div>

          <div className="p-8 gap-6">
            <div className="text-[50px] text-[rgb(87,85,254)]">30</div>
            <p className="text-lg">
              Triển khai các giải pháp kỹ thuật số mang tính chuyển đổi cho hơn
              20 doanh nghiệp trong các lĩnh vực như viễn thông (bao gồm 2 trong
              số 3 nhà cung cấp hàng đầu Việt Nam), ví điện tử, sản xuất và giáo
              dục. Một khách hàng viễn thông đã tăng doanh thu lên 50% trong
              vòng sáu tháng
            </p>
          </div>
        </div>
      </div>

      

      <div className="overflow-visible relative animate-slide-up bg-gradient-to-t from-[rgb(189,204,255)] to-white">
       
        <div className="relative z-10 flex flex-col gap-10 py-[120px] px-10 justify-center items-center text-center w-full bg-[radial-gradient(84.6% 67.10000000000001% at 50% 100%, #bdccff 0%, rgb(255, 255, 255) 100%)]">
          <h2 className="text-[46px] font-semibold">
            Chúng tôi giúp bạn nâng cao hoạt động kinh doanh dựa trên đám mây
            của mình.
          </h2>
          <Link
            href={'/contact'}
            className="flex gap-[6px] items-center group transition-all duration-300"
          >
            <div className="group-hover:text-[rgb(87,85,254)] duration-300 text-xl">
              Hãy liên lạc
            </div>
            <FaArrowRight className="w-5 h-5 group-hover:text-[rgb(87,85,254)] duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
        <Image
          src={
            'https://framerusercontent.com/images/F95XtBuIu9yRJpVFOQe6khYgo.png'
          }
          alt="icon"
          width={300}
          height={250}
          className="object-cover absolute top-0 right-0 transform -translate-y-1/2 z-0"
        />
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
