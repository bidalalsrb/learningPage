import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EducationTabs from "../components/EducationTabs";
import EducationHero from "../components/EducationHero";
import EducationPrograms from "../components/EducationPrograms";
import Breadcrumb from "../components/Breadcrumb.jsx";

// EducationPage 컴포넌트는 교육 프로그램 소개 화면을 구성합니다.
export default function EducationPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <Breadcrumb
                items={[
                    { label: "홈", to: "/index" },
                    { label: "교육 프로그램" }, // 현재 페이지 → 링크 없음
                ]}
            />

            <main className="flex-1">
                <EducationHero
                    title="교육 프로그램"
                    eyebrow="Program Overview"
                    description="HRnC는 학습자의 여정을 기준으로 다양한 맞춤형 교육을 설계합니다. 목적에 맞는 커리큘럼과 운영 전략을 제공합니다."
                />
                <EducationPrograms />
            </main>

            <Footer />
        </div>
    );
}
