import React from "react";

export default function Footer() {
    return (
        <footer className="bg-gray-100 mt-16">
            <div className="max-w-7xl mx-auto px-8 py-10">
                {/* 상단: 로고 + 네비게이션 */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center border-b border-gray-300 pb-6 mb-6">
                    {/* 로고 / 회사명 */}
                    <div className="flex items-center gap-3 mb-4 md:mb-0">
                        <img src="/img.png" alt="회사 로고" className="h-10 w-auto" />
                        <span className="text-blue-600 font-bold text-lg">
              HRnc교육컨설팅
            </span>
                    </div>

                </div>

                {/* 중간: 회사 정보 */}
                <div className="text-sm text-gray-600 space-y-1">
                    <p>주소: 서울특별시 어딘가 123, HRnc교육컨설팅</p>
                    <p>대표: 홍길동 | 사업자등록번호: 123-45-67890</p>
                    <p>Tel: 02-123-4567 | Email: info@hrnc.co.kr</p>
                </div>

                {/* 하단: 저작권 */}
                <div className="mt-6 text-xs text-gray-500 text-center border-t border-gray-300 pt-4">
                    © {new Date().getFullYear()} HRnc교육컨설팅. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
