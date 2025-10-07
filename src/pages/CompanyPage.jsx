import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EducationHero from "../components/EducationHero";
import Breadcrumb from "../components/Breadcrumb.jsx";

// CompanyPage 컴포넌트는 기업 소개와 핵심 가치 정보를 제공합니다.
export default function CompanyPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <Breadcrumb
                items={[
                    { label: "홈", to: "/index" },
                    { label: "회사 소개" }, // 현재 페이지 → 링크 없음
                ]}
            />

            <main className="flex-1">
                <EducationHero
                    title="사람과 조직이 함께 성장하는 방법을 연구합니다"
                    eyebrow="About HRnC"
                    description="HRnC 교육컨설팅은 데이터 기반의 학습 경험 설계를 통해 대학과 기업의 성장을 돕습니다. 본질에 집중하는 심플한 구조로 교육의 임팩트를 극대화합니다."
                />

                <section className="px-6 pb-16">
                    <div className="toss-container grid gap-8 md:grid-cols-2">
                        <article className="surface-card rounded-3xl border border-[var(--toss-border)] p-8">
                            <h2 className="text-xl font-semibold text-[var(--toss-text-strong)]">
                                미션
                            </h2>
                            <p className="mt-4 text-sm text-[var(--toss-text-medium)]">
                                교육이 필요한 순간을 정확히 포착해 학습자에게 가장 직관적인 경험을 제공합니다.
                                초점을 흐리는 미사여구 대신, 이해하기 쉬운 언어와 프로세스로 교육 성공을 돕습니다.
                            </p>
                        </article>
                        <article className="surface-card rounded-3xl border border-[var(--toss-border)] p-8">
                            <h2 className="text-xl font-semibold text-[var(--toss-text-strong)]">
                                Value Proposition
                            </h2>
                            <ul className="mt-4 space-y-3 text-sm text-[var(--toss-text-medium)]">
                                <li>· 데이터 기반 맞춤형 교육 설계</li>
                                <li>· 교육 운영 자동화와 디지털 트래킹</li>
                                <li>· 교육 전후 퍼포먼스 분석 및 피드백</li>
                            </ul>
                        </article>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
