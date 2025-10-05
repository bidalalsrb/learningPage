import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EducationTabs from "../components/EducationTabs";
import EducationHero from "../components/EducationHero";
import EducationPrograms from "../components/EducationPrograms";
import Breadcrumb from "../components/Breadcrumb.jsx";

export default function CompanyPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            {/* 페이지 타이틀 */}
            <section className="text-center py-10 border-b">
                <h1 className="text-3xl font-bold">회사 소개</h1>
            </section>

            <Breadcrumb
                items={[
                    { label: "홈", to: "/index" },
                    { label: "회사 소개" }, // 현재 페이지 → 링크 없음
                ]}
            />
            <EducationHero />

            <Footer />
        </div>
    );
}
