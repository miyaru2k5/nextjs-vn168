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
      question: "Tôi có nhận được các bản cập nhật miễn phí không?",
      answer:
        "Có. Bạn sẽ nhận được các bản cập nhật tính năng, cải tiến hiệu suất và các bản sửa lỗi hoàn toàn miễn phí trong suốt thời gian sử dụng gói dịch vụ của mình.",
    },
    {
      id: 2,
      question: 'Số lượng "Dự án" được tính như thế nào?',
      answer:
        'Số lượng "Dự án" là tổng số không gian làm việc riêng biệt mà bạn có thể tạo và quản lý trong tài khoản của mình. Mỗi dự án có thể có cài đặt, thành viên và tài nguyên riêng.',
    },
    {
      id: 3,
      question: "Tôi có thể nâng cấp lên gói cao hơn không?",
      answer:
        "Có. Bạn có thể nâng cấp lên gói dịch vụ cao hơn bất kỳ lúc nào. Chi phí nâng cấp sẽ được tính theo phần chênh lệch còn lại của chu kỳ thanh toán hiện tại và các tính năng mới sẽ được kích hoạt ngay sau khi nâng cấp.",
    },
    {
      id: 4,
      question: '“Dự án không giới hạn” có nghĩa là gì?',
      answer:
        "Điều này có nghĩa là bạn có thể tạo bao nhiêu dự án tùy ý mà không bị giới hạn. Điều này giúp bạn quản lý công việc và nội dung một cách hiệu quả hơn mà không phải lo về giới hạn số lượng dự án.",
    },
    {
      id: 5,
      question: "Làm thế nào để thêm OpenAI API Key?",
      answer:
        'Để thêm OpenAI API Key, hãy truy cập phần Cài đặt tài khoản và chọn mục "API Key". Nhấn "Thêm API Key mới", dán khóa API OpenAI của bạn và lưu lại thay đổi. Khóa API sẽ được bảo mật và sử dụng cho tất cả các tính năng AI trong hệ thống.',
    },
  ];

  const toggleItem = (itemId: number) => {
    setActiveItem(activeItem === itemId ? null : itemId);
  };

  return (
    <section id="faq" className="py-14 md:py-28 dark:bg-[#171f2e]">
      <div className="wrapper">
        <div className="max-w-2xl mx-auto mb-12 text-center">
          <h2 className="mb-3 font-bold text-center text-gray-800 text-3xl dark:text-white/90 md:text-title-lg">
            Câu hỏi thường gặp
          </h2>

          <p className="max-w-md mx-auto leading-6 text-gray-500 dark:text-gray-400">
            Chúng tôi đã giải đáp các câu hỏi phổ biến nhất. Nếu bạn vẫn còn thắc mắc, vui lòng liên hệ với đội ngũ hỗ trợ của chúng tôi.
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