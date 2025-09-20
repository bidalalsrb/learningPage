import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EducationTabs from "../components/EducationTabs";
import EducationHero from "../components/EducationHero";
import EducationPrograms from "../components/EducationPrograms";

export default function EducationPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            {/* 페이지 타이틀 */}
            <section className="text-center py-10 border-b">
                <h1 className="text-3xl font-bold">교육 프로그램</h1>
            </section>

            <EducationTabs />
            <EducationHero />
            <EducationPrograms />

            <Footer />
        </div>
    );
}
