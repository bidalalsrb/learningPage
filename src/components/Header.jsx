import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();

    const handleHome = () => {
        navigate("/index");
    };

    return (
        <header className="sticky top-0 z-40 border-b border-[var(--toss-border)] bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70">
            <div className="toss-container flex h-16 items-center justify-between">
                <button
                    type="button"
                    onClick={handleHome}
                    className="flex items-center gap-2 rounded-full border border-transparent px-3 py-1 transition hover:border-[var(--toss-border-strong)]"
                >
                    <img
                        src="/iconimg.png"
                        alt="HRnC 로고"
                        className="h-10 w-auto"
                    />
                    <span className="hidden text-base font-semibold tracking-tight text-[var(--toss-text-strong)] md:inline">
                        HRnC 교육컨설팅
                    </span>
                </button>

                <nav className="hidden items-center gap-7 text-sm font-medium text-[var(--toss-text-medium)] md:flex">
                    <Link to="/company" className="transition hover:text-[var(--toss-primary)]">
                        회사 소개
                    </Link>
                    <Link to="/education" className="transition hover:text-[var(--toss-primary)]">
                        교육 프로그램
                    </Link>
                    <Link to="/stress" className="transition hover:text-[var(--toss-primary)]">
                        스트레스 관리
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
                        to="/inquiry"
                        className="hidden text-sm font-semibold text-[var(--toss-text-medium)] underline-offset-4 hover:text-[var(--toss-primary)] hover:underline md:inline"
                    >
                        상담 예약
                    </Link>
                    <Link to="/admin/login" className="toss-secondary-btn h-10 px-5 text-sm font-semibold">
                        관리자
                    </Link>
                </div>
            </div>
        </header>
    );
}
