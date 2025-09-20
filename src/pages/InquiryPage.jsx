import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb.jsx";
import InquiryTable from "../components/InquiryTable.jsx";
import Pagination from "../components/Pagination.jsx";

export default function InquiryPage() {
    // ✅ 21개 데이터 (샘플)
    const inquiries = Array.from({ length: 21 }, (_, i) => ({
        id: 21 - i,
        title: `샘플 문의글 ${21 - i}`,
        author: ["김**", "이**", "박**", "최**", "정**"][i % 5],
        date: `2025-09-${(i % 30) + 1}`.padStart(10, "0"),
    }));

    const itemsPerPage = 7; // ✅ 페이지당 7개
    const [currentPage, setCurrentPage] = useState(1);

    const startIdx = (currentPage - 1) * itemsPerPage;
    const currentItems = inquiries.slice(startIdx, startIdx + itemsPerPage);
    const totalPages = Math.ceil(inquiries.length / itemsPerPage);

    const handleRowClick = (item) => {
        alert(`"${item.title}" 게시글 상세 페이지로 이동 예정`);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            {/* 타이틀 */}
            <section className="px-6 md:px-12 py-10 border-b text-center bg-white">
                <h1 className="text-2xl font-bold text-gray-900">문의 / 견적</h1>
            </section>

            {/* Breadcrumb */}
            <Breadcrumb
                items={[
                    { label: "홈", to: "/" },
                    { label: "문의 / 견적" },
                ]}
            />

            {/* 안내 */}
            <section className="max-w-7xl mx-auto px-6 md:px-12 py-6 text-center">
                <p className="text-red-600 font-bold text-lg">
                    사업문의(02-561-2133)
                </p>
                <p className="text-gray-500 text-sm mt-2">
                    취업 / 창업 / 용역사업 / 지원사업 / 단체교육 등 궁금한 사항은 문의게시판에 남겨주세요.
                </p>
            </section>

            {/* 테이블 */}
            <main className="flex-1 w-4/5 mx-auto px-6 md:px-12 py-6">
                <InquiryTable inquiries={currentItems} onRowClick={handleRowClick} />

                {/* 페이징 */}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </main>

            <Footer />
        </div>
    );
}
