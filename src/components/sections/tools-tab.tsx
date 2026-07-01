'use client';

import type React from 'react';
import { Fragment, useState } from 'react';

import Image from 'next/image';

import {
  ScanFace,
  ShieldCheck,
  Sun,
  WandSparkles,
  Gem,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Define the tab type
interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
  lightImage: string;
  darkImage: string;
  title: string;
  description: string;
  iconColor: string;        // Màu active
  iconColorInactive: string; // Màu inactive
}

export default function AIToolsTabs() {
  const [activeTab, setActiveTab] = useState('scan');

  // Tab data
  const tabs: Tab[] = [
    {
      id: 'scan',
      label: 'Soi da',
      icon: <ScanFace className="w-6 h-6" strokeWidth={2.5} />,
      lightImage: '/images/tab-image/tab-image-1.jpg',
      darkImage: '/images/tab-image/tab-image-1-dark.jpg',
      title: 'Khám & Soi Da Chuyên Sâu',
      description:
        'Phân tích chính xác tình trạng da bằng công nghệ soi da hiện đại, đánh giá mụn, sắc tố, độ ẩm và xây dựng liệu trình chăm sóc phù hợp với từng khách hàng.',
      iconColor: 'text-sky-500 dark:text-sky-400',
      iconColorInactive: 'text-gray-400 dark:text-gray-500',
    },
    {
      id: 'acne',
      label: 'Trị mụn',
      icon: <ShieldCheck className="w-6 h-6" strokeWidth={2.5} />,
      lightImage: '/images/tab-image/tab-image-2.jpg',
      darkImage: '/images/tab-image/tab-image-2-dark.jpg',
      title: 'Điều Trị Mụn Chuẩn Y Khoa',
      description:
        'Làm sạch sâu, loại bỏ nhân mụn, giảm viêm và kiểm soát bã nhờn bằng công nghệ hiện đại kết hợp mỹ phẩm chuyên sâu, giúp hạn chế mụn tái phát.',
      iconColor: 'text-emerald-500 dark:text-emerald-400',
      iconColorInactive: 'text-gray-400 dark:text-gray-500',
    },
    {
      id: 'whitening',
      label: 'Làm trắng',
      icon: <Sun className="w-6 h-6" strokeWidth={2.5} />,
      lightImage: '/images/tab-image/tab-image-3.jpg',
      darkImage: '/images/tab-image/tab-image-3-dark.jpg',
      title: 'Phục Hồi & Làm Trắng Da',
      description:
        'Cấp ẩm, phục hồi hàng rào bảo vệ da, cải thiện thâm sau mụn và mang lại làn da sáng khỏe, đều màu với các liệu trình an toàn.',
      iconColor: 'text-amber-500 dark:text-amber-400',
      iconColorInactive: 'text-gray-400 dark:text-gray-500',
    },
    {
      id: 'scar',
      label: 'Trị sẹo',
      icon: <WandSparkles className="w-6 h-6" strokeWidth={2.5} />,
      lightImage: '/images/tab-image/tab-image-4.jpg',
      darkImage: '/images/tab-image/tab-image-4-dark.jpg',
      title: 'Điều Trị Sẹo Chuyên Sâu',
      description:
        'Cải thiện sẹo rỗ, sẹo lõm và kích thích tăng sinh collagen bằng các công nghệ tiên tiến, giúp làn da mịn màng và săn chắc hơn.',
      iconColor: 'text-violet-500 dark:text-violet-400',
      iconColorInactive: 'text-gray-400 dark:text-gray-500',
    },
    {
      id: 'beauty',
      label: 'Thẩm mỹ',
      icon: <Gem className="w-6 h-6" strokeWidth={2.5} />,
      lightImage: '/images/tab-image/tab-image-5.jpg',
      darkImage: '/images/tab-image/tab-image-5-dark.jpg',
      title: 'Trị Nám & Thẩm Mỹ Da',
      description:
        'Điều trị nám, tàn nhang, trẻ hóa làn da và duy trì vẻ đẹp lâu dài với công nghệ hiện đại cùng mỹ phẩm chính hãng cao cấp.',
      iconColor: 'text-pink-500 dark:text-pink-400',
      iconColorInactive: 'text-gray-400 dark:text-gray-500',
    },
  ];

  // Find the active tab
  const currentTab = tabs.find((tab) => tab.id === activeTab) || tabs[0];

  return (
    <section className="py-14 md:py-28 dark:bg-dark-primary">
      <div className="wrapper">
        <div className="max-w-2xl mx-auto mb-12 text-center">
          <h2 className="mb-3 font-bold text-center text-gray-800 dark:text-white/90 text-3xl md:text-title-lg">
            Hành Trình Chăm Sóc Da Toàn Diện
          </h2>

          <p className="max-w-2xl mx-auto leading-6 text-gray-500 dark:text-gray-400">
            Đồng hành cùng bạn từ bước soi da chuyên sâu, điều trị mụn, phục hồi,
            làm trắng, điều trị sẹo, trị nám đến chăm sóc thẩm mỹ, mang lại làn da
            khỏe đẹp và rạng rỡ theo thời gian.
          </p>
        </div>

        <div className="max-w-[1008px] mx-auto">
          <div>
            {/* Tab Navigation */}
            <div className="overflow-x-auto custom-scrollbar mx-auto max-w-fit relative">
              <div className="flex gap-2 min-w-max rounded-full bg-gray-100 dark:bg-white/5 p-1">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center h-12 gap-2 px-4 py-3 text-sm font-medium transition-all duration-200 rounded-full ${
                        isActive
                          ? 'bg-white dark:bg-white/10 text-gray-800 dark:text-white shadow-sm'
                          : 'text-gray-500 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-white/5'
                      }`}
                    >
                      <span
                        className={cn(
                          isActive ? tab.iconColor : tab.iconColorInactive
                        )}
                      >
                        {tab.icon}
                      </span>
                      <span className="truncate">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6 tab-img-bg overflow-hidden rounded-4xl mt-8">
              <div className="p-3 tab-img-overlay">
                {tabs.map((tab) => (
                  <Fragment key={tab.id}>
                    <Image
                      src={tab.lightImage || '/placeholder.svg'}
                      alt={tab.label}
                      width={936}
                      height={535}
                      className={cn(
                        'w-full rounded-2xl block dark:hidden',
                        currentTab.id !== tab.id && 'hidden!'
                      )}
                      quality={90}
                      priority
                    />

                    <Image
                      src={tab.darkImage || '/placeholder.svg'}
                      alt={tab.label}
                      width={936}
                      height={535}
                      className={cn(
                        'w-full rounded-2xl hidden dark:block',
                        currentTab.id !== tab.id && 'hidden!'
                      )}
                      quality={90}
                      priority
                    />
                  </Fragment>
                ))}
              </div>
            </div>

            {/* Bottom Section */}
            <div className="mt-6 text-center">
              <h2 className="mb-2 text-xl font-bold text-gray-800 dark:text-white/90">
                {currentTab.title}
              </h2>
              <p className="max-w-xl mx-auto mb-6 text-sm text-gray-500 dark:text-gray-400">
                {currentTab.description}
              </p>
              <button className="px-6 py-3 text-sm font-medium text-white transition-colors rounded-full bg-primary-500 hover:bg-primary-600">
                Đặt lịch tư vấn miễn phí
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}