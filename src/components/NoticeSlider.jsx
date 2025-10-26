import React, { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";

import photos from "../data/photos";
import api from "../utils/api.js";
import { buildSamplePhotoList, normalizePhotoPost } from "../utils/photo.js";

// NoticeSlider 컴포넌트는 사진 데이터를 슬라이드 형태로 보여주고 탐색 버튼을 제어합니다.
export default function NoticeSlider() {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [swiperInstance, setSwiperInstance] = useState(null);
    const [slides, setSlides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const sampleSlides = useMemo(() => buildSamplePhotoList(photos), []);

    // fetchSlides 함수는 최신 사진 게시물을 불러오고 없으면 샘플 데이터를 보여줍니다.
    const fetchSlides = useCallback(async () => {
        setLoading(true);
        try {
            const res = await api.get("/api/photo-posts");
            const list = Array.isArray(res.data) ? res.data : [];
            if (list.length === 0) {
                setSlides(sampleSlides.slice(0, 8));
                setError("등록된 사진이 아직 없어 샘플 이미지가 표시됩니다.");
            } else {
                const normalized = list.map((post, idx) => normalizePhotoPost(post, idx));
                normalized.sort((a, b) => b.createdAt - a.createdAt);
                setSlides(normalized.slice(0, 8));
                setError("");
            }
        } catch (err) {
            console.error("최근 교육 스냅샷 불러오기 실패:", err);
            setSlides(sampleSlides.slice(0, 8));
            setError("사진을 불러오지 못해 샘플 이미지가 표시됩니다.");
        } finally {
            setLoading(false);
        }
    }, [sampleSlides]);

    useEffect(() => {
        fetchSlides();
    }, [fetchSlides]);

    // ✅ Swiper 초기화 후 버튼 연결
    // useEffect 훅은 Swiper 인스턴스가 준비되면 커스텀 네비게이션 버튼을 연결합니다.
    useEffect(() => {
        if (swiperInstance && prevRef.current && nextRef.current) {
            swiperInstance.params.navigation.prevEl = prevRef.current;
            swiperInstance.params.navigation.nextEl = nextRef.current;
            swiperInstance.navigation.init();
            swiperInstance.navigation.update();
        }
    }, [swiperInstance]);

    const content = loading ? (
        <div className="flex h-64 w-full flex-col items-center justify-center rounded-3xl border border-dashed border-[var(--toss-border)] bg-white/70 text-sm text-[var(--toss-text-medium)]">
            최근 교육 스냅샷을 불러오는 중입니다...
        </div>
    ) : (
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
                {slides.map((photo) => (
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

    return (
        <div className="space-y-3">
            {error && !loading && (
                <p className="text-xs text-[var(--toss-text-weak)]">{error}</p>
            )}
            {content}
        </div>
    );
}
