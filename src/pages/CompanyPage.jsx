import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EducationHero from "../components/EducationHero";
import Breadcrumb from "../components/Breadcrumb.jsx";
import CompanyIntro from "../components/CompanyIntro.jsx";

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
                <CompanyIntro
                    title={
                        <>
                            안녕하십니까
                            <br />
                            한국ESG리더십교육협회 한진아 입니다.
                        </>
                    }
                    eyebrow="회사 소개"
                    description="우리 협회는 ESG(Environment, Social, Governance)를 지속 가능한 발전을 위한 핵심 가치로 인식하며, 이를 실현하기 위해 노력하고 있습니다.
ESG는 단순한 경영 전략이 아닌, 모든 조직과 개인이 함께 만들어가야 할 미래의 필수 요소입니다.

우리 협회는 ESG 경영 철학을 바탕으로 사회적 책임, 환경적 지속 가능성, 윤리적 경영을 실천하며, 이를 통해 ESG 가치를 확산시키고 실질적인 변화를 이끌고자 합니다.
앞으로도 ESG 교육과 다양한 활동을 통해 개인과 사회, 기업이 함께 성장할 수 있는 환경을 만들어가겠습니다.

감사합니다."/>

                {/*<section className="px-6 pb-16">
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
                </section>*/}
                <section className="px-6 pb-16">
                    <div className="toss-container">
                        <div className="surface-card rounded-3xl border border-[var(--toss-border)] p-10 text-center md:text-left">
                           <img src="/org.png" alt='조직도'/>
                        </div>
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
}
