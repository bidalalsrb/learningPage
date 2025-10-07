import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ 추가
import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb.jsx";
import InquiryTable from "../components/InquiryTable.jsx";
import Pagination from "../components/Pagination.jsx";

export default function InquiryPage() {
    const navigate = useNavigate(); // ✅ 네비게이션 훅

    // ✅ 21개 데이터 (샘플)
    const inquiries = Array.from({ length: 21 }, (_, i) => ({
        id: 21 - i,
        title: `샘플 문의글 ${21 - i}`,
        author: ["김**", "이**", "박**", "최**", "정**"][i % 5],
        date: `2025-09-${String((i % 30) + 1).padStart(2, "0")}`,
    }));

    const itemsPerPage = 3;
    const [currentPage, setCurrentPage] = useState(1);

    const startIdx = (currentPage - 1) * itemsPerPage;
    const currentItems = inquiries.slice(startIdx, startIdx + itemsPerPage);
    const totalPages = Math.ceil(inquiries.length / itemsPerPage);

    // ✅ 게시글 클릭 → 상세 이동
    const handleRowClick = (item) => {
        navigate(`/inquiry/${item.id}`);
    };

    return (
        <div className="min-h-screen flex flex-col ">
            <Header />

            {/* Breadcrumb */}
            <Breadcrumb
                items={[
                    { label: "홈", to: "/index" },
                    { label: "문의" },
                ]}
            />

            <main className="flex-1">
                <section className="px-6 pt-12">
                    <div className="toss-container text-center md:text-left">
                        <span className="toss-tag uppercase">Contact</span>
                        <h1 className="mt-4 text-3xl font-bold tracking-tight text-[var(--toss-text-strong)] md:text-4xl">
                            문의 게시판
                        </h1>
                        <p className="mt-3 text-sm text-[var(--toss-text-medium)] md:text-base">
                            취업 / 창업 / 용역사업 / 지원사업 / 단체교육 등 궁금한 사항을 남겨주시면 빠르게 응답드리겠습니다.
                        </p>
                        <p className="mt-6 text-sm font-semibold text-[var(--toss-primary)]">
                            사업문의 02-561-2133
                        </p>
                    </div>
                </section>

                <section className="px-6 pb-16 pt-10">
                    <div className="toss-container space-y-8">
                        <InquiryTable inquiries={currentItems} onRowClick={handleRowClick} />
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
