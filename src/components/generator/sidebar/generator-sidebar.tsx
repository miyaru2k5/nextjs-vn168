import Link from 'next/link';
import GeneratorSidebarNav from './generator-sidebar-nav';
import SidebarWidget from './sidebar-widget';

export default function GeneratorSidebar({
  sidebarOpen,
}: {
  sidebarOpen: boolean;
}) {
  return (
    <aside
      className={`max-lg:absolute inset-y-0 left-0 z-40 w-[288px] bg-white dark:bg-dark-primary border-r border-gray-100 dark:border-gray-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex-[1_1_0] flex flex-col justify-between overflow-y-auto custom-scrollbar">
          {/* Menu điều hướng AI */}
          <GeneratorSidebarNav />

          <div className="px-3 space-y-7 pb-6">
            <div className="px-2">
              <h2 className="text-xs font-medium text-gray-400 dark:text-gray-400 capitalize tracking-wider">
                Liên kết quan trọng
              </h2>

              <nav className="mt-5 space-y-1">
                {/* Cài đặt */}
                <Link
                  href="#"
                  className="flex items-center gap-2 px-3 py-2 hover:text-gray-800 dark:hover:text-white/90 text-sm font-medium rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.73832 3.04175L11.2653 3.04175C11.5338 3.04175 11.7517 3.25953 11.7517 3.52822C11.7517 5.05702 13.4067 6.01309 14.731 5.2485C14.9635 5.11424 15.2609 5.19392 15.3952 5.42647L16.6588 7.61517C16.7931 7.84785 16.7134 8.14539 16.4807 8.27974C15.1564 9.04434 15.1564 10.9558 16.4807 11.7204C16.7134 11.8548 16.7931 12.1523 16.6588 12.385L15.3951 14.5737C15.2609 14.8063 14.9635 14.8859 14.731 14.7517C13.4067 13.9871 11.7517 14.9432 11.7517 16.472C11.7517 16.7406 11.5338 16.9584 11.2653 16.9584H8.73831C8.46954 16.9584 8.25166 16.7405 8.25166 16.4718C8.25166 14.9423 6.59581 13.9868 5.27153 14.7514C5.03863 14.8858 4.74084 14.806 4.60646 14.5732L3.34312 12.3851C3.20877 12.1524 3.2885 11.8548 3.5212 11.7205C4.84555 10.9559 4.84552 9.04432 3.52119 8.27972C3.28848 8.14536 3.20875 7.8478 3.3431 7.61511L4.60643 5.42696C4.74082 5.19419 5.03861 5.11435 5.27152 5.24882C6.5958 6.0134 8.25166 5.05792 8.25166 3.52841C8.25166 3.25963 8.46954 3.04175 8.73832 3.04175Z"
                      fill="currentColor"
                    />
                  </svg>

                  Cài đặt
                </Link>

                {/* Trợ giúp & Câu hỏi thường gặp */}
                <Link
                  href="#"
                  className="flex items-center gap-2 px-3 py-2 hover:text-gray-800 dark:hover:text-white/90 text-sm font-medium rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.45827 10.0798C3.45827 6.46689 6.38708 3.53809 9.99994 3.53809C13.6128 3.53809 16.5416 6.46689 16.5416 10.0798C16.5416 13.6926 13.6128 16.6214 9.99994 16.6214H4.51893L5.37428 15.7661C5.51494 15.6254 5.59395 15.4347 5.59395 15.2357C5.59395 15.0368 5.51494 14.8461 5.37428 14.7054C4.18965 13.5208 3.45827 11.8864 3.45827 10.0798Z"
                      fill="currentColor"
                    />
                  </svg>

                  Trợ giúp & Hỏi đáp
                </Link>
              </nav>
            </div>

            {/* Thông tin người dùng và gói dịch vụ */}
            <SidebarWidget />
          </div>
        </div>
      </div>
    </aside>
  );
}