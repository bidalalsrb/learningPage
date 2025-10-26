import React, { useEffect, useRef, useState } from "react";

// normaliseToArray 함수는 단일 값 또는 배열을 항상 배열 형태로 변환합니다.
const normaliseToArray = (value) => {
    if (!value) return [];
    if (Array.isArray(value)) return value.filter(Boolean);
    return [value].filter(Boolean);
};

// createEmptyForm 함수는 모달 폼의 초기값을 정의합니다.
const createEmptyForm = () => ({
    id: null,
    title: "",
    description: "",
    link: "",
    images: [],
});

// DetailCard 컴포넌트는 프로그램 상세 정보를 보고 수정할 수 있는 모달을 제공합니다.
export default function DetailCard({
    isOpen,
    onClose,
    item,
    editable = false,
    onSave,
    onDelete,
}) {
    const [form, setForm] = useState(createEmptyForm());
    const objectUrlRef = useRef([]);

    // clearObjectUrls 함수는 생성된 미리보기 URL을 모두 해제합니다.
    const clearObjectUrls = () => {
        objectUrlRef.current.forEach((url) => URL.revokeObjectURL(url));
        objectUrlRef.current = [];
    };

    useEffect(() => {
        if (!isOpen) {
            clearObjectUrls();
            setForm(createEmptyForm());
        }
    }, [isOpen]);

    useEffect(() => {
        clearObjectUrls();
        if (!item) {
            setForm(createEmptyForm());
            return () => clearObjectUrls();
        }

        const hydratedImages = normaliseToArray(item.images || item.image || item.img).map(
            (image, idx) => {
                if (!image) return null;
                if (typeof image === "string") {
                    return {
                        id: `existing-${idx}`,
                        preview: image,
                        file: null,
                        persisted: true,
                        storedPath: image,
                    };
                }
                if (image?.file instanceof File) {
                    const preview = image.preview || URL.createObjectURL(image.file);
                    if (!image.preview) {
                        objectUrlRef.current.push(preview);
                    }
                    return {
                        id: image.id || `${image.file.name}-${image.file.lastModified}`,
                        preview,
                        file: image.file,
                        persisted: Boolean(image.persisted),
                        storedPath: image.storedPath || null,
                    };
                }
                if (image instanceof File) {
                    const preview = URL.createObjectURL(image);
                    objectUrlRef.current.push(preview);
                    return {
                        id: `${image.name}-${image.lastModified}`,
                        preview,
                        file: image,
                        persisted: false,
                        storedPath: null,
                    };
                }
                if (image?.preview) {
                    return {
                        id: image.id || `existing-${idx}`,
                        preview: image.preview,
                        file: image.file || null,
                        persisted: Boolean(image.persisted) || !image.file,
                        storedPath: image.storedPath || null,
                    };
                }
                return null;
            }
        ).filter(Boolean);

        setForm({
            id: item.id ?? null,
            title: item.title || "",
            description: item.description || "",
            link: item.link || "",
            images: hydratedImages,
        });

        return () => clearObjectUrls();
    }, [item]);

    // handleChange 함수는 입력 필드 변경을 폼 상태에 반영합니다.
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    // handleFileChange 함수는 첨부한 이미지 파일을 상태에 추가하고 미리보기를 생성합니다.
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;

        const processedFiles = files.map((file) => {
            const preview = URL.createObjectURL(file);
            objectUrlRef.current.push(preview);
            return {
                id: `${file.name}-${file.lastModified}`,
                file,
                preview,
                persisted: false,
                storedPath: null,
            };
        });

        setForm((prev) => ({
            ...prev,
            images: [...prev.images, ...processedFiles],
        }));
        e.target.value = "";
    };

    // handleRemoveImage 함수는 선택한 이미지를 리스트에서 제거합니다.
    const handleRemoveImage = (imageId) => {
        setForm((prev) => {
            const target = prev.images.find((img) => img.id === imageId);
            if (target?.file && target.preview) {
                URL.revokeObjectURL(target.preview);
                objectUrlRef.current = objectUrlRef.current.filter(
                    (url) => url !== target.preview
                );
            }
            return {
                ...prev,
                images: prev.images.filter((img) => img.id !== imageId),
            };
        });
    };

    // handleSave 함수는 부모 컴포넌트에 저장 이벤트를 전달합니다.
    const handleSave = () => {
        if (!editable) return;
        onSave?.(form);
    };

    // handleDelete 함수는 부모 컴포넌트에 삭제 이벤트를 전달합니다.
    const handleDelete = () => {
        if (!editable || !form.id) return;
        onDelete?.(form.id);
    };

    useEffect(() => {
        if (!isOpen) {
            return undefined;
        }
        if (typeof document === "undefined") {
            return undefined;
        }
        const original = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = original;
        };
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    // handleOverlayClick 함수는 오버레이 클릭 시 모달을 닫습니다.
    const handleOverlayClick = (e) => {
        e.stopPropagation();
        onClose?.();
    };

    // preventPropagation 함수는 모달 내부 클릭 시 오버레이 이벤트 전파를 막습니다.
    const preventPropagation = (e) => {
        e.stopPropagation();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b1626]/60 px-4"
            onClick={handleOverlayClick}
        >
            <div
                className="surface-card w-full max-w-xl border border-[var(--toss-border-strong)] p-8 outline-none"
                role="dialog"
                aria-modal="true"
                onClick={preventPropagation}
            >
                <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-semibold tracking-tight text-[var(--toss-text-strong)]">
                    {editable ? (form.id ? "내용 수정" : "내용 추가") : form.title}
                </h2>
                <button
                    onClick={onClose}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-transparent text-lg text-[var(--toss-text-weak)] transition hover:border-[var(--toss-border)] hover:text-[var(--toss-text-medium)]"
                >
                    <span aria-hidden>✕</span>
                    <span className="sr-only">닫기</span>
                </button>
            </div>

            {editable ? (
                <div className="space-y-4">
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="제목"
                        className="w-full rounded-xl border border-[var(--toss-border)] px-4 py-3 text-sm transition focus:border-[var(--toss-primary)] focus:ring-0"
                    />
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="내용"
                        className="h-32 w-full rounded-xl border border-[var(--toss-border)] px-4 py-3 text-sm transition focus:border-[var(--toss-primary)] focus:ring-0"
                    />
                    <input
                        type="text"
                        name="link"
                        value={form.link}
                        onChange={handleChange}
                        placeholder="관련 링크 (선택)"
                        className="w-full rounded-xl border border-[var(--toss-border)] px-4 py-3 text-sm transition focus:border-[var(--toss-primary)] focus:ring-0"
                    />
                    <div className="space-y-3">
                        <label className="block text-sm font-semibold text-[var(--toss-text-medium)]">
                            이미지 첨부
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileChange}
                            className="w-full cursor-pointer rounded-xl border border-dashed border-[var(--toss-border)] px-4 py-3 text-sm text-[var(--toss-text-medium)] transition file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-[var(--toss-primary)] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:border-[var(--toss-border-strong)]"
                        />
                        {form.images.length > 0 && (
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                                {form.images.map((image) => (
                                    <div
                                        key={image.id}
                                        className="relative overflow-hidden rounded-2xl border border-[var(--toss-border)] bg-white"
                                    >
                                        <img
                                            src={image.preview}
                                            alt="미리보기"
                                            className="h-32 w-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(image.id)}
                                            className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-xs font-semibold text-[var(--toss-text-medium)] shadow hover:bg-white"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-2">
                        {onDelete && form.id ? (
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="text-sm font-semibold text-red-500 transition hover:text-red-600"
                            >
                                삭제
                            </button>
                        ) : (
                            <span />
                        )}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={onClose}
                                className="toss-secondary-btn h-11 px-5 text-sm"
                            >
                                취소
                            </button>
                            <button
                                onClick={handleSave}
                                className="toss-primary-btn h-11 px-6 text-sm"
                            >
                                저장
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <p className="mb-6 whitespace-pre-line text-sm text-[var(--toss-text-medium)]">
                        {form.description}
                    </p>

                    {form.link && (
                        <div className="mb-6">
                            <a
                                href={form.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--toss-primary)] underline-offset-4 hover:underline"
                            >
                                관련 링크 열기 ↗
                            </a>
                        </div>
                    )}

                    {form.images.length > 0 && (
                        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3">
                            {form.images.map((image) => (
                                <div
                                    key={image.id}
                                    className="overflow-hidden rounded-2xl border border-[var(--toss-border)] bg-white"
                                >
                                    <img
                                        src={image.preview}
                                        alt="첨부 이미지"
                                        className="h-40 w-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex justify-center">
                        <button
                            type="button"
                            onClick={onClose}
                            className="toss-primary-btn h-12 px-7 text-sm"
                        >
                            닫기
                        </button>
                    </div>
                </>
            )}
            </div>
        </div>
    );
}
