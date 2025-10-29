import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FaCog, FaPlus } from "react-icons/fa";
import DetailCard from "./DetailCard";
import ProgramDetailModal from "./ProgramDetailModal";
import api from "../utils/api.js";

const TARGET_LABEL = {
    UNIVERSITY: "대학 프로그램",
    COMPANY: "기업 프로그램",
};

const CATEGORY_TYPE_LABEL = {
    CAREER: "고맞고 프로그램",
    JOB: "대학 (저학년) 프로그램",
    STARTUP: "대학 (고학년) 프로그램",
};

const CATEGORY_ORDER = [
    { target: "UNIVERSITY", type: "CAREER" },
    { target: "UNIVERSITY", type: "JOB" },
    { target: "UNIVERSITY", type: "STARTUP" },
    { target: "COMPANY", type: "CAREER" },
    { target: "COMPANY", type: "JOB" },
    { target: "COMPANY", type: "STARTUP" },
];

const CATEGORY_COVER_LABEL = {
    CAREER: "진로 프로그램 대표 이미지",
    JOB: "취업 프로그램 대표 이미지",
    STARTUP: "창업 프로그램 대표 이미지",
};

// buildEmptyCategories 함수는 기본 카테고리 구조를 빈 리스트로 초기화합니다.
const buildEmptyCategories = () =>
    CATEGORY_ORDER.map(({ target, type }) => ({
        title: CATEGORY_TYPE_LABEL[type] ?? type,
        type,
        target,
        items: [],
    }));

