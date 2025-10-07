import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // ✅ 추가
import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb.jsx";
import InquiryTable from "../components/InquiryTable.jsx";
import Pagination from "../components/Pagination.jsx";
import api from "../utils/api.js";

export default function InquiryPage() {
    const navigate = useNavigate(); // ✅ 네비게이션 훅
    const location = useLocation();

    // ✅ 21개 데이터 (샘플)
    const sampleInquiries = useMemo(
        () =>
            Array.from({ length: 21 }, (_, i) => ({
                id: 21 - i,
                title: `샘플 문의글 ${21 - i}`,
                author: ["김**", "이**", "박**", "최**", "정**"][i % 5],
                phoneNumber: "010-0000-0000",
                phone: "010-0000-0000",
                inquiryType: i % 2 === 0 ? "UNIVERSITY" : "COMPANY",
                content: `이것은 샘플 문의글 ${21 - i}의 상세 내용입니다.`,
                date: `2025-09-${String((i % 30) + 1).padStart(2, "0")}`,
            })),
        []
    );

    const [inquiries, setInquiries] = useState(sampleInquiries);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [flashMessage, setFlashMessage] = useState(location.state?.message || "");

    const itemsPerPage = 3;
    const [currentPage, setCurrentPage] = useState(1);

    const fetchInquiries = useCallback(async () => {
        setLoading(true);
        try {
            const res = await api.get("/api/inquiries");
            const list = Array.isArray(res.data) ? res.data : [];
            if (list.length === 0) {
                setInquiries(sampleInquiries);
                setError("등록된 문의가 아직 없습니다. 샘플 데이터가 표시됩니다.");
            } else {
                setInquiries(list);
                setError("");
            }
        } catch (err) {
            console.error("문의 목록 불러오기 실패:", err);
            setInquiries(sampleInquiries);
            setError("문의 목록을 불러오지 못했습니다. 샘플 데이터가 표시됩니다.");
        } finally {
            setLoading(false);
            setCurrentPage(1);
        }
    }, [sampleInquiries]);

    useEffect(() => {
        fetchInquiries();
    }, [fetchInquiries, location.key]);

    useEffect(() => {
        if (location.state?.message) {
            setFlashMessage(location.state.message);
            fetchInquiries();
            navigate(location.pathname, { replace: true });
        }
    }, [location.state, location.pathname, navigate, fetchInquiries]);

    const totalPages = useMemo(
        () => Math.ceil(inquiries.length / itemsPerPage),
        [inquiries.length]
    );
    const currentItems = useMemo(() => {
        const startIdx = (currentPage - 1) * itemsPerPage;
        return inquiries.slice(startIdx, startIdx + itemsPerPage);
    }, [currentPage, inquiries]);

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
                    <div className="toss-container space-y-6">
                        {flashMessage && (
                            <div className="rounded-2xl border border-[var(--toss-border)] bg-[var(--toss-primary-soft)] px-4 py-3 text-sm text-[var(--toss-primary)]">
                                {flashMessage}
                            </div>
                        )}
                        {error && !loading && (
                            <div className="rounded-2xl border border-[var(--toss-border)] bg-white px-4 py-3 text-sm text-[var(--toss-text-medium)]">
                                {error}
                            </div>
                        )}
                        {loading ? (
                            <div className="rounded-2xl border border-dashed border-[var(--toss-border)] bg-white/70 px-4 py-12 text-center text-sm text-[var(--toss-text-medium)]">
                                문의 목록을 불러오는 중입니다...
                            </div>
                        ) : (
                            <>
                                <InquiryTable inquiries={currentItems} onRowClick={handleRowClick} />
                                <div className="flex justify-end">
                                    <Link
                                        to="/inquiry/new"
                                        className="toss-primary-btn h-11 px-6 text-sm"
                                    >
                                        문의 등록하기
                                    </Link>
                                </div>
                                {totalPages > 1 && (
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={setCurrentPage}
                                    />
                                )}
                            </>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
