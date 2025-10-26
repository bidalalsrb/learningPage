import React from "react";
import { useNavigate } from "react-router-dom";

// PhotoGrid 컴포넌트는 사진 목록을 카드 형태로 나열합니다.
export default function PhotoGrid({ photos, itemsPerPage }) {
    const navigate = useNavigate();
    const emptySlots = itemsPerPage - photos.length;

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((item, idx) => (
                <div
                    key={idx}
                    className="surface-card flex h-80 cursor-pointer flex-col overflow-hidden rounded-3xl border border-[var(--toss-border)] transition hover:border-[var(--toss-border-strong)]"
                    onClick={() => navigate(`/photos/${item.id}`)}
                >
                    {item.img && (
                        <img
                            src={item.img}
                            alt={item.title}
                            className="h-44 w-full object-cover"
                        />
                    )}

                    <div className="flex flex-1 flex-col justify-between gap-3 px-6 py-5">
                        <div>
                            <h3 className="line-clamp-1 text-lg font-semibold text-[var(--toss-text-strong)]">
                                {item.title}
                            </h3>
                            <p className="mt-2 line-clamp-3 text-sm text-[var(--toss-text-medium)]">
                                {item.desc}
                            </p>
                        </div>
                        <div className="flex items-center justify-between text-xs text-[var(--toss-text-weak)]">
                            <span>{item.author}</span>
                            <span>{item.date}</span>
                            <span>👁 {item.views}</span>
                        </div>
                    </div>
                </div>
            ))}

            {/* 빈 슬롯 채우기 */}
            {Array.from({ length: emptySlots }, (_, i) => (
                <div key={`empty-${i}`} className="invisible" />
            ))}
        </div>
    );
}
