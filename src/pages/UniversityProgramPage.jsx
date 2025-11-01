import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EducationHero from "../components/EducationHero";
import EducationPrograms from "../components/EducationPrograms";
import Breadcrumb from "../components/Breadcrumb.jsx";

// UniversityProgramPage 컴포넌트는 대학 대상 교육 프로그램 전용 화면을 제공합니다.
export default function UniversityProgramPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <Breadcrumb
                items={[
                    { label: "홈", to: "/index" },
                    { label: "대학 프로그램" },
                ]}
            />

            <main className="flex-1">
                <EducationHero
                    eyebrow="University Program"
                    title="대학 특화 교육 프로그램"
                    description={
                        <>
                            학년과 진로 단계에 맞는 커리큘럼으로 청년의 성장을 촉진합니다.
                            <br />
                            <br />
                            고맞고 프로그램부터 캠프까지, 학생과 졸업생을 위한 체계적인 교육 여정을 경험해보세요.
                        </>
                    }
                />
                <EducationPrograms targetFilter="UNIVERSITY" />
            </main>

            <Footer />
        </div>
    );
}
