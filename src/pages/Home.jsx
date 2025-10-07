import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NoticeSlider from "../components/NoticeSlider";
import FeatureBoxes from "../components/FeatureBoxes";

// Home 컴포넌트는 메인 랜딩 페이지 레이아웃과 주요 섹션을 구성합니다.
export default function Home() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />

            <main className="flex-1">
                <section className="px-6 pb-16 pt-20">
                    <div className="toss-container">
                        <div className="toss-hero toss-gradient">
                            <div className="mx-auto flex flex-col items-center text-center">
                                <span className="toss-tag">교육 컨설팅 전문</span>
                                <h1 className="toss-hero-title mt-6">
                                    HRnC와 함께<br className="hidden sm:block" /> 성장의 속도를 높이세요
                                </h1>
                                <p className="toss-hero-subtitle mt-6">
                                    진로, 취업, 창업 그리고 조직문화까지. 필요한 교육을
                                    Toss처럼 간결하고 명확한 경험으로 제공합니다.
                                </p>
                                <div className="mt-10 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
                                    <Link to="/education" className="toss-primary-btn w-full sm:w-auto">
                                        교육 프로그램 둘러보기
                                    </Link>
                                    <Link to="/inquiry" className="toss-secondary-btn w-full sm:w-auto">
                                        상담 신청하기
                                    </Link>
                                </div>
                                <dl className="mt-12 grid w-full gap-6 text-left sm:grid-cols-3">
                                    <div className="rounded-2xl border border-white/40 bg-white/70 px-6 py-5 backdrop-blur duration-200 hover:-translate-y-1 hover:shadow-lg">
                                        <dt className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--toss-text-weak)]">
                                            Programs
                                        </dt>
                                        <dd className="mt-3 text-2xl font-bold text-[var(--toss-text-strong)]">
                                            30+
                                        </dd>
                                        <p className="mt-1 text-sm text-[var(--toss-text-medium)]">
                                            대학·기업 맞춤형 커리큘럼
                                        </p>
                                    </div>
                                    <div className="rounded-2xl border border-white/40 bg-white/70 px-6 py-5 backdrop-blur duration-200 hover:-translate-y-1 hover:shadow-lg">
                                        <dt className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--toss-text-weak)]">
                                            Satisfaction
                                        </dt>
                                        <dd className="mt-3 text-2xl font-bold text-[var(--toss-text-strong)]">
                                            98%
                                        </dd>
                                        <p className="mt-1 text-sm text-[var(--toss-text-medium)]">
                                            고객사/교육생 만족도 지표
                                        </p>
                                    </div>
                                    <div className="rounded-2xl border border-white/40 bg-white/70 px-6 py-5 backdrop-blur duration-200 hover:-translate-y-1 hover:shadow-lg">
                                        <dt className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--toss-text-weak)]">
                                            Partners
                                        </dt>
                                        <dd className="mt-3 text-2xl font-bold text-[var(--toss-text-strong)]">
                                            120+
                                        </dd>
                                        <p className="mt-1 text-sm text-[var(--toss-text-medium)]">
                                            대학 및 기업 파트너 네트워크
                                        </p>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="px-6 pb-20">
                    <div className="toss-container space-y-6">
                        <div className="flex flex-col items-start gap-3 text-left">
                            <span className="toss-tag">What we do</span>
                            <h2 className="toss-section-title">
                                Toss처럼 명확한 교육 경험을 설계합니다
                            </h2>
                            <p className="max-w-3xl text-base text-[var(--toss-text-medium)]">
                                복잡한 교육 과정을 심플하게 정리해 가장 중요한 본질에 집중합니다.
                                이해하기 쉬운 언어와 구조로 교육의 전 과정을 함께 설계합니다.
                            </p>
                        </div>
                        <FeatureBoxes />
                    </div>
                </section>

                <section className="bg-white/60 py-20">
                    <div className="toss-container space-y-8">
                        <div className="flex flex-col gap-3 text-left sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <span className="toss-tag">Archive</span>
                                <h2 className="toss-section-title mt-3">최근 교육 스냅샷</h2>
                                <p className="mt-3 text-base text-[var(--toss-text-medium)]">
                                    현장의 생생한 순간과 후기를 확인해보세요.
                                </p>
                            </div>
                            <Link to="/photos" className="toss-secondary-btn h-11 px-6 text-sm">
                                전체 보기
                            </Link>
                        </div>
                        <NoticeSlider />
                    </div>
                </section>
            </main>

            <section className="border-y border-[var(--toss-border)] bg-white/70 py-16">
                <div className="toss-container flex flex-col gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
                    <div>
                        <span className="toss-tag">Contact</span>
                        <h2 className="toss-section-title mt-4">
                            지금 바로 HRnC와 연결되어 보세요
                        </h2>
                        <p className="mt-3 text-base text-[var(--toss-text-medium)]">
                            사업 문의부터 커스텀 교육 설계까지 빠르게 응답해드립니다.
                        </p>
                    </div>
                    <Link
                        to="/education"
                        className="toss-primary-btn w-full max-w-xs self-center md:self-auto"
                    >
                        프로그램 제안서 받기
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}
