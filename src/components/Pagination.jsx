import React from "react";

// Pagination 컴포넌트는 현재 페이지와 총 페이지 수를 기반으로 이동 버튼을 렌더링합니다.
export default function Pagination({ currentPage, totalPages, onPageChange }) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="mt-12 flex items-center justify-center gap-2">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="h-10 rounded-full border border-[var(--toss-border)] px-3 text-sm font-medium text-[var(--toss-text-medium)] transition disabled:cursor-not-allowed disabled:opacity-40 hover:border-[var(--toss-border-strong)] hover:text-[var(--toss-primary)]"
            >
                이전
            </button>

            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`h-10 min-w-10 rounded-full border px-3 text-sm font-semibold transition ${
                        currentPage === page
                            ? "border-transparent bg-[var(--toss-primary)] text-white"
                            : "border-[var(--toss-border)] bg-white text-[var(--toss-text-medium)] hover:border-[var(--toss-border-strong)] hover:text-[var(--toss-primary)]"
                    }`}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="h-10 rounded-full border border-[var(--toss-border)] px-3 text-sm font-medium text-[var(--toss-text-medium)] transition disabled:cursor-not-allowed disabled:opacity-40 hover:border-[var(--toss-border-strong)] hover:text-[var(--toss-primary)]"
            >
                다음
            </button>
        </div>
    );
}
