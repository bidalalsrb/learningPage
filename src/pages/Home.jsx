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
                <section className="mt-2 pb-16">
                    <div className="mx-auto flex flex-col items-center text-center">
                        <div className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-lg">
                            <video
                                className="w-full h-full object-cover"
                                src="/main_video.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                            />
                        </div>
                    </div>
                </section>

                <section className="px-6 pb-20">
                    <div className="toss-container space-y-6">
                        <div className="flex flex-col items-start gap-3 text-left">
                            <span className="toss-tag">What we do</span>
                            <h2 className="toss-section-title">
                                사람과 조직이 함께 성장하는 교육 경험을 설계합니다.
                            </h2>
                            <p className="max-w-3xl text-base text-[var(--toss-text-medium)]">
                                진로·취업·리더십 등 개인과 기업의 성장을 잇는 맞춤형 교육 플랫폼입니다.
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
                                <h2 className="toss-section-title mt-3">최근 교육 사진</h2>
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
                            한국ESG리더십교육협회와
                        함께하기
                        </h2>
                        <p className="mt-3 text-base text-[var(--toss-text-medium)]">
                            사업 문의부터 커스텀 교육 설계까지 빠르게 응답해드립니다.
                        </p>
                    </div>
                    <Link
                        to="/inquiry"
                        className="toss-primary-btn w-full max-w-xs self-center md:self-auto"
                    >
                        문의하기
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}
