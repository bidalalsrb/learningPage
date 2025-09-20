import React, { useState } from "react";

function Card({ title, imgSrc, description, link }) {
    const [flipped, setFlipped] = useState(false);

    return (
        <div
            className="w-full h-64 perspective cursor-pointer"
            onClick={() => setFlipped(!flipped)}
        >
            <div
                className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
                    flipped ? "rotate-x-180" : ""
                }`}
            >
                {/* 앞면 */}
                <div className="absolute inset-0 bg-gray-100 flex items-center justify-center backface-hidden">
                    <img
                        src={imgSrc}
                        alt={title}
                        className={`h-full w-full object-cover transition duration-500 ${
                            flipped ? "blur-md" : ""
                        }`}
                    />
                    <span className="absolute text-white text-xl font-bold bg-black/50 px-4 py-2 rounded">
            {title}
          </span>
                </div>

                {/* 뒷면 */}
                <div className="absolute inset-0 bg-white rounded shadow-lg p-6 flex flex-col items-center justify-center rotate-x-180 backface-hidden">
                    <h3 className="text-xl font-semibold mb-2">{title}</h3>
                    <p className="text-gray-600 mb-4 text-sm text-center">
                        {description}
                    </p>
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        홈페이지 바로가기
                    </a>
                </div>
            </div>
        </div>
    );
}

export default function FeatureBoxes() {
    return (
        <section className="grid grid-cols-3 gap-6 px-8 py-16 text-center">
            <Card
                title="교육 프로그램"
                imgSrc="/img1.jpg"
                description="다양한 맞춤형 교육 프로그램을 제공합니다."
                link="https://example.com/program"
            />
            <Card
                title="플랫폼 개발"
                imgSrc="/img2.jpg"
                description="최신 기술을 활용한 플랫폼 개발 서비스를 만나보세요."
                link="https://example.com/platform"
            />
            <Card
                title="문의 / 견적"
                imgSrc="/img3.jpg"
                description="프로젝트 상담 및 견적을 요청할 수 있습니다."
                link="https://example.com/contact"
            />
        </section>
    );
}
