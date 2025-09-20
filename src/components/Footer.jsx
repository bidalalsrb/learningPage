import React from "react";

export default function Footer() {
    return (
        <footer className="bg-gray-50 border-t ">
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
                {/* 상단: 로고 + 회사명 */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center pb-8 border-b border-gray-200">
                    <div className="flex items-center gap-3 mb-6 md:mb-0">
                        <img src="/img.png" alt="회사 로고" className="h-10 w-auto" />
                        <span className="text-blue-600 font-bold text-lg md:text-xl">
              HRnC 교육컨설팅
            </span>
                    </div>

                    {/* 필요시 네비게이션 추가 가능 */}
                    <nav className="flex gap-6 text-sm text-gray-600">
                        <a href="#" className="hover:text-blue-600 transition">회사 소개</a>
                        <a href="#" className="hover:text-blue-600 transition">교육 프로그램</a>
                        <a href="#" className="hover:text-blue-600 transition">문의</a>
                    </nav>
                </div>

                {/* 중간: 회사 정보 */}
                <div className="text-sm text-gray-600 space-y-2 mt-6">
                    <p>주소: 서울특별시 어딘가 123, HRnC교육컨설팅</p>
                    <p>대표: 홍길동 | 사업자등록번호: 123-45-67890</p>
                    <p>Tel: 02-123-4567 | Email: info@hrnc.co.kr</p>
                </div>

                {/* 하단: 저작권 */}
                <div className="mt-8 text-xs text-gray-500 text-center border-t border-gray-200 pt-4">
                    © {new Date().getFullYear()} HRnC교육컨설팅. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
