"use client";

import { MinusIcon, PlusIcon } from "@/icons/icons";
import { useState } from "react";

// Định nghĩa kiểu dữ liệu câu hỏi FAQ
interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export default function FaqAccordion() {
  const [activeItem, setActiveItem] = useState<number | null>(1);

  // Danh sách câu hỏi thường gặp
  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: "Spa có soi da và tư vấn miễn phí không?",
      answer:
        "Có. Tất cả khách hàng đều được soi da và tư vấn miễn phí trước khi sử dụng dịch vụ. Chuyên viên sẽ phân tích tình trạng da, xác định nguyên nhân và xây dựng liệu trình phù hợp với từng khách hàng.",
    },
    {
      id: 2,
      question: "Điều trị mụn hoặc nám cần bao nhiêu buổi?",
      answer:
        "Số buổi điều trị phụ thuộc vào tình trạng da của từng khách hàng. Sau khi soi da, chuyên viên sẽ tư vấn lộ trình chi tiết, thời gian thực hiện và chi phí phù hợp để đạt hiệu quả tối ưu.",
    },
    {
      id: 3,
      question: "Mỹ phẩm tại spa có phải hàng chính hãng không?",
      answer:
        "Tất cả mỹ phẩm được phân phối tại spa đều là sản phẩm chính hãng, có nguồn gốc xuất xứ rõ ràng và được lựa chọn từ các thương hiệu uy tín nhằm đảm bảo an toàn và hiệu quả cho làn da.",
    },
    {
      id: 4,
      question: "Sau khi điều trị có cần sử dụng mỹ phẩm chăm sóc tại nhà không?",
      answer:
        "Có. Việc chăm sóc da tại nhà đóng vai trò quan trọng giúp duy trì hiệu quả điều trị, phục hồi làn da và hạn chế tình trạng tái phát. Chuyên viên sẽ tư vấn bộ sản phẩm phù hợp với từng loại da.",
    },
    {
      id: 5,
      question: "Làm thế nào để đặt lịch tư vấn hoặc điều trị?",
      answer:
        "Bạn có thể đặt lịch trực tiếp trên website, liên hệ qua hotline, Zalo hoặc Fanpage. Đội ngũ tư vấn sẽ xác nhận lịch hẹn và hỗ trợ lựa chọn khung giờ phù hợp nhất với bạn.",
    },
  ];

  const toggleItem = (itemId: number) => {
    setActiveItem(activeItem === itemId ? null : itemId);
  };

  return (
    <section id="faq" className="py-14 md:py-28 dark:bg-[#171f2e]">
      <div className="wrapper">
        <div className="max-w-2xl mx-auto mb-12 text-center">
          <h2 className="mb-3 font-bold text-center text-gray-800 dark:text-white/90 text-3xl md:text-title-lg">
            Câu Hỏi Thường Gặp
          </h2>

          <p className="max-w-2xl mx-auto leading-7 text-gray-500 dark:text-gray-400">
            Giải đáp những thắc mắc phổ biến về dịch vụ chăm sóc da, điều trị mụn,
            trị nám, thẩm mỹ và các dòng mỹ phẩm chính hãng tại spa.
          </p>
        </div>

        <div className="max-w-[600px] mx-auto">
          <div className="space-y-4">
            {faqItems.map((item) => (
              <FAQItemComponent
                key={item.id}
                item={item}
                isActive={activeItem === item.id}
                onToggle={() => toggleItem(item.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Thành phần hiển thị từng câu hỏi FAQ
function FAQItemComponent({
  item,
  isActive,
  onToggle,
}: {
  item: FAQItem;
  isActive: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="pb-5 border-b border-gray-200 dark:border-gray-800">
      <button
        type="button"
        className="flex items-center justify-between w-full text-left"
        onClick={onToggle}
        aria-expanded={isActive}
      >
        <span className="text-lg font-medium text-gray-800 dark:text-white/90">
          {item.question}
        </span>

        <span className="flex-shrink-0 ml-6">
          {isActive ? <MinusIcon /> : <PlusIcon />}
        </span>
      </button>

      {isActive && (
        <div className="mt-5">
          <p className="text-base leading-7 text-gray-500 dark:text-gray-400">
            {item.answer}
          </p>
        </div>
      )}
    </div>
  );
}