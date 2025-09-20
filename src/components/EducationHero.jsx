import React from "react";

export default function EducationHero() {
    return (
        <div className="relative h-72 flex items-center justify-center text-center bg-gray-200">
            {/* 배경 이미지 */}
            <img
                src="/images/hero-bg.jpg"
                alt="교육 배경"
                className="absolute inset-0 w-full h-full object-cover opacity-70"
            />

            {/* 오버레이 */}
            <div className="absolute inset-0 bg-black/40" />

            {/* 콘텐츠 */}
            <div className="relative z-10 text-white px-6">
                <h2 className="text-3xl md:text-4xl font-bold mb-3">
                    HRnC 교육 프로그램
                </h2>
                <p className="max-w-2xl mx-auto text-sm md:text-base text-gray-200">
                    진로 · 취업 · 창업 · 조직개발까지, 맞춤형 프로그램을 만나보세요.
                </p>
            </div>
        </div>
    );
}
