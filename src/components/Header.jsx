import React from "react";

export default function Header() {
    return (
        <header className="flex justify-between items-center px-8 py-4 shadow-sm">
            {/* 로고 + 회사명 묶음 */}
            <div className="flex items-center gap-3">
                <img src="/img.png" alt="회사 로고" className="h-12 w-auto" />
                <div className="text-blue-600 font-bold text-xl">HRnC 교육컨설팅</div>
            </div>

            <nav className="flex gap-6 text-sm text-gray-700">
                <a href="#">회사 소개</a>
                <a href="#">교육 프로그램</a>
                <a href="#">플랫폼 개발</a>
                <a href="#">사진</a>
                <a href="#">문의/견적</a>
                <a href="#">관리자 기능</a>
            </nav>
        </header>
    );
}
