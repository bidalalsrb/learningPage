import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb.jsx";
import api from "../utils/api.js";
import photos from "../data/photos";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { buildSamplePhotoList, normalizePhotoPost } from "../utils/photo.js";

const samplePhotos = buildSamplePhotoList(photos);

// PhotoDetail 컴포넌트는 단일 사진 게시글의 상세 내용을 보여줍니다.
export default function PhotoDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [swiperInstance, setSwiperInstance] = useState(null);
    const isAdmin = useMemo(() => {
        if (typeof window === "undefined") return false;
        return Boolean(localStorage.getItem("ACCESS_TOKEN"));
    }, []);
    const breadcrumbItems = useMemo(() => {
        const items = [
            { label: "홈", to: "/index" },
            { label: "사진 아카이브", to: "/photos" },
        ];
        if (photo?.title) {
            items.push({ label: photo.title });
        } else {
            items.push({ label: "상세 보기" });
        }
        return items;
    }, [photo?.title]);

    const fallbackPhoto = useMemo(
        () => samplePhotos.find((item) => String(item.id) === String(id)) || null,
        [id]
    );

    // fetchPhoto 함수는 선택한 게시글을 불러오거나 실패 시 샘플 데이터를 사용합니다.
    const fetchPhoto = useCallback(async () => {
        setLoading(true);
        try {
            const res = await api.get(`/api/photo-posts/${id}`);
            setPhoto(normalizePhotoPost(res.data));
            setError("");
        } catch (err) {
            console.error("사진 상세 불러오기 실패:", err);
            if (fallbackPhoto) {
                setPhoto(fallbackPhoto);
                setError("네트워크 오류로 샘플 데이터가 표시됩니다.");
            } else {
                setPhoto(null);
                setError("게시글을 찾을 수 없습니다.");
            }
        } finally {
            setLoading(false);
        }
    }, [fallbackPhoto, id]);

    useEffect(() => {
        fetchPhoto();
    }, [fetchPhoto]);

    useEffect(() => {
        if (swiperInstance && prevRef.current && nextRef.current) {
            swiperInstance.params.navigation.prevEl = prevRef.current;
            swiperInstance.params.navigation.nextEl = nextRef.current;
            swiperInstance.navigation.init();
            swiperInstance.navigation.update();
        }
    }, [swiperInstance]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <Breadcrumb items={breadcrumbItems} />
                <main className="flex flex-1 items-center justify-center px-6">
                    <div className="rounded-3xl border border-[var(--toss-border)] bg-white/80 px-8 py-12 text-center text-sm text-[var(--toss-text-medium)]">
                        데이터를 불러오는 중입니다...
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (!photo) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <Breadcrumb items={breadcrumbItems} />
                <main className="flex flex-1 items-center justify-center px-6">
                    <div className="rounded-3xl border border-[var(--toss-border)] bg-white/80 px-8 py-12 text-center text-sm text-[var(--toss-text-medium)]">
                        {error || "게시글을 찾을 수 없습니다."}
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    const primaryImage = photo.images?.[0]?.url;

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <Breadcrumb items={breadcrumbItems} />

            <main className="flex-1 px-6 py-12">
                <div className="toss-container space-y-10">
                    <div className="rounded-[32px] border border-[var(--toss-border)] bg-white/90 p-10 shadow-[0_24px_60px_rgba(19,32,46,0.1)] backdrop-blur">
                        <div className="flex flex-col gap-5 border-b border-[var(--toss-border)] pb-6 md:flex-row md:items-end md:justify-between">
                            <div>
                                <span className="toss-tag uppercase">Photo</span>
                                <h1 className="mt-4 text-3xl font-bold tracking-tight text-[var(--toss-text-strong)] md:text-4xl">
                                    {photo.title}
                                </h1>
                            </div>
                            <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--toss-text-weak)] md:text-sm">
                                {photo.author && <span>작성자 {photo.author}</span>}
                                {photo.date && <span>{photo.date}</span>}
                                {typeof photo.views === "number" && <span>조회수 {photo.views}</span>}
                            </div>
                        </div>

                        {photo.images?.length > 0 ? (
                            <div className="mt-8">
                                <div className="relative">
                                    <Swiper
                                        modules={[Navigation]}
                                        onSwiper={setSwiperInstance}
                                        slidesPerView={1}
                                        spaceBetween={16}
                                        className="rounded-3xl"
                                    >
                                        {photo.images.map((image) => (
                                            <SwiperSlide key={image.id}>
                                                <img
                                                    src={image.url}
                                                    alt={image.originalFilename || photo.title}
                                                    className="h-[420px] w-full rounded-3xl object-cover"
                                                />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>

                                    {photo.images.length > 1 && (
                                        <>
                                            <button
                                                ref={prevRef}
                                                className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--toss-border)] bg-white/90 text-lg text-[var(--toss-text-medium)] shadow transition hover:border-[var(--toss-border-strong)] hover:text-[var(--toss-primary)]"
                                                aria-label="이전 사진"
                                            >
                                                &lsaquo;
                                            </button>
                                            <button
                                                ref={nextRef}
                                                className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--toss-border)] bg-white/90 text-lg text-[var(--toss-text-medium)] shadow transition hover:border-[var(--toss-border-strong)] hover:text-[var(--toss-primary)]"
                                                aria-label="다음 사진"
                                            >
                                                &rsaquo;
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ) : (
                            primaryImage && (
                                <img
                                    src={primaryImage}
                                    alt={photo.title}
                                    className="mt-8 h-[420px] w-full rounded-3xl object-cover"
                                />
                            )
                        )}

                        <p className="mt-8 whitespace-pre-line text-sm leading-7 text-[var(--toss-text-medium)] md:text-base">
                            {photo.content || photo.desc}
                        </p>

                        <div className="mt-8 flex flex-wrap justify-end gap-3">
                            {isAdmin && (
                                <button
                                    onClick={() => navigate(`/photos/${photo.id}/edit`)}
                                    className="toss-primary-btn h-11 px-6 text-sm"
                                >
                                    수정하기
                                </button>
                            )}
                            <button
                                onClick={() => navigate(-1)}
                                className="toss-secondary-btn h-11 px-6 text-sm"
                            >
                                뒤로가기
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
