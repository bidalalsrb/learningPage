import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FaCog, FaPlus } from "react-icons/fa";
import DetailCard from "./DetailCard";
import ProgramDetailModal from "./ProgramDetailModal";
import api from "../utils/api.js";

const TARGET_LABEL = {
    UNIVERSITY: "대학 프로그램",
    COMPANY: "기업 프로그램",
};

const CATEGORY_TYPE_LABEL = {
    CAREER: "진로",
    JOB: "취업",
    STARTUP: "창업",
};

const CATEGORY_ORDER = [
    { target: "UNIVERSITY", type: "CAREER" },
    { target: "UNIVERSITY", type: "JOB" },
    { target: "UNIVERSITY", type: "STARTUP" },
    { target: "COMPANY", type: "CAREER" },
    { target: "COMPANY", type: "JOB" },
    { target: "COMPANY", type: "STARTUP" },
];

const buildEmptyCategories = () =>
    CATEGORY_ORDER.map(({ target, type }) => ({
        title: CATEGORY_TYPE_LABEL[type] ?? type,
        type,
        target,
        items: [],
    }));

const buildCategoriesFromPrograms = (programs, resolveImageUrl) => {
    const categoryMap = new Map(
        CATEGORY_ORDER.map(({ target, type }) => [
            `${target}-${type}`,
            {
                title: CATEGORY_TYPE_LABEL[type] ?? type,
                type,
                target,
                items: [],
            },
        ])
    );

    programs.forEach((program) => {
        if (!program || !program.type || !program.target) {
            return;
        }
        const key = `${program.target}-${program.type}`;
        if (!categoryMap.has(key)) {
            categoryMap.set(key, {
                title: CATEGORY_TYPE_LABEL[program.type] ?? program.type,
                type: program.type,
                target: program.target,
                items: [],
            });
        }
        const rawImages = Array.isArray(program.imageUrls)
            ? program.imageUrls.filter(Boolean)
            : [];
        if (program.imageUrl && !rawImages.includes(program.imageUrl)) {
            rawImages.unshift(program.imageUrl);
        }
        const images = rawImages.map((path, index) => ({
            id: `program-image-${program.id}-${index}`,
            preview: resolveImageUrl(path),
            storedPath: path,
            persisted: true,
        }));
        const item = {
            id: program.id,
            name: program.name,
            desc: program.description,
            images,
        };
        categoryMap.get(key).items.push(item);
    });

    return CATEGORY_ORDER.map(({ target, type }) => categoryMap.get(`${target}-${type}`));
};

export default function EducationPrograms() {
    const [selectedItem, setSelectedItem] = useState(null);
    const [editItem, setEditItem] = useState(null);
    const [addItemModal, setAddItemModal] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);
    const hasToken = !!localStorage.getItem("ACCESS_TOKEN");

    const [categories, setCategories] = useState(() => buildEmptyCategories());

    const resolveImageUrl = useCallback((path) => {
        if (!path) return "";
        if (/^https?:\/\//i.test(path) || path.startsWith("data:")) {
            return path;
        }
        let normalized = String(path).replace(/\\/g, "/").trim();
        if (!normalized) {
            return "";
        }
        normalized = normalized.replace(/^\/+/, "");
        const base = (api.defaults.baseURL || "").replace(/\/+$/, "");
        return base ? `${base}/${normalized}` : `/${normalized}`;
    }, []);

    const fetchPrograms = useCallback(async () => {
        try {
            const res = await api.get("/api/edu-programs");
            const list = Array.isArray(res.data) ? res.data : [];
            const built = buildCategoriesFromPrograms(list, resolveImageUrl);
            setCategories(built);
        } catch (err) {
            console.error("프로그램 불러오기 실패:", err);
            setCategories(buildEmptyCategories());
        }
    }, [resolveImageUrl]);

    useEffect(() => {
        fetchPrograms();
    }, [fetchPrograms]);

    const handleSave = async (newData, categoryArg) => {
        const category = categoryArg || currentCategory;
        if (!category) return;
        try {
            const formData = new FormData();
            const title = (newData.title || "").trim();
            const description = (newData.description || "").trim();

            if (!title || !description) {
                alert("제목과 내용을 입력해주세요.");
                return;
            }

            formData.append("title", title);
            formData.append("description", description);
            formData.append("type", category.type);
            formData.append("target", category.target);

            if (Array.isArray(newData.images)) {
                newData.images.forEach((image) => {
                    if (image?.file) {
                        formData.append("images", image.file);
                    } else if (image?.persisted && image?.storedPath) {
                        formData.append("existingImages", image.storedPath);
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
                                            key={`${target}-${cat.type}`}
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
                                                        key={`${cat.type}-${item.id ?? idx}`}
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
                                                                    images: (item.images || []).map(
                                                                        (image, imageIdx) => ({
                                                                            ...image,
                                                                            id:
                                                                                image.id ||
                                                                                `${item.id}-image-${imageIdx}`,
                                                                        })
                                                                    ),
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
                                                                        images: (item.images || []).map(
                                                                            (image, imageIdx) => ({
                                                                                ...image,
                                                                                id:
                                                                                    image.id ||
                                                                                    `${item.id}-image-${imageIdx}`,
                                                                            })
                                                                        ),
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

            <ProgramDetailModal
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
