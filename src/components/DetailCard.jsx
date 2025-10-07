import React, { useState, useEffect } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function DetailCard({ isOpen, onClose, item, editable = false, onSave }) {
    const [form, setForm] = useState({ title: "", description: "", image: "" });

    useEffect(() => {
        if (item) {
            setForm({
                title: item.title || "",
                description: item.description || "",
                image: item.image || "",
            });
        }
    }, [item]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            overlayClassName="fixed inset-0 z-50 flex items-center justify-center bg-[#0b1626]/60 px-4"
            className="surface-card w-full max-w-md border border-[var(--toss-border-strong)] p-8 outline-none"
        >
            {/* 헤더 */}
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-semibold tracking-tight text-[var(--toss-text-strong)]">
                    {editable ? "내용 수정" : form.title}
                </h2>
                <button
                    onClick={onClose}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-transparent text-lg text-[var(--toss-text-weak)] transition hover:border-[var(--toss-border)] hover:text-[var(--toss-text-medium)]"
                >
                    <span aria-hidden>✕</span>
                    <span className="sr-only">닫기</span>
                </button>
            </div>

            {/* 이미지 미리보기 */}
            {form.image && (
                <img
                    src={form.image}
                    alt="미리보기"
                    className="mb-5 h-48 w-full rounded-2xl border border-[var(--toss-border)] object-cover"
                />
            )}

            {/* 수정 모드 */}
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
                        name="image"
                        value={form.image}
                        onChange={handleChange}
                        placeholder="이미지 URL"
                        className="w-full rounded-xl border border-[var(--toss-border)] px-4 py-3 text-sm transition focus:border-[var(--toss-primary)] focus:ring-0"
                    />

                    <div className="flex items-center justify-end gap-2">
                        <button
                            onClick={onClose}
                            className="toss-secondary-btn h-11 px-5 text-sm"
                        >
                            취소
                        </button>
                        <button
                            onClick={() => onSave(form)}
                            className="toss-primary-btn h-11 px-6 text-sm"
                        >
                            저장
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    {/* 읽기 모드 */}
                    <p className="mb-8 whitespace-pre-line text-sm text-[var(--toss-text-medium)]">
                        {form.description}
                    </p>
                    <div className="flex justify-center">
                        <a
                            href={item?.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="toss-primary-btn h-12 px-7 text-sm"
                        >
                            문의하기
                        </a>
                    </div>
                </>
            )}
        </Modal>
    );
}
