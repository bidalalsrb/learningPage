import React, { useMemo, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    const token =
        typeof window !== "undefined"
            ? localStorage.getItem("ACCESS_TOKEN")
            : null;
    const isAdmin = useMemo(() => Boolean(token), [token]);

    // ✅ HIT 탭 상태
    const [showHitTabs, setShowHitTabs] = useState(false);
    const [activeTab, setActiveTab] = useState("kor");

    const hitRef = useRef(null);
    const tabRef = useRef(null);

    const handleHome = () => {
        navigate("/index");
        setShowHitTabs(false);
    };

    // ✅ 외부 클릭 시 닫기
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                tabRef.current &&
                !tabRef.current.contains(e.target) &&
                hitRef.current &&
                !hitRef.current.contains(e.target)
            ) {
                setShowHitTabs(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleHitClick = (e) => {
        e.preventDefault();
        setShowHitTabs((prev) => !prev);
    };

    return (
        <header className="sticky top-0 z-40 border-b border-[var(--toss-border)] bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70">
            <div className="toss-container flex h-16 items-center justify-between relative">
                {/* 로고 */}
                <button
                    type="button"
                    onClick={handleHome}
                    className="flex items-center gap-2 rounded-full border border-transparent px-3 py-1 transition cursor-pointer"
                >
                    <img src="/iconimg.png" alt="HRnC 로고" className="h-10 w-auto" />
                </button>

                {/* 메뉴 */}
                <nav className="hidden items-center gap-7 text-sm font-medium text-[var(--toss-text-medium)] md:flex relative">
                    <Link
                        to="/company"
                        className="transition hover:text-[var(--toss-primary)]"
                    >
                        회사 소개
                    </Link>
                    <Link
                        to="/universty-program"
                        className="transition hover:text-[var(--toss-primary)]"
                    >
                        대학 프로그램
                    </Link>
                    <Link
                        to="/compnay-program"
                        className="transition hover:text-[var(--toss-primary)]"
                    >
                        기업 프로그램
                    </Link>
                    <Link
                        to="/stress"
                        className="transition hover:text-[var(--toss-primary)]"
                    >
                        청년 프로그램
                    </Link>

                    {/* ✅ HIT 메뉴 클릭 시 탭 표시 */}
                    <div className="relative" ref={hitRef}>
                        <button
                            onClick={handleHitClick}
                            className="transition hover:text-[var(--toss-primary)] cursor-pointer"
                        >
                            HIT 프로그램
                        </button>

                        {showHitTabs && (
                            <div
                                ref={tabRef}
                                className="absolute left-1/2 -translate-x-1/2 mt-3 w-50 border border-gray-300 bg-white rounded-xl shadow-lg flex flex-col items-center py-2 z-50"
                            >

                                {/* 탭 버튼 */}
                                {["향 기반 동기회복 프로그램", "ESG 온라인 자격", "강점 교육"].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`w-full py-1 text-sm font-semibold transition ${
                                            activeTab === tab
                                                ? "text-[var(--toss-primary)]"
                                                : "text-gray-800 hover:text-[var(--toss-primary)]"
                                        }`}
                                    >
                                        {tab === "향 기반 동기회복 프로그램"
                                            ? "향 기반 동기회복 프로그램"
                                            : tab === "ESG 온라인 자격"
                                                ? "ESG 온라인 자격"
                                                : "강점 교육"}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <Link
                        to="/photos"
                        className="transition hover:text-[var(--toss-primary)]"
                    >
                        사진
                    </Link>
                    <Link
                        to="/inquiry"
                        className="transition hover:text-[var(--toss-primary)]"
                    >
                        문의
                    </Link>
                </nav>

                {/* 관리자 버튼 */}
                <div className="flex items-center gap-3">
                    <Link
                        to="/admin/login"
                        className={`h-10 px-5 text-sm font-semibold transition ${
                            isAdmin ? "toss-primary-btn" : "toss-secondary-btn"
                        }`}
                    >
                        관리자
                    </Link>
                </div>
            </div>
        </header>
    );
}
