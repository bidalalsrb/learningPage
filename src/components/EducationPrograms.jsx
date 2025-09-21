import React, { useState } from "react";
import ModalCard from "./ModalCard";

export default function EducationPrograms() {
    const [selectedItem, setSelectedItem] = useState(null);

    const categories = [
        {
            title: "진로",
            items: [
                {
                    name: "진로·학업적성검사(중/고/대학생)",
                    desc: "학생들의 학업 성향과 적성을 종합적으로 분석합니다.",
                    img: "/educ1_1.jpg",
                    link: "https://example.com/career1",
                },
                {
                    name: "진로탐색과 Quantum진단(청소년/대학생)",
                    desc: "진로 탐색을 돕는 첨단 진단 프로그램.",
                    img: "/educ1_2.jpg",
                    link: "https://example.com/career2",
                },
                {
                    name: "진로상담 및 진로코칭",
                    desc: "진로 전문가와의 1:1 코칭 프로그램.",
                    img: "/images/career3.jpg",
                    link: "https://example.com/career3",
                },
                {
                    name: "대학생 핵심역량 진단",
                    desc: "대학생들의 역량을 종합적으로 평가합니다.",
                    img: "/images/career4.jpg",
                    link: "https://example.com/career4",
                },
                {
                    name: "중·고·대학생 자기이해 프로그램",
                    desc: "자기이해를 바탕으로 진로를 설계합니다.",
                    img: "/images/career5.jpg",
                    link: "https://example.com/career5",
                },
            ],
        },
        {
            title: "취업",
            items: [
                {
                    name: "취업 로드맵",
                    desc: "대학생 및 일반인을 위한 맞춤형 취업 전략.",
                    img: "/educ1_1.jpg",
                    link: "https://example.com/job1",
                },
                {
                    name: "자기소개서 / 이력서 컨설팅",
                    desc: "전문가의 피드백으로 문서 완성도를 높입니다.",
                    img: "/educ1_2.jpg",
                    link: "https://example.com/job2",
                },
                {
                    name: "NCS기반 직무역량 진단",
                    desc: "직무에 필요한 핵심 역량을 분석합니다.",
                    img: "/images/job3.jpg",
                    link: "https://example.com/job3",
                },
                {
                    name: "모의면접 & 이미지 메이킹",
                    desc: "실전 대비 면접 훈련 프로그램.",
                    img: "/images/job4.jpg",
                    link: "https://example.com/job4",
                },
                {
                    name: "직무·기업분석 프로그램",
                    desc: "희망 기업의 직무 분석 및 전략적 준비.",
                    img: "/images/job5.jpg",
                    link: "https://example.com/job5",
                },
            ],
        },
        {
            title: "창업",
            items: [
                {
                    name: "창업기초과정",
                    desc: "처음 창업을 준비하는 사람을 위한 기초 교육.",
                    img: "/educ8_1.jpg",
                    link: "https://example.com/startup1",
                },
                {
                    name: "창업 아이디어 발굴",
                    desc: "창업 아이디어를 구체화하는 워크숍.",
                    img: "/educ8_2.jpg",
                    link: "https://example.com/startup2",
                },
                {
                    name: "창업멘토링",
                    desc: "전문가 멘토와의 1:1 창업 상담.",
                    img: "/images/startup3.jpg",
                    link: "https://example.com/startup3",
                },
            ],
        },
        {
            title: "기타",
            items: [
                {
                    name: "취업·직무 역량검사",
                    desc: "다양한 검사로 역량 수준을 진단합니다.",
                    img: "/images/etc1.jpg",
                    link: "https://example.com/etc1",
                },
                {
                    name: "성격검사 및 심리검사",
                    desc: "심리학 기반 성격 유형 검사.",
                    img: "/images/etc2.jpg",
                    link: "https://example.com/etc2",
                },
                {
                    name: "교수·학습법 컨설팅",
                    desc: "효율적인 교수·학습 전략을 제안합니다.",
                    img: "/images/etc3.jpg",
                    link: "https://example.com/etc3",
                },
                {
                    name: "조직·리더십진단, 교육·역량평가 프로그램",
                    desc: "조직 및 리더십 역량 평가 솔루션.",
                    img: "/images/etc4.jpg",
                    link: "https://example.com/etc4",
                },
            ],
        },
        {
            title: "Solution 5%",
            items: [
                {
                    name: "NCS기반 자기소개서 맞춤코칭",
                    desc: "취업 준비생 맞춤형 자기소개서 코칭.",
                    img: "/images/sol1.jpg",
                    link: "https://example.com/sol1",
                },
                {
                    name: "맞춤형 모의면접",
                    desc: "실제 상황을 반영한 모의면접.",
                    img: "/images/sol2.jpg",
                    link: "https://example.com/sol2",
                },
                {
                    name: "실전집중취업스터디/Interview",
                    desc: "스터디 그룹을 통한 집중 면접 준비.",
                    img: "/images/sol3.jpg",
                    link: "https://example.com/sol3",
                },
            ],
        },
    ];

    return (
        <section className="max-w-7xl mx-auto px-6 py-12 flex-1">
            {/* 헤더 */}
            <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-bold">교육 프로그램 카테고리</h2>
                {/*<button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">*/}
                {/*    교육문의*/}
                {/*</button>*/}
            </div>

            {/* 카드 레이아웃 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categories.map((cat, idx) => (
                    <div
                        key={idx}
                        className="bg-white rounded-lg shadow hover:shadow-md transition p-6"
                    >
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">
                            {cat.title}
                        </h3>
                        <ul className="space-y-3">
                            {cat.items.map((item, i) => (
                                <li
                                    key={i}
                                    className="cursor-pointer p-3 rounded hover:bg-gray-50 transition"
                                    onClick={() =>
                                        setSelectedItem({
                                            title: item.name,
                                            description: item.desc,
                                            image: item.img,
                                            link: item.link,
                                        })
                                    }
                                >
                                    <p className="font-medium text-gray-700">{item.name}</p>
                                    <p className="text-xs text-gray-500">{item.desc}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* 모달 */}
            <ModalCard
                isOpen={!!selectedItem}
                onClose={() => setSelectedItem(null)}
                title={selectedItem?.title}
                description={selectedItem?.description}
                image={selectedItem?.image}
                link={'/inquiry'}
            />
        </section>
    );
}
