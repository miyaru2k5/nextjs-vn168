"use client";

import Image from "next/image";
import Link from "next/link";

export default function BenefitsGrid() {
  return (
    <section className="bg-gray-900 py-12 md:py-20">
      <div className="wrapper">
        <div className="max-w-2xl mx-auto mb-10 text-center">
          <h2 className="max-w-lg mx-auto mb-3 font-bold text-center text-white dark:text-white/90 text-3xl md:text-[42px] leading-tight">
            Lợi ích nổi bật khi sử dụng dịch vụ & mỹ phẩm tại Spa
          </h2>
          <p className="max-w-2xl mx-auto text-base font-normal leading-6 text-white/70">
            Mang đến vẻ đẹp rạng rỡ tự nhiên. Trải nghiệm liệu trình cao cấp và dòng mỹ phẩm organic chất lượng nhất.
          </p>
        </div>

        <div className="max-w-[1008px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Card lớn bên trái */}
            <div className="lg:col-span-6">
              <div className="relative flex flex-col justify-between bg-primary-500 rounded-[20px] p-8 md:p-10 overflow-hidden h-full">
                <div className="max-w-sm mb-8 md:mb-12 relative z-10">
                  <h3 className="font-bold text-white text-[26px] md:text-3xl mb-3">
                    Chăm sóc da chuyên sâu với mỹ phẩm organic
                  </h3>
                  <p className="text-base text-white/80">
                    Công thức thiên nhiên an toàn, giúp phục hồi và nuôi dưỡng làn da từ sâu bên trong.
                  </p>
                </div>

                <div className="relative flex-1 flex items-end">
                  {/* 3 ảnh decorative - ĐÃ ĐIỀU CHỈNH THẤP HƠN */}
                  <Image
                    src="/images/hero/shape-left-1.png"
                    alt=""
                    width={130}
                    height={90}
                    className="absolute left-8 top-[25%] floating-1 z-10"
                  />
                  <Image
                    src="/images/hero/shape-left-2.png"
                    alt=""
                    width={145}
                    height={95}
                    className="absolute right-20 top-[-8%] floating-2 z-10"
                  />
                  <Image
                    src="/images/hero/shape-right-1.png"
                    alt=""
                    width={135}
                    height={100}
                    className="absolute right-6 bottom-[75%] floating-3 z-10"
                  />

                  <Image
                    src="/images/benefits/bn-1.png"
                    className="w-full relative z-0 -mb-6 md:-mb-10"
                    alt="Chăm sóc da spa"
                    width={488}
                    height={288}
                    sizes="100vw"
                  />
                </div>
              </div>
            </div>

            {/* Card bên phải */}
            <div className="lg:col-span-6">
              <div className="benefits-bg rounded-[20px] p-8 md:p-10 overflow-hidden h-full flex flex-col">
                <div className="mb-6">
                  <Image
                    src="/images/benefits/bn-2.png"
                    alt="Thư giãn spa"
                    width={306}
                    height={279}
                  />
                </div>
                <div className="mt-auto">
                  <h3 className="font-bold max-w-xs text-white text-[26px] md:text-3xl mb-3">
                    Thư giãn sâu, tái tạo năng lượng
                  </h3>
                  <p className="text-base max-w-sm text-white/70">
                    Liệu trình massage và chăm sóc toàn thân giúp giảm stress, mang lại sự thư thái tuyệt đối.
                  </p>
                </div>
              </div>
            </div>

            {/* Card lớn phía dưới */}
            <div className="lg:col-span-12">
              <div className="lg:px-10 p-8 bg-[#2D0B70] lg:pb-6 lg:p-12 relative rounded-[20px] h-full lg:flex lg:flex-row justify-between bg-cover flex-col gap-6 overflow-hidden">
                <div className="max-w-sm relative z-10">
                  <h3 className="font-bold text-white text-[26px] md:text-3xl mb-3">
                    Làn da khỏe đẹp rạng ngời chỉ sau vài liệu trình
                  </h3>
                  <p className="text-base text-white/70 mb-6">
                    Kết hợp công nghệ hiện đại cùng tinh chất mỹ phẩm cao cấp, giúp cải thiện rõ rệt tình trạng da.
                  </p>
                  <Link
                    href="/dat-lich"
                    className="font-medium inline-block text-sm text-white rounded-full bg-primary-500 hover:bg-primary-600 transition py-3 px-8"
                  >
                    Đặt lịch trải nghiệm ngay
                  </Link>
                </div>

                <div className="lg:mt-0 mt-4 relative z-10">
                  <Image
                    src="/images/benefits/bn-3.png"
                    className="hidden lg:block"
                    alt="Liệu trình spa"
                    width={359}
                    height={318}
                  />
                </div>

                <Image
                  src="/images/benefits/blur-shape.png"
                  alt=""
                  className="h-full w-full -z-0 absolute top-0 right-0 object-cover"
                  width={399}
                  height={399}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}