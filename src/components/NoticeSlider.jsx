import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function NoticeSlider() {
    const notices = [
        { title: "10월30일~10월31일 MMPI 검사", desc: "다면적 인성검사 안내합니다...", date: "2025-09-12" },
        { title: "10월11일 자기돌봄 세션", desc: "사람과 마음 연구소에서 준비했습니다...", date: "2025-09-11" },
        { title: "9월25일 질환관리 워크샵", desc: "심리연구소에서 워크샵을 개최합니다...", date: "2025-09-10" },
        { title: "9월15일 스트레스 관리 특강", desc: "직장인을 위한 스트레스 관리 특강 안내...", date: "2025-09-08" },
        { title: "9월01일 조직관리 세미나", desc: "효율적인 조직 운영을 위한 세미나...", date: "2025-09-01" },
        { title: "8월28일 리더십 워크샵", desc: "리더십 개발을 위한 집중 교육...", date: "2025-08-28" },
        { title: "8월20일 팀빌딩 캠프", desc: "팀워크 강화를 위한 야외 캠프...", date: "2025-08-20" },
        { title: "8월10일 심리 상담 특강", desc: "심리적 안정과 성장을 위한 강의...", date: "2025-08-10" },
        { title: "7월30일 인재개발 포럼", desc: "최신 HRD 트렌드 공유...", date: "2025-07-30" },
        { title: "7월15일 스트레스 해소법", desc: "현대인을 위한 스트레스 해소 특강...", date: "2025-07-15" },
    ];

    return (
        <section className="px-6 md:px-12 py-16 bg-gray-50">
            {/* 제목 */}
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">사진</h2>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                    More View +
                </a>
            </div>

            {/* 슬라이더 */}
            <Swiper
                modules={[Navigation, Autoplay]}
                navigation
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                spaceBetween={24}
                slidesPerView={1}
                breakpoints={{
                    1024: { slidesPerView: 4 }, // 데스크탑
                }}
                className="pb-10"
            >
                {notices.map((notice, idx) => (
                    <SwiperSlide key={idx}>
                        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-5 h-44 flex flex-col justify-between">
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{notice.title}</h3>
                                <p className="text-sm text-gray-600 line-clamp-2">{notice.desc}</p>
                            </div>
                            <p className="text-xs text-gray-400 mt-3">{notice.date}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
