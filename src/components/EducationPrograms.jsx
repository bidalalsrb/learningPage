import React, { useEffect, useMemo, useState } from "react";
import { FaCog, FaPlus } from "react-icons/fa";
import DetailCard from "./DetailCard";
import api from "../utils/api.js";

const TARGET_LABEL = {
    UNIVERSITY: "대학 프로그램",
    COMPANY: "기업 프로그램",
};

export default function EducationPrograms() {
    const [selectedItem, setSelectedItem] = useState(null);
    const [editItem, setEditItem] = useState(null);
    const [addItemModal, setAddItemModal] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);
    const hasToken = !!localStorage.getItem("ACCESS_TOKEN");

    const [categories, setCategories] = useState([
        {
            title: "진로",
            type: "CAREER",
            target: "UNIVERSITY",
            items: [
                { id: "uni-career-1", name: "로드맵 디자인 세션", desc: "1:1 코칭으로 진로 방향을 설계합니다.", images: [] },
                { id: "uni-career-2", name: "미래 직무 탐색 워크숍", desc: "산업별 직무를 심플하게 비교·이해합니다.", images: [] },
                { id: "uni-career-3", name: "포트폴리오 클리닉", desc: "핵심 역량을 압축해 포트폴리오를 완성합니다.", images: [] },
                { id: "uni-career-4", name: "커리어 멘토링 데이", desc: "현직자와의 라운드 테이블 멘토링 프로그램.", images: [] },
                { id: "uni-career-5", name: "진로 설계 101", desc: "학년별 커리어 구축 전략을 안내합니다.", images: [] },
                { id: "uni-career-6", name: "직무 적합도 테스트", desc: "데이터 기반 진단으로 나에게 맞는 직무를 탐색합니다.", images: [] },
            ],
        },
        {
            title: "취업",
            type: "JOB",
            target: "UNIVERSITY",
            items: [
                { id: "uni-job-1", name: "AI 시대 이력서 쓰기", desc: "Toss 포맷처럼 간결한 이력서를 완성합니다.", images: [] },
                { id: "uni-job-2", name: "모의 면접 실전반", desc: "실제 면접 환경을 재현해 피드백을 제공합니다.", images: [] },
                { id: "uni-job-3", name: "직무 프로젝트 챌린지", desc: "기업 과제를 기반으로 실무 감각을 높입니다.", images: [] },
                { id: "uni-job-4", name: "채용 트렌드 브리핑", desc: "최신 채용 데이터를 직관적으로 정리해 공유합니다.", images: [] },
                { id: "uni-job-5", name: "커버레터 단권화", desc: "지원 동기를 스토리라인으로 정리합니다.", images: [] },
                { id: "uni-job-6", name: "온라인 네트워킹 데이", desc: "채용 담당자와 실시간 Q&A 세션을 진행합니다.", images: [] },
            ],
        },
        {
            title: "창업",
            type: "STARTUP",
            target: "UNIVERSITY",
            items: [
                { id: "uni-startup-1", name: "아이디어 해커톤", desc: "48시간 안에 비즈니스 모델을 구체화합니다.", images: [] },
                { id: "uni-startup-2", name: "MVP 프로토타이핑", desc: "간단한 프로토타입 제작을 체험합니다.", images: [] },
                { id: "uni-startup-3", name: "투자 IR 스프린트", desc: "투자자를 설득하는 피치덱을 완성합니다.", images: [] },
                { id: "uni-startup-4", name: "창업 법률 기초", desc: "법인 설립과 지적재산권을 이해합니다.", images: [] },
                { id: "uni-startup-5", name: "시장 검증 인터뷰", desc: "고객 인터뷰 방법과 검증 프로세스를 실습합니다.", images: [] },
                { id: "uni-startup-6", name: "스타트업 운영 툴킷", desc: "초기 운영에 필요한 핵심 도구를 익힙니다.", images: [] },
            ],
        },
        {
            title: "진로",
            type: "CAREER",
            target: "COMPANY",
            items: [
                { id: "corp-career-1", name: "사내 커리어 라운지", desc: "구성원 경력 전환을 지원하는 1:1 상담 프로그램.", images: [] },
                { id: "corp-career-2", name: "역량 맵핑 워크숍", desc: "조직 직무 체계를 간결하게 리디자인합니다.", images: [] },
                { id: "corp-career-3", name: "미드커리어 코칭", desc: "중견 인재의 커리어 피벗을 돕습니다.", images: [] },
                { id: "corp-career-4", name: "리더 커리어 케어", desc: "리더십 전환기를 준비하는 집중 코칭.", images: [] },
                { id: "corp-career-5", name: "커리어 페스티벌", desc: "사내 전문가와의 토크세션으로 동기부여를 강화합니다.", images: [] },
                { id: "corp-career-6", name: "역량 진단 리포트", desc: "데이터 기반으로 개인·조직 역량을 시각화합니다.", images: [] },
            ],
        },
        {
            title: "취업",
            type: "JOB",
            target: "COMPANY",
            items: [
                { id: "corp-job-1", name: "캠퍼스 리크루팅 패키지", desc: "대학 채용 브랜딩을 일괄 설계합니다.", images: [] },
                { id: "corp-job-2", name: "채용 담당자 아카데미", desc: "데이터 기반 채용 운영 역량을 높입니다.", images: [] },
                { id: "corp-job-3", name: "직무 적응 부트캠프", desc: "신입 구성원의 온보딩 경험을 개선합니다.", images: [] },
                { id: "corp-job-4", name: "인터뷰어 트레이닝", desc: "면접관 스킬을 심플하게 정리해 훈련합니다.", images: [] },
                { id: "corp-job-5", name: "Hire 데이터 인사이트", desc: "채용 성과 지표를 시각화해 리포트합니다.", images: [] },
                { id: "corp-job-6", name: "사내 인재 추천 제도", desc: "레퍼럴 프로그램을 설계·운영합니다.", images: [] },
            ],
        },
        {
            title: "창업",
            type: "STARTUP",
            target: "COMPANY",
            items: [
                { id: "corp-startup-1", name: "사내벤처 랩", desc: "내부 아이디어를 사업화로 연결합니다.", images: [] },
                { id: "corp-startup-2", name: "오픈이노베이션 매칭", desc: "스타트업과의 협업 구조를 설계합니다.", images: [] },
                { id: "corp-startup-3", name: "신사업 MVP 만들기", desc: "4주 스프린트로 초기 서비스를 구체화합니다.", images: [] },
                { id: "corp-startup-4", name: "디지털 전환 워크숍", desc: "DT 전략과 실무 사례를 압축 학습합니다.", images: [] },
                { id: "corp-startup-5", name: "투자 검토 스쿨", desc: "스타트업 투자 심사 역량을 강화합니다.", images: [] },
                { id: "corp-startup-6", name: "액셀러레이팅 패키지", desc: "후속 투자를 위한 프로그램을 제공합니다.", images: [] },
            ],
        },
    ]);

    useEffect(() => {
        fetchPrograms();
    }, []);

    const fetchPrograms = async () => {
        try {
            const token = localStorage.getItem("ACCESS_TOKEN");
            if (!token) {
                return;
            }
            const res = await api.get("/api/edu-programs");
            console.log("programs", res);
            // setCategories(res.data);
        } catch (err) {
            console.error("프로그램 불러오기 실패:", err);
        }
    };

    const handleSave = async (newData, categoryArg) => {
        const category = categoryArg || currentCategory;
        if (!category) return;
        try {
            const formData = new FormData();
            formData.append("name", newData.title);
            formData.append("description", newData.description);
            formData.append("type", category.type);
            formData.append("target", category.target);

            if (Array.isArray(newData.images)) {
                newData.images.forEach((image) => {
                    if (image?.file) {
                        formData.append("images", image.file);
                    } else if (image?.persisted && image?.preview) {
                        formData.append("existingImages", image.preview);
                    }
                });
            }

            if (newData.id) {
                await api.put(`/api/edu-programs/${newData.id}`, formData);
            } else {
                await api.post("/api/edu-programs", formData);
            }

            alert("저장 성공 ✅");
            setEditItem(null);
            setAddItemModal(false);
            fetchPrograms();
        } catch (err) {
            console.error("저장 실패:", err);
            alert("저장 실패 ❌");
        }
    };

    const handleDelete = async (programId) => {
        if (!programId) return;
        const confirmed = window.confirm("정말 삭제하시겠습니까?");
        if (!confirmed) return;
        try {
            await api.delete(`/api/edu-programs/${programId}`);
            alert("삭제 성공 ✅");
            setEditItem(null);
            setSelectedItem(null);
            fetchPrograms();
        } catch (err) {
            console.error("삭제 실패:", err);
            alert("삭제 실패 ❌");
        }
    };

    const groupedCategories = useMemo(() => {
        return categories.reduce(
            (acc, cat) => {
                const key = cat.target || "UNIVERSITY";
                acc[key] = acc[key] ? [...acc[key], cat] : [cat];
                return acc;
            },
            {}
        );
    }, [categories]);

    return (
        <>
            {Object.entries(TARGET_LABEL).map(([target, label]) => {
                const list = groupedCategories[target] || [];

                return (
                    <section key={target} className="px-6 py-12">
                        <div className="toss-container space-y-8">
                            <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                                <div>
                                    <span className="toss-tag uppercase">
                                        {target === "UNIVERSITY" ? "University" : "Corporate"}
                                    </span>
                                    <h3 className="toss-section-title mt-3">{label}</h3>
                                    <p className="mt-2 text-sm text-[var(--toss-text-medium)]">
                                        대상과 목적에 맞춰 가장 핵심적인 콘텐츠만 조합합니다.
                                    </p>
                                </div>
                            </header>

                            {list.length === 0 ? (
                                <div className="rounded-3xl border border-dashed border-[var(--toss-border)] bg-white/60 px-10 py-20 text-center text-sm text-[var(--toss-text-weak)]">
                                    아직 등록된 프로그램이 없습니다.
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {list.map((cat) => (
                                        <article
                                            key={`${target}-${cat.title}`}
                                            className="surface-card flex h-full flex-col gap-6 rounded-3xl border border-[var(--toss-border)] p-7"
                                        >
                                            <div className="flex items-center justify-between gap-4">
                                                <div>
                                                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--toss-text-weak)]">
                                                        {target === "UNIVERSITY" ? "Campus" : "Business"}
                                                    </p>
                                                    <h4 className="mt-2 text-xl font-semibold text-[var(--toss-text-strong)]">
                                                        {cat.title}
                                                    </h4>
                                                </div>
                                                {hasToken && (
                                                    <button
                                                        onClick={() => {
                                                            setCurrentCategory(cat);
                                                            setAddItemModal(true);
                                                        }}
                                                        className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--toss-border)] text-[var(--toss-text-medium)] transition hover:border-[var(--toss-primary)] hover:text-[var(--toss-primary)]"
                                                    >
                                                        <FaPlus size={16} />
                                                    </button>
                                                )}
                                            </div>

                                            <ul className="custom-scrollbar space-y-3 max-h-80 overflow-y-auto pr-1">
                                                {cat.items.length === 0 && (
                                                    <li className="rounded-2xl border border-dashed border-[var(--toss-border)] px-4 py-6 text-center text-sm text-[var(--toss-text-weak)]">
                                                        등록된 프로그램이 없습니다.
                                                    </li>
                                                )}
                                                {cat.items.map((item, idx) => (
                                                    <li
                                                        key={`${cat.title}-${idx}`}
                                                        className="group flex items-start justify-between gap-3 rounded-2xl border border-transparent px-4 py-3 transition hover:border-[var(--toss-border)] hover:bg-white"
                                                    >
                                                        <button
                                                            type="button"
                                                            className="text-left"
                                                            onClick={() =>
                                                                setSelectedItem({
                                                                    id: item.id,
                                                                    title: item.name,
                                                                    description: item.desc,
                                                                    images: item.images || [],
                                                                })
                                                            }
                                                        >
                                                            <p className="text-sm font-semibold text-[var(--toss-text-strong)]">
                                                                {item.name}
                                                            </p>
                                                            <p className="text-xs text-[var(--toss-text-medium)]">
                                                                {item.desc}
                                                            </p>
                                                        </button>
                                                        {hasToken && (
                                                            <button
                                                                onClick={() => {
                                                                    setCurrentCategory(cat);
                                                                    setEditItem({
                                                                        id: item.id,
                                                                        title: item.name,
                                                                        description: item.desc,
                                                                        images: item.images || [],
                                                                    });
                                                                }}
                                                                className="text-[var(--toss-text-weak)] transition hover:text-[var(--toss-primary)]"
                                                            >
                                                                <FaCog size={16} />
                                                            </button>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        </article>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>
                );
            })}

            <DetailCard
                isOpen={!!selectedItem}
                onClose={() => setSelectedItem(null)}
                item={selectedItem}
            />

            <DetailCard
                isOpen={!!editItem}
                onClose={() => setEditItem(null)}
                item={editItem}
                editable={true}
                onSave={handleSave}
                onDelete={handleDelete}
            />

            <DetailCard
                isOpen={addItemModal}
                onClose={() => setAddItemModal(false)}
                item={{ title: "", description: "", images: [] }}
                editable={true}
                onSave={(newData) => handleSave(newData, currentCategory)}
            />
        </>
    );
}
