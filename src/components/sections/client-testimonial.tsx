"use client";

import Image from 'next/image';
import { useState } from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Trần Minh Quân',
    company: 'Hà Nội',
    image: '/images/users/user-1.png',
    testimonial:
      'Sau 2 tháng điều trị mụn theo liệu trình của spa, làn da của tôi cải thiện rõ rệt. Da sạch mụn, ít thâm và khỏe hơn rất nhiều. Đội ngũ tư vấn rất tận tâm.',
  },
  {
    id: 2,
    name: 'Nguyễn Thị Lan Anh',
    company: 'TP. Hồ Chí Minh',
    image: '/images/users/user-2.png',
    testimonial:
      'Tôi rất hài lòng với dịch vụ chăm sóc da và các sản phẩm mỹ phẩm chính hãng của spa. Da luôn mềm mịn, đủ ẩm và sáng khỏe sau mỗi liệu trình.',
  },
  {
    id: 3,
    name: 'Lê Hoàng Việt',
    company: 'Đà Nẵng',
    image: '/images/users/user-3.png',
    testimonial:
      'Liệu trình điều trị sẹo được tư vấn rất chi tiết. Sau vài buổi, bề mặt da cải thiện đáng kể và tôi tự tin hơn khi giao tiếp.',
  },
  {
    id: 4,
    name: 'Phạm Thị Hương',
    company: 'Cần Thơ',
    image: '/images/users/user-4.png',
    testimonial:
      'Spa sử dụng công nghệ hiện đại cùng mỹ phẩm chất lượng cao. Nhân viên luôn nhiệt tình theo dõi tình trạng da của tôi trong suốt quá trình điều trị.',
  },
  {
    id: 5,
    name: 'Đặng Minh Tuấn',
    company: 'Hải Phòng',
    image: '/images/users/user-1.png',
    testimonial:
      'Tôi đã thử nhiều nơi nhưng chỉ tại đây tình trạng nám được cải thiện rõ rệt. Không gian sang trọng, dịch vụ chuyên nghiệp và rất đáng tin cậy.',
  },
  {
    id: 6,
    name: 'Vũ Thị Ngọc Anh',
    company: 'Huế',
    image: '/images/users/user-2.png',
    testimonial:
      'Sau khi được soi da miễn phí, tôi được tư vấn đúng sản phẩm phù hợp. Da khỏe hơn từng ngày và không còn bị kích ứng như trước.',
  },
  {
    id: 7,
    name: 'Hoàng Văn Nam',
    company: 'Nha Trang',
    image: '/images/users/user-1.png',
    testimonial:
      'Dịch vụ trẻ hóa da mang lại hiệu quả vượt mong đợi. Làn da săn chắc, đều màu hơn và tôi nhận được rất nhiều lời khen từ bạn bè.',
  },
  {
    id: 8,
    name: 'Trần Thị Mai',
    company: 'Bình Dương',
    image: '/images/users/user-2.png',
    testimonial:
      'Mỹ phẩm tại spa đều có nguồn gốc rõ ràng. Tôi rất yên tâm sử dụng và tiếp tục đồng hành cùng spa trong thời gian dài.',
  },
  {
    id: 9,
    name: 'Lý Quốc Bảo',
    company: 'Đồng Nai',
    image: '/images/users/user-3.png',
    testimonial:
      'Đội ngũ kỹ thuật viên chuyên nghiệp, chăm sóc khách hàng chu đáo. Tôi sẽ giới thiệu spa cho người thân và bạn bè của mình.',
  },
];

export default function TestimonialsSection() {
  const [showAll, setShowAll] = useState(false);

  const visibleTestimonials = showAll
    ? testimonials
    : testimonials.slice(0, 6);

  return (
    <section className="md:py-28 py-14 relative overflow-hidden">
      <div className="wrapper max-w-7xl mx-auto px-4">
        <div className="max-w-2xl mx-auto mb-12 text-center">
          <h2 className="mb-3 font-bold text-center text-gray-800 text-3xl dark:text-white/90 md:text-title-lg">
            Khách hàng nói gì về Spa của chúng tôi
          </h2>
          <p className="max-w-xl mx-auto leading-6 text-gray-500 dark:text-gray-400">
            Hơn hàng nghìn khách hàng trên khắp Việt Nam đã tin tưởng lựa chọn dịch vụ
            chăm sóc da, điều trị mụn, trị nám, trẻ hóa và mỹ phẩm chính hãng tại spa.
            Sự hài lòng của khách hàng chính là động lực để chúng tôi không ngừng nâng
            cao chất lượng dịch vụ.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 max-w-[72rem] mx-auto">
          {visibleTestimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
            />
          ))}
        </div>

        {/* Show More Button */}
        <div className="mt-12 text-center relative z-10">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 px-8 py-3.5 text-sm font-medium text-gray-800 bg-white border border-gray-200 dark:hover:bg-gray-900 rounded-full shadow-theme-xs hover:bg-gray-50 focus:outline-none transition-all duration-200 hover:scale-105"
          >
            <span>{showAll ? 'Thu gọn đánh giá' : 'Xem thêm cảm nhận khách hàng'}</span>
            <span className="ml-2 transition-transform duration-200">
              {showAll ? '↑' : '↓'}
            </span>
          </button>
        </div>
      </div>

      {/* Gradient overlay when collapsed */}
      {!showAll && (
        <div className="white-gradient h-[280px] w-full absolute bottom-0 pointer-events-none"></div>
      )}
    </section>
  );
}

// Testimonial Card Component
function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[number];
}) {
  return (
    <div className="group p-2 bg-gray-50 dark:bg-white/5 dark:border-gray-800 border rounded-[20px] border-gray-100 hover:border-primary-200 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center p-5 mb-4 bg-white/90 dark:bg-white/[0.03] rounded-2xl">
        <div className="mr-4 flex-shrink-0">
          <Image
            src={testimonial.image || '/placeholder.svg'}
            alt={testimonial.name}
            width={56}
            height={56}
            className="size-14 object-cover ring-2 ring-white dark:ring-gray-700 rounded-full drop-shadow-[0_8px_20px_rgba(0,0,0,0.08)] group-hover:ring-primary-200 transition"
          />
        </div>
        <div>
          <h3 className="text-gray-800 font-semibold dark:text-white/90 text-lg">
            {testimonial.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            {testimonial.company}
          </p>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-white/90 dark:bg-white/[0.03]">
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-400">
          {testimonial.testimonial}
        </p>
      </div>
    </div>
  );
}