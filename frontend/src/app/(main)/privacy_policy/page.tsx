import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="px-20 pb-20 w-full animate-slide-up">
      <div className="flex flex-col justify-center items-center text-center gap-4 px-[120px] pb-[120px] pt-60">
        <h2 className="text-xl">01-01-2024</h2>
        <h1 className="text-7xl">Chính sách bảo mật</h1>
      </div>

      <div className="flex flex-col p-20">
        <div>
          <h3 className="text-xl font-semibold">Giới thiệu: </h3>
          <p className="mt-5 text-lg">
            Chào mừng bạn đến với{" "}
            <Link href={"/"} className="text-[rgb(87,85,254)]">
              MCNA
            </Link>
            . Chúng tôi cam kết bảo vệ quyền riêng tư của bạn và tuân thủ luật
            bảo vệ dữ liệu và quyền riêng tư hiện hành. Chính sách quyền riêng
            tư này mô tả cách chúng tôi thu thập, sử dụng, tiết lộ và bảo vệ
            thông tin cá nhân của bạn khi bạn sử dụng trang web của chúng tôi và
            mọi dịch vụ liên quan.
          </p>

          <h3 className="mt-10 text-xl font-semibold">
            Thông tin chúng tôi thu thập:
          </h3>
          <ul className="list-disc list-inside">
            <li className="mt-5 text-lg">
              <strong>Thông tin cá nhân:</strong> Chúng tôi có thể thu thập
              thông tin cá nhân như tên, địa chỉ email và chi tiết liên hệ của
              bạn khi bạn tự nguyện cung cấp thông tin đó cho chúng tôi.
            </li>
            <li className="mt-5 text-lg">
              <strong>Thông tin được thu thập tự động:</strong> Chúng tôi có thể
              tự động thu thập một số thông tin nhất định khi bạn truy cập Trang
              web của chúng tôi, bao gồm địa chỉ IP, loại trình duyệt và thông
              tin thiết bị của bạn.
            </li>
          </ul>

          <h3 className="mt-10 text-xl font-semibold">
            Cách chúng tôi sử dụng thông tin của bạn:{" "}
          </h3>
          <p className="mt-5 text-lg">
            Chúng tôi có thể sử dụng thông tin của bạn cho các mục đích như cung
            cấp và cải thiện dịch vụ của chúng tôi, liên lạc với bạn và tuân thủ
            các nghĩa vụ pháp lý.
          </p>

          <h3 className="mt-10 text-xl font-semibold">
            Chia sẻ thông tin của bạn:
          </h3>
          <p className="mt-5 text-lg">
            Chúng tôi có thể chia sẻ thông tin của bạn với các nhà cung cấp dịch
            vụ bên thứ ba, các chi nhánh hoặc theo yêu cầu của pháp luật.
          </p>

          <h3 className="mt-10 text-xl font-semibold">Bảo mật:</h3>
          <p className="mt-5 text-lg">
            Chúng tôi thực hiện các biện pháp hợp lý để bảo vệ thông tin của bạn
            khỏi bị truy cập, sử dụng hoặc tiết lộ trái phép.
          </p>

          <h3 className="mt-10 text-xl font-semibold">
            Những thay đổi đối với Chính sách này:
          </h3>
          <p className="mt-5 text-lg">
            Đôi khi, chúng tôi có thể cập nhật Chính sách quyền riêng tư này và
            mọi thay đổi sẽ được đăng trên trang này.
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
