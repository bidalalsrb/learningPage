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
                <main className="flex flex-1 items-center justify-center px-6">
                    <div className="rounded-3xl border border-[var(--toss-border)] bg-white/80 px-8 py-12 text-center text-sm text-[var(--toss-text-medium)]">
                        게시글을 찾을 수 없습니다.
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 px-6 py-12">
                <div className="toss-container">
                    <div className="rounded-[32px] border border-[var(--toss-border)] bg-white/90 p-10 shadow-[0_24px_60px_rgba(19,32,46,0.1)] backdrop-blur">
                        <div className="flex flex-col gap-5 border-b border-[var(--toss-border)] pb-6 md:flex-row md:items-end md:justify-between">
                            <div>
                                <span className="toss-tag uppercase">Inquiry</span>
                                <h1 className="mt-4 text-3xl font-bold tracking-tight text-[var(--toss-text-strong)] md:text-4xl">
                                    {inquiry.title}
                                </h1>
                            </div>
                            <div className="flex gap-4 text-xs text-[var(--toss-text-weak)] md:text-sm">
                                <span>작성자 {inquiry.author}</span>
                                <span>{inquiry.date}</span>
                                <span>No. {inquiry.id}</span>
                            </div>
                        </div>

                        <p className="mt-8 whitespace-pre-line text-sm leading-7 text-[var(--toss-text-medium)] md:text-base">
                            {inquiry.content}
                        </p>

                        <div className="mt-8 flex justify-end">
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
