import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NoticeSlider from "../components/NoticeSlider";
import FeatureBoxes from "../components/FeatureBoxes";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />

            {/* Hero Section */}
            <section className="text-center px-6 py-24 max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
                    HRnC 교육컨설팅과 함께
                    <br /> 새로운 성장의 길을 열어가세요
                </h1>
                <p className="mt-6 text-lg text-gray-600">
                    진로, 취업, 창업까지 맞춤형 교육 프로그램을 제공합니다.
                    기업과 개인 모두의 성장을 지원합니다.
                </p>
                <div className="mt-10 flex justify-center gap-4">
                    <Link
                        to="/education"
                        className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                        교육 프로그램 보기
                    </Link>
                    <Link
                        to="/inquiry"
                        className="px-8 py-3 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition"
                    >
                        문의하기
                    </Link>
                </div>
            </section>

            <section className="px-6 md:px-12 py-20">
                <h2 className="text-2xl font-bold text-center mb-12">주요 서비스</h2>
                <FeatureBoxes />
            </section>

            <section className="px-6 md:px-12 py-20">
                <NoticeSlider />
            </section>

            <Footer />
        </div>
    );
}
