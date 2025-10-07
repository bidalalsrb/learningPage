import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const normaliseToArray = (value) => {
    if (!value) return [];
    if (Array.isArray(value)) return value.filter(Boolean);
    return [value].filter(Boolean);
};

export default function DetailCard({
    isOpen,
    onClose,
    item,
    editable = false,
    onSave,
    onDelete,
}) {
    const [form, setForm] = useState({
        id: null,
        title: "",
        description: "",
        images: [],
    });
    const objectUrlRef = useRef([]);

    const clearObjectUrls = () => {
        objectUrlRef.current.forEach((url) => URL.revokeObjectURL(url));
        objectUrlRef.current = [];
    };

    useEffect(() => {
        if (!isOpen) {
            clearObjectUrls();
            setForm((prev) => ({
                ...prev,
                images: [],
            }));
        }
    }, [isOpen]);

    useEffect(() => {
        clearObjectUrls();
        if (!item) {
            setForm({
                id: null,
                title: "",
                description: "",
                images: [],
            });
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
                    };
                }
                if (image?.preview) {
                    return {
                        id: image.id || `existing-${idx}`,
                        preview: image.preview,
                        file: image.file || null,
                        persisted: Boolean(image.persisted) || !image.file,
                    };
                }
                return null;
            }
        ).filter(Boolean);

        setForm({
            id: item.id ?? null,
            title: item.title || "",
            description: item.description || "",
            images: hydratedImages,
        });

        return () => clearObjectUrls();
    }, [item]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

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
            };
        });

        setForm((prev) => ({
            ...prev,
            images: [...prev.images, ...processedFiles],
        }));
        e.target.value = "";
    };

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

    const handleSave = () => {
        if (!editable) return;
        onSave?.(form);
    };

    const handleDelete = () => {
        if (!editable || !form.id) return;
        onDelete?.(form.id);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            overlayClassName="fixed inset-0 z-50 flex items-center justify-center bg-[#0b1626]/60 px-4"
            className="surface-card w-full max-w-xl border border-[var(--toss-border-strong)] p-8 outline-none"
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
        </Modal>
    );
}
