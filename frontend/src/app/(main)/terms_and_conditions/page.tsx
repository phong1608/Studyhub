import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="px-20 pb-20 w-full animate-slide-up">
      <div className="flex flex-col justify-center items-center text-center gap-4 px-[120px] pb-[120px] pt-60">
        <h2 className="text-xl">01-01-2024</h2>
        <h1 className="text-7xl">Điều khoản & Điều kiện</h1>
      </div>

      <div className="flex flex-col px-20">
        <div>
          <h3 className="text-xl font-semibold">Chấp nhận các điều khoản: </h3>
          <p className="mt-5 text-lg">
            Bằng cách truy cập hoặc sử dụng trang web của chúng tôi, bạn đồng ý
            bị ràng buộc bởi các Điều khoản & Điều kiện này.
          </p>

          <h3 className="mt-10 text-xl font-semibold">Sử dụng trang web:</h3>
          <p className="mt-5 text-lg">
            Bạn chỉ có thể sử dụng trang web của chúng tôi cho các mục đích hợp
            pháp và đồng ý không vi phạm bất kỳ luật hoặc quy định hiện hành
            nào.
          </p>

          <h3 className="mt-10 text-xl font-semibold">Quyền sở hữu trí tuệ:</h3>
          <p className="mt-5 text-lg">
            Tất cả nội dung trên trang web của chúng tôi, bao gồm văn bản, đồ
            họa, logo và hình ảnh, là tài sản của{" "}
            <Link href="/" className="text-[rgb(87,85,254)]">
              MCNA
            </Link>{" "}
            và được bảo vệ bởi luật bản quyền.
          </p>

          <h3 className="mt-10 text-xl font-semibold">
            Giới hạn trách nhiệm pháp lý:
          </h3>
          <p className="mt-5 text-lg">
            Chúng tôi không chịu trách nhiệm về bất kỳ thiệt hại hoặc tổn thất
            nào phát sinh từ việc bạn sử dụng trang web của chúng tôi.
          </p>

          <h3 className="mt-10 text-xl font-semibold">Luật điều chỉnh:</h3>
          <p className="mt-5 text-lg">
            Các Điều khoản & Điều kiện này được điều chỉnh bởi luật pháp của
            Việt Nam.
          </p>

          <h3 className="mt-10 text-xl font-semibold">
            Liên hệ với chúng tôi:
          </h3>
          <p className="mt-5 text-lg">
            Nếu bạn có bất kỳ câu hỏi hoặc thắc mắc nào về chính sách của chúng
            tôi, vui lòng liên hệ với chúng tôi theo địa chỉ
            <Link
              href="mailto:nnson.mcna.247@gmail.com"
              className="text-[rgb(87,85,254)] p-1"
            >
              nnson.mcna.247@gmail.com
            </Link>{" "}
          </p>

          
        </div>
      </div>
    </div>
  );
};

export default page;
