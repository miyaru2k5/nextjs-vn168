import { Subheading } from '@/components/sections/hero-section/subheading';

export function CareersHero() {
  return (
    <section className="pt-16 pb-12 relative overflow-hidden dark:bg-[#171F2E]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary-500/10 rounded-full blur-3xl" />
      </div>
      <div className="wrapper relative z-10">
        <div className="max-w-[800px] mx-auto text-center">
          <Subheading text="Gia nhập đội ngũ AIStarterKit" />
          <h1 className="text-gray-700 font-bold mb-4 text-4xl sm:text-[50px] dark:text-white/90 sm:leading-[64px]">
            Cơ hội nghề nghiệp
          </h1>
          <p className="max-w-[537px] text-center mx-auto dark:text-gray-400 text-gray-500 text-base leading-relaxed">
            Khám phá các vị trí tuyển dụng phù hợp và đồng hành phát triển cùng
            chúng tôi.
          </p>
        </div>
      </div>
    </section>
  );
}
