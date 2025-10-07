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
            items: [],
        },
        {
            title: "취업",
            type: "JOB",
            target: "UNIVERSITY",
            items: [],
        },
        {
            title: "창업",
            type: "STARTUP",
            target: "COMPANY",
            items: [],
        },
    ]);

    useEffect(() => {
        fetchPrograms();
    }, []);

    const fetchPrograms = async () => {
        try {
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
            formData.append("link", newData.link || "");
            formData.append("type", category.type);
            formData.append("target", category.target);

            if (newData.image instanceof File) {
                formData.append("image", newData.image);
            }

            if (newData.id) {
                await api.put(`/api/edu-programs/${newData.id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                await api.post("/api/edu-programs", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
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

                                            <ul className="space-y-3">
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
                                                                    title: item.name,
                                                                    description: item.desc,
                                                                    image: item.img,
                                                                    link: item.link,
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
                                                                        image: item.img,
                                                                        link: item.link,
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
            />

            <DetailCard
                isOpen={addItemModal}
                onClose={() => setAddItemModal(false)}
                item={{ title: "", description: "", image: "" }}
                editable={true}
                onSave={(newData) => handleSave(newData, currentCategory)}
            />
        </>
    );
}
