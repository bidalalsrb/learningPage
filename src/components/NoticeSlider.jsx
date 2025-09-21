import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";

import photos from "../data/photos";

export default function NoticeSlider() {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [swiperInstance, setSwiperInstance] = useState(null);
    const navigate = useNavigate();

    // ✅ Swiper 초기화 후 버튼 연결
    useEffect(() => {
        if (swiperInstance && prevRef.current && nextRef.current) {
            swiperInstance.params.navigation.prevEl = prevRef.current;
            swiperInstance.params.navigation.nextEl = nextRef.current;
            swiperInstance.navigation.init();
            swiperInstance.navigation.update();
        }
    }, [swiperInstance]);

    return (
        <section className="px-6 md:px-12 py-16">
            {/* 제목 */}
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">사진</h2>
                <a href="/photos" className="text-sm text-blue-600 hover:underline">
                    More View +
                </a>
            </div>

            {/* 버튼 + 슬라이더 묶음 */}
            <div className="relative flex items-center gap-4">
                {/* 왼쪽 버튼 */}
                <button
                    ref={prevRef}
                    className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full shadow hover:bg-gray-200"
                >
                    &lt;
                </button>

                {/* 슬라이더 */}
                <Swiper
                    modules={[Navigation, Autoplay]}
                    onSwiper={setSwiperInstance} // ✅ Swiper 인스턴스 저장
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    spaceBetween={24}
                    slidesPerView={1}
                    breakpoints={{
                        1024: { slidesPerView: 4 },
                        768: { slidesPerView: 2 },
                    }}
                    className="flex-1"
                >
                    {photos.map((photo) => (
                        <SwiperSlide key={photo.id}>
                            <div
                                className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden flex flex-col h-64 cursor-pointer"
                                onClick={() => navigate(`/photos/${photo.id}`)} // ✅ 상세 이동
                            >
                                {/* 이미지 */}
                                {photo.img && (
                                    <img
                                        src={photo.img}
                                        alt={photo.title}
                                        className="w-full h-32 object-cover"
                                    />
                                )}

                                {/* 내용 */}
                                <div className="p-4 flex flex-col justify-between flex-1">
                                    <div>
                                        <h3 className="font-semibold text-gray-900 line-clamp-1">
                                            {photo.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                            {photo.desc}
                                        </p>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-3">{photo.date}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* 오른쪽 버튼 */}
                <button
                    ref={nextRef}
                    className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full shadow hover:bg-gray-200"
                >
                    &gt;
                </button>
            </div>
        </section>
    );
}
