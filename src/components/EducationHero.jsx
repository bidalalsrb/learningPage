import React from "react";

// EducationHero 컴포넌트는 교육 페이지의 상단 소개 영역을 렌더링합니다.
export default function EducationHero({
    title = "HRnC 교육 프로그램",
    description = "진로 · 취업 · 창업 · 조직개발까지, 맞춤형 프로그램을 만나보세요.",
    eyebrow = "HRnC Curriculum",
}) {
    return (
        <section className="px-6 py-16">
            <div className="toss-container">
                <div className="relative overflow-hidden rounded-[32px] border border-[var(--toss-border)] bg-gradient-to-br from-white via-white to-[rgba(0,100,255,0.08)] px-10 py-16 text-center shadow-[0_18px_40px_rgba(19,32,46,0.08)] md:text-left">
                    <div className="absolute inset-0 pointer-events-none">
                        <svg
                            aria-hidden
                            className="absolute -right-32 -top-32 h-72 w-72 text-[rgba(0,100,255,0.12)]"
                            viewBox="0 0 200 200"
                            fill="currentColor"
                        >
                            <circle cx="100" cy="100" r="100" />
                        </svg>
                    </div>
                    <div className="relative flex flex-col gap-6 md:max-w-xl">
                        <span className="toss-tag self-center uppercase md:self-start">
                            {eyebrow}
                        </span>
                        <h2 className="text-3xl font-bold tracking-tight text-[var(--toss-text-strong)] md:text-4xl">
                            {title}
                        </h2>
                        <p className="text-base text-[var(--toss-text-medium)] md:text-lg">
                            {description}
                        </p>

                    </div>

                    <div className="relative mt-10 grid gap-4 md:grid-cols-3">
                        {[
                            { label: "핵심 역량 기반 설계", value: "Competency Based" },
                            { label: "맞춤형 학습 경로", value: "Personalized Path" },
                            { label: "성과 중심 측정", value: "Performance Driven" },
                        ].map(({ label, value }) => (
                            <div
                                key={value}
                                className="rounded-2xl border border-white/50 bg-white/80 px-6 py-5 text-left backdrop-blur"
                            >
                                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--toss-text-weak)]">
                                    {label}
                                </p>
                                <p className="mt-3 text-lg font-semibold text-[var(--toss-text-strong)]">
                                    {value}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
