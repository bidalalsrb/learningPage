import React, { useState } from "react";
import api from "../utils/api.js";

const INQUIRY_TYPES = [
    { value: "UNIVERSITY", label: "대학 프로그램" },
    { value: "COMPANY", label: "기업" },
];

const initialForm = {
    name: "",
    phoneNumber: "",
    inquiryType: INQUIRY_TYPES[0].value,
    title: "",
    content: "",
};

// InquiryForm 컴포넌트는 문의 등록을 위한 입력 폼과 제출 로직을 제공합니다.
export default function InquiryForm({ onSubmit }) {
    const [form, setForm] = useState(initialForm);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const isValid =
        form.name.trim().length >= 2 &&
        form.phoneNumber.trim().length >= 7 &&
        form.title.trim().length >= 2 &&
        form.content.trim().length >= 5;

    // handleChange 함수는 입력 필드 변화를 상태에 반영합니다.
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    // handleSubmit 함수는 문의 데이터를 서버에 전송하고 성공 여부 메시지를 처리합니다.
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isValid || loading) return;
        setLoading(true);
        setError("");
        setSuccess("");

        const payload = {
            name: form.name.trim(),
            phoneNumber: form.phoneNumber.trim(),
            phone: form.phoneNumber.trim(),
            inquiryType: form.inquiryType,
            // type: form.inquiryType,
            title: form.title.trim(),
            content: form.content.trim(),
        };
        try {
            const res = await api.post("/api/inquiries", payload);
            const created = res.data;
            setSuccess("문의가 성공적으로 접수되었습니다.");
            onSubmit?.(created);
            setForm(initialForm);
        } catch (err) {
            let message =
                err.response?.data?.message ||
                err.response?.data ||
                err.message ||
                "문의 접수 중 오류가 발생했습니다.";
            if (err.response?.status === 403) {
                message = "문의 등록 권한이 없습니다. 관리자에게 문의해주세요.";
            }
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="surface-card rounded-3xl border border-[var(--toss-border)] p-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-1 flex-col gap-4 md:flex-row">
                        <label className="flex-1">
                            <span className="mb-2 block text-sm font-semibold text-[var(--toss-text-medium)]">
                                이름
                            </span>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="이름을 입력하세요"
                                className="w-full rounded-2xl border border-[var(--toss-border)] px-4 py-3 text-sm transition focus:border-[var(--toss-primary)] focus:outline-none"
                            />
                        </label>
                        <label className="flex-1">
                            <span className="mb-2 block text-sm font-semibold text-[var(--toss-text-medium)]">
                                핸드폰 번호
                            </span>
                            <input
                                type="tel"
                        name="phoneNumber"
                        value={form.phoneNumber}
                                onChange={handleChange}
                                placeholder="010-0000-0000"
                                className="w-full rounded-2xl border border-[var(--toss-border)] px-4 py-3 text-sm transition focus:border-[var(--toss-primary)] focus:outline-none"
                            />
                        </label>
                        <label className="flex-1">
                            <span className="mb-2 block text-sm font-semibold text-[var(--toss-text-medium)]">
                                문의 타입
                            </span>
                            <select
                                name="inquiryType"
                                value={form.inquiryType}
                                onChange={handleChange}
                                className="w-full rounded-2xl border border-[var(--toss-border)] bg-white px-4 py-3 text-sm transition focus:border-[var(--toss-primary)] focus:outline-none"
                            >
                                {INQUIRY_TYPES.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                </div>

                <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[var(--toss-text-medium)]">
                        제목
                    </span>
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="문의 제목을 입력하세요"
                        className="w-full rounded-2xl border border-[var(--toss-border)] px-4 py-3 text-sm transition focus:border-[var(--toss-primary)] focus:outline-none"
                    />
                </label>

                <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-[var(--toss-text-medium)]">
                        내용
                    </span>
                    <textarea
                        name="content"
                        value={form.content}
                        onChange={handleChange}
                        placeholder="문의 내용을 작성해주세요"
                        className="h-32 w-full rounded-2xl border border-[var(--toss-border)] px-4 py-3 text-sm transition focus:border-[var(--toss-primary)] focus:outline-none"
                    />
                </label>

    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-sm">
                        {error && <span className="text-red-500">{error}</span>}
                        {!error && success && (
                            <span className="text-[var(--toss-primary)]">{success}</span>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={!isValid || loading}
                        className={`h-12 w-full rounded-full text-sm font-semibold transition sm:w-auto ${
                            isValid && !loading
                                ? "toss-primary-btn"
                                : "cursor-not-allowed bg-[rgba(25,31,40,0.08)] text-[var(--toss-text-weak)]"
                        }`}
                    >
                        {loading ? "등록 중..." : "문의 등록하기"}
                    </button>
                </div>
            </form>
        </div>
    );
}
