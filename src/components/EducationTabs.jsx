import React from "react";

// EducationTabs 컴포넌트는 교육 관련 섹션을 전환하는 탭 UI를 제공합니다.
export default function EducationTabs() {
    return (
        <nav className="bg-gray-800 text-white">
            <div className="max-w-7xl mx-auto flex">
                <a
                    href="#"
                    className="px-6 py-3 hover:bg-gray-700 border-r border-gray-700"
                >
                    교육 프로그램
                </a>
                <a
                    href="#"
                    className="px-6 py-3 bg-gray-900 font-semibold"
                >
                    교육 프로그램
                </a>
            </div>
        </nav>
    );
}
