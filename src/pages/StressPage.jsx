import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EducationHero from "../components/EducationHero";
import Breadcrumb from "../components/Breadcrumb.jsx";

export default function StressPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <Breadcrumb
                items={[
                    { label: "홈", to: "/index" },
                    { label: "스트레스 관리" }, // 현재 페이지 → 링크 없음
                ]}
            />

            <main className="flex-1">
                <EducationHero
                    title="스트레스를 데이터로 측정하고, 행동으로 변화시킵니다"
                    eyebrow="Stress Management"
                    description="HRnC는 감정 관리와 조직 회복 탄력성을 높이는 심리 케어 솔루션을 제공합니다. Toss처럼 심플한 프로세스로 구성원의 상태를 파악하고 대응합니다."
                />

                <section className="px-6 pb-16">
                    <div className="toss-container grid gap-6 md:grid-cols-3">
                        {[
                            {
                                title: "Pulse Survey",
                                desc: "구성원의 스트레스 지표를 간결한 문항으로 정기 진단합니다.",
                            },
                            {
                                title: "1:1 코칭",
                                desc: "상담 전문가와의 코칭 세션으로 심리적 긴장을 완화합니다.",
                            },
                            {
                                title: "리더십 케어 가이드",
                                desc: "팀 리더에게 필요한 대응 가이드를 제공해 조직 회복을 돕습니다.",
                            },
                        ].map((item) => (
                            <article
                                key={item.title}
                                className="surface-card rounded-3xl border border-[var(--toss-border)] p-7"
                            >
                                <h3 className="text-lg font-semibold text-[var(--toss-text-strong)]">
                                    {item.title}
                                </h3>
                                <p className="mt-3 text-sm text-[var(--toss-text-medium)]">
                                    {item.desc}
                                </p>
                            </article>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
