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
                    title="대학 프로그램"
                    eyebrow="Program Overview"
                    description={
                        <>
                            마음에서 시작되는 지속가능한 성장.
                            <br />
                            <br />
                            자신감을 회복하고, 내면의 힘을 키우는 교육. 성장의 방향을 찾고, 변화의 힘을 키우는 교육.
                            우리는 개인의 성장을 사회의 성장으로 연결하는 지속가능한 교육 생태계를 만들어갑니다.
                            {/*스스로의 가능성을 믿고 나아갈 때, 기업은 혁신으로 성장하고, 사회는 더 따뜻하고 단단해집니다.*/}
                        </>
                    }
                         />
                <EducationPrograms />
            </main>

            <Footer />
        </div>
    );
}
