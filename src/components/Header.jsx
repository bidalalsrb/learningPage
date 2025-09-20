import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="flex justify-between items-center px-6 md:px-12 py-5 shadow-sm bg-white">
            {/* 로고 + 회사명 */}
            <div className="flex items-center gap-3 cursor-pointer">
                <img src="/img.png" alt="회사 로고" className="h-10 md:h-12 w-auto" />
                <span className="text-blue-600 font-bold text-xl md:text-2xl">
          HRnC 교육컨설팅
        </span>
            </div>

            {/* 네비게이션 */}
            <nav className="flex gap-5 md:gap-8 text-sm md:text-base text-gray-700">
                <Link
                    to="/"
                    className="cursor-pointer hover:text-blue-600 transition"
                >
                    회사 소개
                </Link>
                <Link
                    to="/education"
                    className="cursor-pointer hover:text-blue-600 transition"
                >
                    교육 프로그램
                </Link>
                <Link
                    to="#"
                    className="cursor-pointer hover:text-blue-600 transition"
                >
                    플랫폼 개발
                </Link>
                <Link
                    to="/photos"
                    className="cursor-pointer hover:text-blue-600 transition"
                >
                    사진
                </Link>
                <Link
                    to="/inquiry"
                    className="cursor-pointer hover:text-blue-600 transition"
                >
                    문의/견적
                </Link>
                <Link
                    to="#"
                    className="cursor-pointer hover:text-blue-600 transition"
                >
                    관리자 기능
                </Link>
            </nav>
        </header>
    );
}
