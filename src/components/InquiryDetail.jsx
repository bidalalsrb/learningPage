import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

// ✅ 더미 데이터 (InquiryPage의 데이터와 동일해야 함)
const inquiries = Array.from({ length: 21 }, (_, i) => ({
    id: 21 - i,
    title: `샘플 문의글 ${21 - i}`,
    author: ["김**", "이**", "박**", "최**", "정**"][i % 5],
    date: `2025-09-${String((i % 30) + 1).padStart(2, "0")}`,
    content: `이것은 샘플 문의글 ${21 - i}의 상세 내용입니다. 실제 DB와 연동하면 이 부분이 글 본문이 됩니다.`,
}));

export default function InquiryDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const inquiry = inquiries.find((q) => q.id === Number(id));

    if (!inquiry) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <p className="text-gray-500">게시글을 찾을 수 없습니다.</p>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 w-4/5 mx-auto px-6 md:px-12 py-10">
                {/* 제목 */}
                <h1 className="text-2xl font-bold text-gray-900 mb-4">{inquiry.title}</h1>

                {/* 메타 정보 */}
                <div className="flex justify-between text-sm text-gray-500 mb-6 border-b pb-3">
                    <span>작성자: {inquiry.author}</span>
                    <span>{inquiry.date}</span>
                    <span>No. {inquiry.id}</span>
                </div>

                {/* 본문 */}
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {inquiry.content}
                </p>

                {/* 뒤로가기 */}
                <button
                    onClick={() => navigate(-1)}
                    className="mt-8 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    뒤로가기
                </button>
            </main>

            <Footer />
        </div>
    );
}
