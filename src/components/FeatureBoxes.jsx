import React, { useState } from "react";
import { FaBookOpen, FaLaptopCode, FaEnvelopeOpenText } from "react-icons/fa"; // 아이콘 불러오기

export default function FeatureBoxes() {
    const [active, setActive] = useState(null);

    const features = [
        {
            title: "교육 프로그램",
            desc: "진로·취업·창업을 위한 맞춤형 교육 과정",
            icon: <FaBookOpen className="w-16 h-16 text-blue-600" />,
        },
        {
            title: "솔루션 개발",
            desc: "기업과 조직을 위한 효율적인 교육 플랫폼",
            icon: <FaLaptopCode className="w-16 h-16 text-green-600" />,
        },
        {
            title: "문의 / 견적",
            desc: "기업 및 개인 맞춤형 상담과 견적 제공",
            icon: <FaEnvelopeOpenText className="w-16 h-16 text-red-500" />,
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((f, i) => (
                <div
                    key={i}
                    className="relative h-60 cursor-pointer rounded-xl overflow-hidden shadow-md flex flex-col items-center justify-center bg-gray-50 hover:shadow-lg transition"
                    onClick={() => setActive(active === i ? null : i)}
                >
                    {/* 아이콘 */}
                    <div
                        className={`transition duration-500 ${
                            active === i ? "opacity-30 blur-sm" : "opacity-100"
                        }`}
                    >
                        {f.icon}
                    </div>

                    {/* 오버레이 (클릭 시 나타남) */}
                    <div
                        className={`absolute inset-0 flex flex-col items-center justify-center text-center px-4 transition-opacity duration-500 ${
                            active === i ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        <h3 className="text-gray-900 text-xl font-bold mb-2">{f.title}</h3>
                        <p className="text-gray-600 text-sm mb-4">{f.desc}</p>
                        <a
                            href="#"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                        >
                            바로가기
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
}