// buildCategoriesFromPrograms 함수는 프로그램 목록을 카테고리별로 그룹화합니다.
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
    const coverInputsRef = useRef({});
    const coverImagesRef = useRef({});
    const [coverImages, setCoverImages] = useState({});
    const hasToken = !!localStorage.getItem("ACCESS_TOKEN");

    // getCategoryKey 함수는 카테고리 객체에서 고유 키 문자열을 생성합니다.
    const getCategoryKey = useCallback((cat) => `${cat.target}-${cat.type}`, []);

    // resolveImageUrl 함수는 API 기반 URL을 브라우저에서 접근 가능한 경로로 변환합니다.
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

    // parseCategoryKey 함수는 문자열 키를 target/type 객체로 파싱합니다.
    const parseCategoryKey = useCallback((catKey) => {
        const [target, type] = catKey.split("-");
        return { target, type };
    }, []);

    // resolveCoverPreview 함수는 대표 이미지 데이터에서 미리보기 URL을 찾습니다.
    const resolveCoverPreview = useCallback(
        (data) => {
            if (!data) return null;
            const url = data.url || data.storedPath || "";
            return url ? resolveImageUrl(url) : "";
        },
        [resolveImageUrl]
    );

    const [categories, setCategories] = useState(() => buildEmptyCategories());

    // uploadCover 함수는 선택한 카테고리의 대표 이미지를 서버에 업로드합니다.
    const uploadCover = useCallback(
        async (catKey, file) => {
            const { target, type } = parseCategoryKey(catKey);
            const formData = new FormData();
            formData.append("target", target);
            formData.append("type", type);
            formData.append("image", file);

            const res = await api.post("/api/edu-programs/covers", formData);
            const preview = resolveCoverPreview(res.data);

            return {
                preview,
                storedPath: res.data?.storedPath || null,
                persisted: true,
                originalFilename: res.data?.originalFilename || "",
                isObjectUrl: false,
            };
        },
        [parseCategoryKey, resolveCoverPreview]
    );

    // handleCoverFileChange 함수는 대표 이미지 업로드 전 미리보기와 예외 처리를 담당합니다.
    const handleCoverFileChange = useCallback(
        (catKey, fileList, inputElement) => {
            if (!fileList || fileList.length === 0) {
                return;
            }
            const file = fileList[0];
            if (typeof window === "undefined" || !file) {
                return;
            }

            const previousEntry = coverImagesRef.current[catKey];
            const previewUrl = URL.createObjectURL(file);

            setCoverImages((prev) => ({
                ...prev,
                [catKey]: {
                    file,
                    preview: previewUrl,
                    isObjectUrl: true,
                    persisted: false,
                    uploading: true,
                },
            }));

            const clearInput = () => {
                if (inputElement) {
                    inputElement.value = "";
                }
            };

            const finalizeUpload = async () => {
                try {
                    const uploaded = await uploadCover(catKey, file);
                    if (previewUrl) {
                        URL.revokeObjectURL(previewUrl);
                    }
                    setCoverImages((prev) => ({
                        ...prev,
                        [catKey]: uploaded,
                    }));
                } catch (error) {
                    console.error("대표 이미지 업로드 실패:", error);
                    if (previewUrl) {
                        URL.revokeObjectURL(previewUrl);
                    }
                    setCoverImages((prev) => {
                        const updated = { ...prev };
                        delete updated[catKey];
                        if (previousEntry) {
                            updated[catKey] = previousEntry;
                        }
                        return updated;
                    });
                    alert("대표 이미지 업로드에 실패했습니다. 다시 시도해주세요.");
                }
            };

            clearInput();
            void finalizeUpload();
        },
        [uploadCover]
    );

    // triggerCoverInput 함수는 숨겨진 파일 입력 요소를 클릭합니다.
    const triggerCoverInput = useCallback((catKey) => {
        const target = coverInputsRef.current[catKey];
        if (target) {
            target.click();
        }
    }, []);

    useEffect(() => {
        coverImagesRef.current = coverImages;
    }, [coverImages]);

    useEffect(
        () => () => {
            Object.values(coverImagesRef.current).forEach((entry) => {
                if (entry?.isObjectUrl && entry?.preview) {
                    URL.revokeObjectURL(entry.preview);
                }
            });
        },
        []
    );

    // fetchPrograms 함수는 교육 프로그램 목록을 불러와 카테고리 상태로 변환합니다.
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

    // fetchCoverImages 함수는 카테고리별 대표 이미지를 불러옵니다.
    const fetchCoverImages = useCallback(async () => {
        try {
            const res = await api.get("/api/edu-programs/covers");
            const mapped = {};
            (Array.isArray(res.data) ? res.data : []).forEach((cover) => {
                if (!cover?.target || !cover?.type) {
                    return;
                }
                const key = `${cover.target}-${cover.type}`;
                mapped[key] = {
                    preview: resolveCoverPreview(cover),
                    storedPath: cover.storedPath,
                    persisted: true,
                    originalFilename: cover.originalFilename || "",
                    isObjectUrl: false,
                };
            });
            setCoverImages(mapped);
        } catch (err) {
            console.error("대표 이미지 불러오기 실패:", err);
        }
    }, [resolveCoverPreview]);

    useEffect(() => {
        fetchPrograms();
    }, [fetchPrograms]);

    useEffect(() => {
        fetchCoverImages();
    }, [fetchCoverImages]);

    // handleSave 함수는 생성·수정 폼 데이터를 전송하고 목록을 새로고칩니다.
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

    // handleDelete 함수는 선택한 프로그램을 삭제하고 목록을 재요청합니다.
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
                                    {list.map((cat) => {
                                        const catKey = getCategoryKey(cat);
                                        const cover = coverImages[catKey];
                                        return (
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

                                                <figure className="relative -mx-2 aspect-[3/2] overflow-hidden rounded-3xl border border-[var(--toss-border)] bg-gradient-to-br from-[var(--toss-primary-soft)] via-white to-[#f6f9fc]">
                                                    {cover?.preview ? (
                                                        <img
                                                            src={cover.preview}
                                                            alt={`${cat.title} 대표 이미지`}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="absolute inset-0 grid place-items-center">
                                                            <span className="rounded-full border border-[var(--toss-border)] bg-white/85 px-4 py-1 text-xs font-medium text-[var(--toss-text-medium)]">
                                                                {CATEGORY_COVER_LABEL[cat.type] || "대표 이미지 영역"}
                                                            </span>
                                                        </div>
                                                    )}

                                                    {hasToken && (
                                                        <>
                                                            <div className="absolute bottom-3 right-3 flex gap-2">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => triggerCoverInput(catKey)}
                                                                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--toss-border)] bg-white/85 text-[var(--toss-text-medium)] shadow transition hover:border-[var(--toss-primary)] hover:text-[var(--toss-primary)]"
                                                                    title="대표 이미지 추가"
                                                                >
                                                                    <FaPlus size={14} />
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => triggerCoverInput(catKey)}
                                                                    disabled={!cover}
                                                                    className={`flex h-9 w-9 items-center justify-center rounded-full border border-[var(--toss-border)] bg-white/85 text-[var(--toss-text-medium)] shadow transition ${
                                                                        cover
                                                                            ? "hover:border-[var(--toss-primary)] hover:text-[var(--toss-primary)]"
                                                                            : "opacity-50"
                                                                    }`}
                                                                    aria-disabled={!cover}
                                                                    title="대표 이미지 수정"
                                                                >
                                                                    <FaCog size={14} />
                                                                </button>
                                                            </div>

                                                            <input
                                                                ref={(el) => {
                                                                    coverInputsRef.current[catKey] = el;
                                                                }}
                                                                type="file"
                                                                accept="image/*"
                                                                className="hidden"
                                                                onChange={(event) =>
                                                                    handleCoverFileChange(
                                                                        catKey,
                                                                        event.target.files,
                                                                        event.target
                                                                    )
                                                                }
                                                            />
                                                        </>
                                                    )}
                                                </figure>

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
                                                        <button
                                                            type="button"
                                                            className="text-left"

                                                        >
                                                            <p className="text-sm font-semibold text-[var(--toss-text-strong)]">
                                                                {item.name}
                                                            </p>
                                                            {/*<p className="text-xs text-[var(--toss-text-medium)]">*/}
                                                            {/*    {item.desc}*/}
                                                            {/*</p>*/}
                                                        </button>
                                                        {hasToken && (
                                                            <button
                                                                onClick={(event) => {
                                                                    event.stopPropagation();
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
                                    );
                                    })}
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
