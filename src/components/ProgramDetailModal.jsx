import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// getPortalTarget 함수는 브라우저 환경에서 모달을 렌더링할 돔 노드를 반환합니다.
const getPortalTarget = () =>
    typeof document !== "undefined" ? document.body : null;

// resolveImageSrc 함수는 다양한 이미지 객체에서 미리보기 URL을 추출합니다.
const resolveImageSrc = (image) => {
    if (!image) return "";
    if (typeof image === "string") return image;
    return image.preview || image.url || image.src || "";
};

// ProgramDetailModal 컴포넌트는 프로그램 상세 내용을 모달로 보여줍니다.
export default function ProgramDetailModal({ isOpen, item, onClose }) {
    const portalTarget = getPortalTarget();
    const [swiperInstance, setSwiperInstance] = useState(null);
    const hasContent = Boolean(isOpen && item && portalTarget);
    const title = item?.title;
    const description = item?.description;
    const imageList = useMemo(
        () =>
            Array.isArray(item?.images)
                ? item.images.filter(Boolean)
                : [],
        [item]
    );
    const resolvedImages = useMemo(
        () =>
            imageList
                .map((image, index) => {
                    const src = resolveImageSrc(image);
                    if (!src) return null;
                    return {
                        id: image.id || `${title}-image-${index}`,
                        src,
                        alt: image.alt || image.originalFilename || title || "교육 이미지",
                    };
                })
                .filter(Boolean),
        [imageList, title]
    );

    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose?.();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    if (!hasContent) {
        return null;
    }

    // handleOverlayClick 함수는 오버레이 영역을 클릭하면 모달을 닫습니다.
    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            onClose?.();
        }
    };

    // handlePrevSlide 함수는 이전 이미지를 표시하도록 Swiper를 제어합니다.
    const handlePrevSlide = () => {
        swiperInstance?.slidePrev();
    };

    // handleNextSlide 함수는 다음 이미지를 표시하도록 Swiper를 제어합니다.
    const handleNextSlide = () => {
        swiperInstance?.slideNext();
    };

    return createPortal(
        <div
            onClick={handleOverlayClick}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-[#0b1626]/60 px-4"
            role="dialog"
            aria-modal="true"
            aria-label={title || "교육 프로그램 상세"}
        >
            <div className="surface-card w-full max-w-2xl overflow-hidden rounded-[28px] border border-[var(--toss-border-strong)] p-8 shadow-2xl">
                <header className="mb-6 flex items-start justify-between gap-4">
                    <h2 className="text-2xl font-semibold tracking-tight text-[var(--toss-text-strong)]">
                        {title}
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-transparent text-lg text-[var(--toss-text-weak)] transition hover:border-[var(--toss-border)] hover:text-[var(--toss-text-medium)]"
                        aria-label="닫기"
                    >
                        ✕
                    </button>
                </header>

                <p className="whitespace-pre-line text-sm leading-7 text-[var(--toss-text-medium)] md:text-base">
                    {description}
                </p>

                {resolvedImages.length > 0 && (
                    <div className="relative mt-6">
                        <Swiper
                            modules={[Navigation, Pagination]}
                            slidesPerView={1}
                            spaceBetween={16}
                            pagination={{ clickable: true }}
                            className="overflow-hidden rounded-2xl border border-[var(--toss-border)]"
                            onSwiper={setSwiperInstance}
                        >
                            {resolvedImages.map((image) => (
                                <SwiperSlide key={image.id}>
                                    <img
                                        src={image.src}
                                        alt={image.alt}
                                        className="h-80 w-full object-cover"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {resolvedImages.length > 1 && (
                            <>
                                <button
                                    type="button"
                                    className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--toss-border)] bg-white/90 text-lg text-[var(--toss-text-medium)] shadow transition hover:border-[var(--toss-border-strong)] hover:text-[var(--toss-primary)]"
                                    aria-label="이전 이미지"
                                    onClick={handlePrevSlide}
                                >
                                    &lsaquo;
                                </button>
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--toss-border)] bg-white/90 text-lg text-[var(--toss-text-medium)] shadow transition hover:border-[var(--toss-border-strong)] hover:text-[var(--toss-primary)]"
                                    aria-label="다음 이미지"
                                    onClick={handleNextSlide}
                                >
                                    &rsaquo;
                                </button>
                            </>
                        )}
                    </div>
                )}

                <div className="mt-8 flex justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="toss-primary-btn h-11 px-6 text-sm"
                    >
                        닫기
                    </button>
                </div>
            </div>
        </div>,
        portalTarget
    );
}
