import React from "react";
import { FaBookOpen, FaLaptopCode, FaEnvelopeOpenText } from "react-icons/fa";
import { HiArrowUpRight } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

// FeatureBoxes 컴포넌트는 주요 서비스 섹션을 카드 형태로 제공하고 클릭 시 페이지를 이동시킵니다.
export default function FeatureBoxes() {
    const navigate = useNavigate();

    const features = [
        {
            title: "교육 프로그램",
            desc: "진로·취업·창업을 위한 맞춤형 교육 과정",
            icon: <FaBookOpen className="h-8 w-8 text-[var(--toss-primary)]" />,
            link: "/education",
            badge: "Curriculum Design",
        },
        {
            title: "스트레스 관리",
            desc: "기업과 조직을 위한 효율적인 교육 플랫폼",
            icon: <FaLaptopCode className="h-8 w-8 text-[var(--toss-primary)]" />,
            link: "/stress",
            badge: "Stress",
        },
        {
            title: "문의 / 견적",
            desc: "기업 및 개인 맞춤형 상담과 견적 제공",
            icon: <FaEnvelopeOpenText className="h-8 w-8 text-[var(--toss-primary)]" />,
            link: "/inquiry",
            badge: "Support",
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {features.map((feature) => (
                <div
                    key={feature.title}
                    role="button"
                    tabIndex={0}
                    onClick={() => navigate(feature.link)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            navigate(feature.link);
                        }
                    }}
                    className="surface-card group flex h-full flex-col gap-6 rounded-3xl p-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--toss-primary)]"
                >
                    <div className="flex items-center justify-between">
                        <span className="toss-chip uppercase">{feature.badge}</span>
                        <HiArrowUpRight className="h-5 w-5 text-[var(--toss-text-weak)] transition group-hover:text-[var(--toss-primary)]" />
                    </div>

                    <div className="flex flex-1 flex-col justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--toss-primary-soft)] text-[var(--toss-primary)]">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-[var(--toss-text-strong)]">
                                {feature.title}
                            </h3>
                        </div>
                        <p className="text-sm leading-6 text-[var(--toss-text-medium)]">
                            {feature.desc}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
