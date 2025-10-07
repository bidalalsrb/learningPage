import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb.jsx";
import api from "../utils/api.js";

const initialForm = {
    title: "",
    content: "",
};

export default function PhotoCreatePage() {
    const navigate = useNavigate();
    const token = typeof window !== "undefined" ? localStorage.getItem("ACCESS_TOKEN") : null;
    const isAdmin = Boolean(token);

    const [form, setForm] = useState(initialForm);
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const selected = Array.from(e.target.files || []);
        previews.forEach((preview) => URL.revokeObjectURL(preview.url));
        if (!selected.length) {
            setFiles([]);
            setPreviews([]);
            return;
        }
        setFiles(selected);
        setPreviews(
            selected.map((file) => ({
                name: file.name,
                url: URL.createObjectURL(file),
            }))
        );
    };

    const resetForm = () => {
        setForm(initialForm);
        previews.forEach((preview) => URL.revokeObjectURL(preview.url));
        setFiles([]);
        setPreviews([]);
    };

    useEffect(() => () => {
        previews.forEach((preview) => URL.revokeObjectURL(preview.url));
    }, [previews]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.title.trim() || !form.content.trim() || files.length === 0) {
            setError("제목, 내용, 이미지를 모두 입력해주세요.");
            return;
        }
        setLoading(true);
        setError("");
        setSuccess("");

        const formData = new FormData();
        formData.append("title", form.title.trim());
        formData.append("content", form.content.trim());
        files.forEach((file) => formData.append("images", file));

        try {
            const res = await api.post("/api/photo-posts", formData, {
                headers: {
                    Authorization: token ? `Bearer ${token}` : undefined,
                },
            });
            setSuccess("사진이 등록되었습니다.");
            resetForm();
            navigate("/photos", {
                replace: true,
                state: { message: "사진이 등록되었습니다." },
            });
        } catch (err) {
            console.error("사진 등록 실패:", err);
            const message =
                err.response?.status === 403
                    ? "사진 등록 권한이 없습니다."
                    : "사진 등록에 실패했습니다. 다시 시도해주세요.";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    if (!isAdmin) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex flex-1 items-center justify-center px-6">
                    <div className="rounded-3xl border border-[var(--toss-border)] bg-white/80 px-8 py-12 text-center text-sm text-[var(--toss-text-medium)]">
                        사진 등록은 관리자만 가능합니다.
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <Breadcrumb
                items={[
                    { label: "홈", to: "/index" },
                    { label: "사진 아카이브", to: "/photos" },
                    { label: "사진 등록" },
                ]}
            />

    <main className="flex-1 px-6 py-12">
                <div className="toss-container max-w-4xl mx-auto space-y-8">
                    <div className="text-center md:text-left">
                        <span className="toss-tag uppercase">Archive</span>
                        <h1 className="mt-4 text-3xl font-bold tracking-tight text-[var(--toss-text-strong)] md:text-4xl">
                            사진 등록
                        </h1>
                        <p className="mt-3 text-sm text-[var(--toss-text-medium)] md:text-base">
                            교육 현장의 여러 이미지를 한 번에 등록할 수 있습니다.
                        </p>
                    </div>

                    <div className="surface-card rounded-3xl border border-[var(--toss-border)] p-8">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <label className="block">
                                <span className="mb-2 block text-sm font-semibold text-[var(--toss-text-medium)]">
                                    제목
                                </span>
                                <input
                                    type="text"
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    placeholder="사진 아카이브 제목을 입력하세요"
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
                                    placeholder="사진에 대한 설명을 입력하세요"
                                    className="h-32 w-full rounded-2xl border border-[var(--toss-border)] px-4 py-3 text-sm transition focus:border-[var(--toss-primary)] focus:outline-none"
                                />
                            </label>

                            <label className="block">
                                <span className="mb-2 block text-sm font-semibold text-[var(--toss-text-medium)]">
                                    이미지 첨부 (최소 1개 이상)
                                </span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleFileChange}
                                    className="w-full cursor-pointer rounded-2xl border border-dashed border-[var(--toss-border)] px-4 py-3 text-sm text-[var(--toss-text-medium)] transition file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-[var(--toss-primary)] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:border-[var(--toss-border-strong)]"
                                />
                            </label>

                            {previews.length > 0 && (
                                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                    {previews.map((preview) => (
                                        <div
                                            key={preview.url}
                                            className="overflow-hidden rounded-2xl border border-[var(--toss-border)]"
                                        >
                                            <img
                                                src={preview.url}
                                                alt={preview.name}
                                                className="h-32 w-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <div className="text-sm">
                                    {error && <span className="text-red-500">{error}</span>}
                                    {!error && success && (
                                        <span className="text-[var(--toss-primary)]">{success}</span>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`h-12 w-full rounded-full text-sm font-semibold transition sm:w-auto ${
                                        !loading
                                            ? "toss-primary-btn"
                                            : "cursor-not-allowed bg-[rgba(25,31,40,0.08)] text-[var(--toss-text-weak)]"
                                    }`}
                                >
                                    {loading ? "등록 중..." : "사진 등록하기"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
