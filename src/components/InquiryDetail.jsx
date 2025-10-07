import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import api from "../utils/api.js";

const TYPE_LABEL = {
    UNIVERSITY: "대학 프로그램",
    COMPANY: "기업",
};

const sampleInquiries = Array.from({ length: 21 }, (_, i) => ({
    id: 21 - i,
    title: `샘플 문의글 ${21 - i}`,
    author: ["김**", "이**", "박**", "최**", "정**"][i % 5],
    phone: "010-0000-0000",
    type: i % 2 === 0 ? "UNIVERSITY" : "COMPANY",
    content: `이것은 샘플 문의글 ${21 - i}의 상세 내용입니다. 실제 DB와 연동하면 이 부분이 글 본문이 됩니다.`,
    date: `2025-09-${String((i % 30) + 1).padStart(2, "0")}`,
}));

// loadStoredInquiries 함수는 로컬스토리지에 저장된 문의 데이터를 불러와 정리합니다.
const loadStoredInquiries = () => {
    if (typeof window === "undefined") return [];
    try {
        const stored = JSON.parse(localStorage.getItem("INQUIRY_CUSTOM") || "[]");
        if (!Array.isArray(stored)) return [];
        return stored.map((item) => ({
            ...item,
            author: item.author || item.name || "익명",
            content: item.content || "",
            date: item.date || item.createdAt?.slice(0, 10) || "",
        }));
    } catch (err) {
        console.error("사용자 문의 불러오기 실패:", err);
        return [];
    }
};

// InquiryDetail 컴포넌트는 단일 문의의 상세 정보를 조회하고 삭제 기능을 제공합니다.
export default function InquiryDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const token = typeof window !== "undefined" ? localStorage.getItem("ACCESS_TOKEN") : null;
    const isAdmin = Boolean(token);

    const [inquiry, setInquiry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fallbackInquiries = useMemo(
        () => [...loadStoredInquiries(), ...sampleInquiries],
        []
    );

    // useEffect 훅은 게시글 ID가 바뀔 때마다 상세 정보를 조회합니다.
    useEffect(() => {
        const fetchInquiry = async () => {
            setLoading(true);
            try {
                const res = await api.get(`/api/inquiries/${id}`);
                setInquiry(res.data);
                setError("");
            } catch (err) {
                console.error("문의 상세 불러오기 실패:", err);
                const fallback = fallbackInquiries.find(
                    (item) => String(item.id) === String(id)
                );
                if (fallback) {
                    setInquiry(fallback);
                    setError("");
                } else {
                    setInquiry(null);
                    setError("게시글을 찾을 수 없습니다.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchInquiry();
    }, [id, fallbackInquiries]);

    // handleDelete 함수는 관리자 권한 확인 후 문의를 삭제합니다.
    const handleDelete = async () => {
        if (!isAdmin || !inquiry) return;
        if (!window.confirm("정말 삭제하시겠습니까?")) return;

        try {
            await api.delete(`/api/inquiries/${inquiry.id}`);
            alert("삭제되었습니다.");
            navigate("/inquiry", {
                replace: true,
                state: { message: "문의가 삭제되었습니다." },
            });
        } catch (err) {
            console.error("문의 삭제 실패:", err);
            if (err.response?.status === 403) {
                alert("삭제 권한이 없습니다.");
            } else {
                alert("문의 삭제에 실패했습니다. 다시 시도해주세요.");
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex flex-1 items-center justify-center px-6">
                    <div className="rounded-3xl border border-[var(--toss-border)] bg-white/80 px-8 py-12 text-center text-sm text-[var(--toss-text-medium)]">
                        데이터를 불러오는 중입니다...
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (!inquiry) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex flex-1 items-center justify-center px-6">
                    <div className="rounded-3xl border border-[var(--toss-border)] bg-white/80 px-8 py-12 text-center text-sm text-[var(--toss-text-medium)]">
                        {error || "게시글을 찾을 수 없습니다."}
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
                            <div className="flex flex-col gap-3 text-xs text-[var(--toss-text-weak)] md:flex-row md:items-center md:gap-4 md:text-sm">
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                                    <span>작성자 {inquiry.author || inquiry.name || "익명"}</span>
                                    {(inquiry.phoneNumber || inquiry.phone) && (
                                        <span>연락처 {inquiry.phoneNumber || inquiry.phone}</span>
                                    )}
                                    {(inquiry.inquiryType || inquiry.type) && (
                                        <span>
                                            {
                                                TYPE_LABEL[inquiry.inquiryType || inquiry.type] ||
                                                    inquiry.inquiryType ||
                                                    inquiry.type
                                            }
                                        </span>
                                    )}
                                    <span>{inquiry.date}</span>
                                    <span>No. {inquiry.id}</span>
                                </div>
                                {isAdmin && (
                                    <button
                                        type="button"
                                        onClick={handleDelete}
                                        className="self-start text-sm font-semibold text-red-500 transition hover:text-red-600"
                                    >
                                        삭제
                                    </button>
                                )}
                            </div>
                        </div>

                        <p className="mt-8 whitespace-pre-line text-sm leading-7 text-[var(--toss-text-medium)] md:text-base">
                            {inquiry.content}
                        </p>

                        <div className="mt-8 flex justify-end gap-3">
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
