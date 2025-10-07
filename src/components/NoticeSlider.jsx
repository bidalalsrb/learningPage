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
        <div className="relative flex items-center gap-4">
            <button
                ref={prevRef}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--toss-border)] bg-white text-lg text-[var(--toss-text-medium)] transition hover:border-[var(--toss-border-strong)] hover:text-[var(--toss-primary)]"
                aria-label="이전 사진"
            >
                &lsaquo;
            </button>

            <Swiper
                modules={[Navigation, Autoplay]}
                onSwiper={setSwiperInstance}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
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
                            className="surface-card flex h-64 cursor-pointer flex-col overflow-hidden rounded-3xl border border-[var(--toss-border)] transition hover:border-[var(--toss-border-strong)]"
                            onClick={() => navigate(`/photos/${photo.id}`)}
                        >
                            {photo.img && (
                                <img
                                    src={photo.img}
                                    alt={photo.title}
                                    className="h-36 w-full object-cover"
                                />
                            )}

                            <div className="flex flex-1 flex-col justify-between gap-3 px-6 py-5">
                                <div>
                                    <h3 className="line-clamp-1 text-lg font-semibold text-[var(--toss-text-strong)]">
                                        {photo.title}
                                    </h3>
                                    <p className="mt-1 line-clamp-2 text-sm text-[var(--toss-text-medium)]">
                                        {photo.desc}
                                    </p>
                                </div>
                                <div className="flex items-center justify-between text-xs text-[var(--toss-text-weak)]">
                                    <span>{photo.author}</span>
                                    <span>{photo.date}</span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <button
                ref={nextRef}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--toss-border)] bg-white text-lg text-[var(--toss-text-medium)] transition hover:border-[var(--toss-border-strong)] hover:text-[var(--toss-primary)]"
                aria-label="다음 사진"
            >
                &rsaquo;
            </button>
        </div>
    );
}
