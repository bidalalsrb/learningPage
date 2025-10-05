import React, { useState } from "react";
import DetailCard from "./DetailCard"; // ✅ ModalCard → DetailCard 교체
import {FaCog, FaPlus} from "react-icons/fa";

export default function EducationPrograms() {
    const [selectedItem, setSelectedItem] = useState(null); // 상세 보기용
    const [editItem, setEditItem] = useState(null); // 수정 모달용
    const [addItemModal, setAddItemModal] = useState(false);
    const hasToken = !!localStorage.getItem("ACCESS_TOKEN");

    const [categories, setCategories] = useState([
        {
            title: "진로",
            items: [
                {
                    name: "진로·학업적성검사(중/고/대학생)",
                    desc: "학생들의 학업 성향과 적성을 종합적으로 분석합니다.",
                    img: "/educ1_1.jpg",
                    link: "https://example.com/career1",
                },   {
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
    ]);

    // 저장 핸들러 (실제 API 연동은 여기서 처리)
    const handleSave = (newData) => {
        console.log("저장된 데이터:", newData);
        alert("수정 완료 (API 연동 필요)");
        setEditItem(null);
    };

    // 추가 핸들러 (진로 카테고리에만 적용)
    const handleAdd = (newItem) => {
        setCategories((prev) =>
            prev.map((cat) =>
                cat.title === "진로"
                    ? { ...cat, items: [...cat.items, newItem].slice(0, 5) } // ✅ 최대 5개 제한
                    : cat
            )
        );
        setAddItemModal(false);
    };

    return (
        <>
            {/* 대학 섹션 */}
            <section className="max-w-7xl mx-auto px-6 py-12 flex-1">
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-2xl font-bold">대학</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((cat, idx) => (
                        <div key={idx} className="bg-white rounded-lg shadow hover:shadow-md transition p-6">
                            {/* 카테고리 타이틀 + + 버튼 */}
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {cat.title}
                                </h3>
                                { hasToken && (
                                    <button
                                        onClick={() => setAddItemModal(true)}
                                        className="ml-2 p-1 rounded-full  text-gray-500 hover:text-blue-500"
                                    >
                                        <FaPlus size={18} />
                                    </button>
                                )}
                            </div>
                            <ul className="space-y-3 max-h-100 overflow-y-auto pr-2">
                                {cat.items.map((item, i) => (
                                    <li
                                        key={i}
                                        className="flex justify-between items-center p-3 rounded hover:bg-gray-50 transition"
                                    >
                                        {/* 상세 보기 */}
                                        <div
                                            className="cursor-pointer"
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
                                        </div>

                                        {/* 수정 아이콘 */}
                                        {hasToken && (
                                            <button
                                                onClick={() =>
                                                    setEditItem({
                                                        title: item.name,
                                                        description: item.desc,
                                                        image: item.img,
                                                        link: item.link,
                                                    })
                                                }
                                                className="ml-3 text-gray-400 hover:text-blue-500"
                                            >
                                                <FaCog size={18} />
                                            </button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* 기업 섹션 */}
            <section className="max-w-7xl mx-auto px-6 pt-0 pb-12 flex-1">
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-2xl font-bold">기업</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((cat, idx) => (
                        <div key={idx} className="bg-white rounded-lg shadow hover:shadow-md transition p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {cat.title}
                                </h3>
                                { hasToken && (
                                    <button
                                        onClick={() => setAddItemModal(true)}
                                        className="ml-2 p-1 rounded-full  text-gray-500 hover:text-blue-500"
                                    >
                                        <FaPlus size={18} />
                                    </button>
                                )}
                            </div>
                            <ul className="space-y-3 max-h-100 overflow-y-auto pr-2">
                                {cat.items.map((item, i) => (
                                    <li
                                        key={i}
                                        className="flex justify-between items-center p-3 rounded hover:bg-gray-50 transition"
                                    >
                                        <div
                                            className="cursor-pointer"
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
                                        </div>
                                        {hasToken && (
                                            <button
                                                onClick={() =>
                                                    setEditItem({
                                                        title: item.name,
                                                        description: item.desc,
                                                        image: item.img,
                                                        link: item.link,
                                                    })
                                                }
                                                className="ml-3 text-gray-400 hover:text-blue-500"
                                            >
                                                <FaCog size={18} />
                                            </button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* 상세 보기 모달 */}
            <DetailCard
                isOpen={!!selectedItem}
                onClose={() => setSelectedItem(null)}
                item={selectedItem}
            />

            {/* 수정 모달 */}
            <DetailCard
                isOpen={!!editItem}
                onClose={() => setEditItem(null)}
                item={editItem}
                editable={true}
                onSave={handleSave}
            />
            {/* 추가 모달 */}
            <DetailCard
                isOpen={addItemModal}
                onClose={() => setAddItemModal(false)}
                item={{ title: "", description: "", image: "" }}
                editable={true}
                onSave={handleAdd}
            />
        </>
    );
}
