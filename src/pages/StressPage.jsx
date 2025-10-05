import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EducationTabs from "../components/EducationTabs";
import EducationHero from "../components/EducationHero";
import EducationPrograms from "../components/EducationPrograms";
import Breadcrumb from "../components/Breadcrumb.jsx";

export default function StressPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            {/* 페이지 타이틀 */}
            <section className="text-center py-10 border-b">
                <h1 className="text-3xl font-bold">스트레스 관리</h1>
            </section>

            <Breadcrumb
                items={[
                    { label: "홈", to: "/index" },
                    { label: "스트레스 관리" }, // 현재 페이지 → 링크 없음
                ]}
            />
            <EducationHero />

            <Footer />
        </div>
    );
}
