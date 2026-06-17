'use client';

import { useState } from 'react';
import GeneratorHeader from './generator-header';
import GeneratorSidebar from './sidebar/generator-sidebar';
import RightSidebar from './sidebar/chat-history-sidebar';

export default function GeneratorWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);

  // Bật/tắt thanh menu bên trái
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  // Bật/tắt lịch sử trò chuyện bên phải
  const toggleRightSidebar = () => {
    setRightSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <GeneratorHeader
        toggleSidebar={toggleSidebar}
        sidebarOpen={sidebarOpen}
        toggleRightSidebar={toggleRightSidebar}
      />

      <div className="isolate relative grid lg:grid-cols-[auto_1fr_auto] dark:bg-dark-secondary flex-[1_1_0]">
        {/* Thanh điều hướng bên trái */}
        <GeneratorSidebar sidebarOpen={sidebarOpen} />

        {/* Nội dung chính */}
        {children}

        {/* Thanh lịch sử trò chuyện bên phải */}
        <RightSidebar
          isOpen={rightSidebarOpen}
          toggleIsOpen={toggleRightSidebar}
        />

        {/* Lớp nền mờ khi mở menu bên trái */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-gray-800/80 backdrop-blur-lg transition-opacity"
            aria-hidden="true"
            onClick={toggleSidebar}
          />
        )}

        {/* Lớp nền mờ khi mở lịch sử trò chuyện trên thiết bị nhỏ */}
        {rightSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-gray-800/80 backdrop-blur-lg transition-opacity xl:hidden"
            aria-hidden="true"
            onClick={toggleRightSidebar}
          />
        )}
      </div>
    </div>
  );
}