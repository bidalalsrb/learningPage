import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

// Header 컴포넌트는 상단 내비게이션과 관리자 버튼을 렌더링합니다.
export default function Header() {
    const navigate = useNavigate();

    const token = typeof window !== "undefined" ? localStorage.getItem("ACCESS_TOKEN") : null;
    const isAdmin = useMemo(() => Boolean(token), [token]);

    // handleHome 함수는 메인 페이지로 이동합니다.
    const handleHome = () => {
        navigate("/index");
    };

    return (
        <header className="sticky top-0 z-40 border-b border-[var(--toss-border)] bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70">
            <div className="toss-container flex h-16 items-center justify-between ">
                <button
                    type="button"
                    onClick={handleHome}
                    className="flex items-center gap-2 rounded-full border border-transparent px-3 py-1 transition cursor-pointer"
                >
                    <img
                        src="/logo_new.png"
                        alt="HRnC 로고"
                        // className="h-10 w-auto"
                    />

                </button>

                <nav className="hidden items-center gap-7 text-sm font-medium text-[var(--toss-text-medium)] md:flex">
                    <Link to="/company" className="transition hover:text-[var(--toss-primary)]">
                        회사 소개
                    </Link>
                    <Link to="/education" className="transition hover:text-[var(--toss-primary)]">
                        대학 프로그램
                    </Link>
                    <Link to="/education" className="transition hover:text-[var(--toss-primary)]">
                        기업 프로그램
                    </Link>
                    <Link to="/stress" className="transition hover:text-[var(--toss-primary)]">
                        청년 프로그램
                    </Link>
                    <Link to="/stress" className="transition hover:text-[var(--toss-primary)]">
                        HIT 프로그램
                    </Link>
                    <Link to="/photos" className="transition hover:text-[var(--toss-primary)]">
                        사진
                    </Link>
                    <Link to="/inquiry" className="transition hover:text-[var(--toss-primary)]">
                        문의
                    </Link>
                </nav>

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
