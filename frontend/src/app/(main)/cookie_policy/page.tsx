import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="px-20 pb-20 w-full animate-slide-up">
      <div className="flex flex-col justify-center items-center text-center gap-4 px-[120px] pb-[120px] pt-60">
        <h2 className="text-xl">01-01-2024</h2>
        <h1 className="text-7xl">Chính sách Cookie</h1>
      </div>

      <div className="flex flex-col px-20">
        <div>
          <h3 className="text-xl font-semibold">Cookies là gì: </h3>
          <p className="mt-5 text-lg">
            Cookies là các tệp văn bản nhỏ được lưu trữ trên thiết bị của bạn
            (máy tính, điện thoại thông minh, máy tính bảng) khi bạn truy cập
            một trang web. Chúng phục vụ nhiều mục đích khác nhau, bao gồm cải
            thiện trải nghiệm duyệt web, ghi nhớ các tùy chọn của bạn và giúp
            các trang web hoạt động hiệu quả hơn.
          </p>

          <h3 className="mt-10 text-xl font-semibold">
            Cách chúng tôi sử dụng Cookies:
          </h3>
          <p className="mt-5 text-lg">
            Chúng tôi sử dụng cookies trên trang web của mình cho một số mục
            đích:
          </p>
          <ul className="list-disc list-inside">
            <li className="mt-5 text-lg">
              <strong>Cookies thiết yếu:</strong> Những cookies này cần thiết để
              trang web hoạt động bình thường. Chúng kích hoạt các chức năng cơ
              bản như điều hướng trang và truy cập vào các khu vực an toàn của
              trang web.
            </li>
            <li className="mt-5 text-lg">
              <strong>Cookies phân tích:</strong> Những cookies này giúp chúng
              tôi hiểu cách khách truy cập tương tác với trang web của chúng tôi
              bằng cách thu thập và báo cáo thông tin ẩn danh. Chúng tôi sử dụng
              dữ liệu này để phân tích mô hình lưu lượng truy cập, xác định các
              trang phổ biến và cải thiện hiệu suất trang web của chúng tôi.
            </li>
            <li className="mt-5 text-lg">
              <strong>Cookies quảng cáo:</strong> Chúng tôi có thể sử dụng
              cookies quảng cáo để gửi quảng cáo có liên quan đến bạn dựa trên
              hành vi và sở thích duyệt web của bạn. Những cookies này có thể
              theo dõi các lượt truy cập của bạn vào các trang web khác và cung
              cấp cho nhà quảng cáo thông tin để hiển thị quảng cáo được nhắm
              mục tiêu.
            </li>
          </ul>

          <h3 className="mt-10 text-xl font-semibold">
            Lựa chọn Cookies của bạn:
          </h3>
          <p className="mt-5 text-lg">
            Bạn có tùy chọn chấp nhận hoặc từ chối cookie khi truy cập trang web
            của chúng tôi. Hầu hết các trình duyệt web tự động chấp nhận cookie,
            nhưng bạn thường có thể sửa đổi cài đặt trình duyệt của mình để từ
            chối cookie nếu muốn. Tuy nhiên, xin lưu ý rằng việc tắt cookie có
            thể ảnh hưởng đến trải nghiệm duyệt web của bạn và hạn chế chức năng
            của một số phần nhất định trên trang web.
          </p>

          <h3 className="mt-10 text-xl font-semibold">
            Cookies của bên thứ ba:
          </h3>
          <p className="mt-5 text-lg">
            Một số dịch vụ của bên thứ ba mà chúng tôi sử dụng trên trang web
            của mình, chẳng hạn như Google Analytics, cũng có thể đặt cookie
            trên thiết bị của bạn để thu thập thông tin cho mục đích phân tích
            và quảng cáo. Các cookies của bên thứ ba này phải tuân theo chính
            sách bảo mật tương ứng của nhà cung cấp.
          </p>

          <h3 className="mt-10 text-xl font-semibold">
            Đồng ý sử dụng Cookie:{" "}
          </h3>
          <p className="mt-5 text-lg">
            Bằng cách tiếp tục sử dụng trang web của chúng tôi, bạn đồng ý với
            việc sử dụng cookie như được mô tả trong Chính sách cookie này. Nếu
            bạn không đồng ý với việc sử dụng cookie, bạn nên điều chỉnh cài đặt
            trình duyệt của mình hoặc không sử dụng trang web của chúng tôi.
          </p>

          <h3 className="mt-10 text-xl font-semibold">
            Cập nhật chính sách Cookie:
          </h3>
          <p className="mt-5 text-lg">
            Đôi khi, chúng tôi có thể cập nhật Chính sách cookie này để phản ánh
            những thay đổi trong thực tiễn của chúng tôi hoặc luật hiện hành.
            Mọi cập nhật sẽ được đăng trên trang này và chúng tôi khuyến khích
            bạn xem lại chính sách này định kỳ để biết thông tin mới nhất.
          </p>

          <h3 className="mt-10 text-xl font-semibold">
            Liên hệ với chúng tôi:
          </h3>
          <p className="mt-5 text-lg">
            Nếu bạn có bất kỳ câu hỏi hoặc thắc mắc nào về Chính sách cookie của
            chúng tôi, vui lòng liên hệ với chúng tôi theo địa chỉ
            <Link
              href="mailto:nnson.mcna.247@gmail.com"
              className="text-[rgb(87,85,254)] p-1"
            >
              nnson.mcna.247@gmail.com
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
