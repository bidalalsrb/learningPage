import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EducationHero from "../components/EducationHero";
import EducationPrograms from "../components/EducationPrograms";
import Breadcrumb from "../components/Breadcrumb.jsx";

// CompanyProgramPage 컴포넌트는 기업 대상 교육 프로그램 전용 화면을 제공합니다.
export default function CompanyProgramPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <Breadcrumb
                items={[
                    { label: "홈", to: "/index" },
                    { label: "기업 프로그램" },
                ]}
            />

            <main className="flex-1">
                <EducationHero
                    eyebrow="Corporate Program"
                    title="기업 맞춤 교육 프로그램"
                    description={
                        <>
                            조직의 성과를 높이는 실무 중심 교육을 설계합니다.
                            <br />
                            <br />
                            취업, 창업, 진로 등 기업 파트너와 함께 성장할 수 있는 전문 프로그램을 확인해보세요.
                        </>
                    }
                />
                <EducationPrograms targetFilter="COMPANY" />
            </main>

            <Footer />
        </div>
    );
}
