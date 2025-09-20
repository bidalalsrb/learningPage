import React from "react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    return (
        <div className="flex justify-center items-center mt-8 space-x-2">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
            >
                이전
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
                <button
                    key={i + 1}
                    onClick={() => onPageChange(i + 1)}
                    className={`px-3 py-1 border rounded ${
                        currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-white"
                    }`}
                >
                    {i + 1}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
            >
                다음
            </button>
        </div>
    );
}
