'use client';

import type React from 'react';
import { Fragment, useState } from 'react';

import {
  CodeGeneratorIcon,
  EmailGeneratorIcon,
  ImageGeneratorIcon,
  TextGeneratorIcon,
  VideoGeneratorIcon,
} from '@/icons/icons';
import Image from 'next/image';
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
}

export default function AIToolsTabs() {
  const [activeTab, setActiveTab] = useState('text');

  // Tab data
  const tabs: Tab[] = [
    {
      id: 'text',
      label: 'Tạo văn bản',
      icon: <TextGeneratorIcon className="w-8 h-8" />,
      lightImage: '/images/tab-image/tab-image-1.jpg',
      darkImage: '/images/tab-image/tab-image-1-dark.jpg',
      title: 'Cách dễ nhất để tạo văn bản',
      description:
        'Khai phá tiềm năng đổi mới. Khám phá các công cụ AI tiên tiến biến ý tưởng của bạn thành hiện thực với độ chính xác và trí tuệ vượt trội.',
    },
    {
      id: 'image',
      label: 'Tạo hình ảnh',
      icon: <ImageGeneratorIcon className="w-8 h-8" />,
      lightImage: '/images/tab-image/tab-image-2.jpg',
      darkImage: '/images/tab-image/tab-image-2-dark.jpg',
      title: 'Tạo hình ảnh ấn tượng với AI',
      description:
        'Khai phá tiềm năng đổi mới. Khám phá các công cụ AI tiên tiến biến ý tưởng của bạn thành hiện thực với độ chính xác và trí tuệ vượt trội.',
    },
    {
      id: 'code',
      label: 'Tạo mã nguồn',
      icon: <CodeGeneratorIcon className="w-8 h-8" />,
      lightImage: '/images/tab-image/tab-image-3.jpg',
      darkImage: '/images/tab-image/tab-image-3-dark.jpg',
      title: 'Tạo mã nguồn bằng mọi ngôn ngữ',
      description:
        'Khai phá tiềm năng đổi mới. Khám phá các công cụ AI tiên tiến biến ý tưởng của bạn thành hiện thực với độ chính xác và trí tuệ vượt trội.',
    },
    {
      id: 'video',
      label: 'Tạo video',
      icon: <VideoGeneratorIcon className="w-8 h-8" />,
      lightImage: '/images/tab-image/tab-image-4.jpg',
      darkImage: '/images/tab-image/tab-image-4-dark.jpg',
      title: 'Tạo video hấp dẫn với AI',
      description:
        'Khai phá tiềm năng đổi mới. Khám phá các công cụ AI tiên tiến biến ý tưởng của bạn thành hiện thực với độ chính xác và trí tuệ vượt trội.',
    },
    {
      id: 'email',
      label: 'Tạo email',
      icon: <EmailGeneratorIcon className="w-8 h-8" />,
      lightImage: '/images/tab-image/tab-image-5.jpg',
      darkImage: '/images/tab-image/tab-image-5-dark.jpg',
      title: 'Viết email chuyên nghiệp tức thì',
      description:
        'Khai phá tiềm năng đổi mới. Khám phá các công cụ AI tiên tiến biến ý tưởng của bạn thành hiện thực với độ chính xác và trí tuệ vượt trội.',
    },
  ];

  // Find the active tab
  const currentTab = tabs.find((tab) => tab.id === activeTab) || tabs[0];

  return (
    <section className="py-14 md:py-28 dark:bg-dark-primary">
      <div className="wrapper">
        <div className="max-w-2xl mx-auto mb-12 text-center">
          <h2 className="mb-3 font-bold text-center text-gray-800 dark:text-white/90 text-3xl md:text-title-lg">
            Mọi công cụ AI bạn cần, ngay trong tầm tay.
          </h2>
          <p className="max-w-2xl mx-auto leading-6 text-gray-500 dark:text-gray-400">
            Khai phá tiềm năng đổi mới, khám phá các công cụ AI tiên tiến
            biến ý tưởng của bạn thành hiện thực với độ chính xác và trí tuệ vượt trội.
          </p>
        </div>

        <div className="max-w-[1008px] mx-auto">
          <div>
            {/* Tab Navigation */}
            <div className="overflow-x-auto custom-scrollbar mx-auto max-w-fit relative">
              <div className="flex gap-2 min-w-max rounded-full bg-gray-100 dark:bg-white/5 p-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center h-12 gap-2 px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-full ${
                      activeTab === tab.id
                        ? 'bg-white dark:text-white/90 dark:bg-white/10 text-gray-800'
                        : 'text-gray-500 dark:text-gray-400 bg-transparent'
                    }`}
                  >
                    {tab.icon}
                    <span className="truncate">{tab.label}</span>
                  </button>
                ))}
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
                Dùng thử miễn phí ngay
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
