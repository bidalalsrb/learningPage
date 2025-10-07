import React, { useEffect } from "react";
import { createPortal } from "react-dom";

const getPortalTarget = () =>
    typeof document !== "undefined" ? document.body : null;

const resolveImageSrc = (image) => {
    if (!image) return "";
    if (typeof image === "string") return image;
    return image.preview || image.url || image.src || "";
};

export default function ProgramDetailModal({ isOpen, item, onClose }) {
    const portalTarget = getPortalTarget();

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

    if (!isOpen || !item || !portalTarget) {
        return null;
    }

    const { title, description, images = [] } = item;
    const imageList = Array.isArray(images) ? images.filter(Boolean) : [];

    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            onClose?.();
        }
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

                {imageList.length > 0 && (
                    <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
                        {imageList.map((image, index) => {
                            const src = resolveImageSrc(image);
                            if (!src) return null;
                            return (
                                <div
                                    key={image.id || `${title}-image-${index}`}
                                    className="overflow-hidden rounded-2xl border border-[var(--toss-border)] bg-white"
                                >
                                    <img
                                        src={src}
                                        alt={title}
                                        className="h-36 w-full object-cover"
                                    />
                                </div>
                            );
                        })}
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
