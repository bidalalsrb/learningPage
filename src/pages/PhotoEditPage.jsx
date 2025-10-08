import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb.jsx";
import api from "../utils/api.js";

const initialForm = {
    title: "",
    content: "",
};

const normalizeImageUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("/")) {
        return path;
    }
    return `/${path}`;
};

const normalizePost = (post) => {
    const images = (post.images || []).map((image, idx) => ({
        id: image.id ?? idx,
        url: normalizeImageUrl(image.url || image.imageUrl || image.storedPath),
        originalFilename: image.originalFilename,
    }));
    return {
        id: post.id,
        title: post.title || "",
        content: post.content || "",
        images,
    };
};

export default function PhotoEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = useMemo(() => {
        if (typeof window === "undefined") return null;
        return localStorage.getItem("ACCESS_TOKEN");
    }, []);
    const isAdmin = Boolean(token);

    const [form, setForm] = useState(initialForm);
    const [existingImages, setExistingImages] = useState([]);
    const [files, setFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (!isAdmin) return;
        const fetchPhoto = async () => {
            setLoading(true);
            setError("");
            try {
                const res = await api.get(`/api/photo-posts/${id}`);
                const normalized = normalizePost(res.data);
                setForm({ title: normalized.title, content: normalized.content });
                setExistingImages(normalized.images);
            } catch (err) {
                console.error("사진 불러오기 실패:", err);
                const message =
                    err.response?.status === 404
                        ? "해당 사진 게시글을 찾을 수 없습니다."
                        : "사진 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.";
                setError(message);
            } finally {
                setLoading(false);
            }
        };
        fetchPhoto();
    }, [id, isAdmin]);

    useEffect(
        () => () => {
            previews.forEach((preview) => URL.revokeObjectURL(preview.url));
        },
        [previews]
    );

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

    const resetUploads = () => {
        previews.forEach((preview) => URL.revokeObjectURL(preview.url));
        setFiles([]);
        setPreviews([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.title.trim() || !form.content.trim()) {
            setError("제목과 내용을 모두 입력해주세요.");
            return;
        }
        setSaving(true);
        setError("");
        setSuccess("");

        try {
            if (files.length > 0) {
                const formData = new FormData();
                formData.append("title", form.title.trim());
                formData.append("content", form.content.trim());
                files.forEach((file) => formData.append("images", file));
                await api.put(`/api/photo-posts/${id}`, formData, {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : undefined,
                    },
                });
            } else {
                await api.put(
                    `/api/photo-posts/${id}`,
                    {
                        title: form.title.trim(),
                        content: form.content.trim(),
                    },
                    {
                        headers: {
                            Authorization: token ? `Bearer ${token}` : undefined,
                        },
                    }
                );
            }
            setSuccess("사진 게시글이 수정되었습니다.");
            resetUploads();
            navigate(`/photos/${id}`, {
                replace: true,
                state: { message: "사진이 수정되었습니다." },
            });
        } catch (err) {
            console.error("사진 수정 실패:", err);
            const message =
                err.response?.status === 403
                    ? "사진 수정 권한이 없습니다."
                    : "사진 수정에 실패했습니다. 다시 시도해주세요.";
            setError(message);
        } finally {
            setSaving(false);
        }
    };

    if (!isAdmin) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex flex-1 items-center justify-center px-6">
                    <div className="rounded-3xl border border-[var(--toss-border)] bg-white/80 px-8 py-12 text-center text-sm text-[var(--toss-text-medium)]">
                        사진 수정은 관리자만 가능합니다.
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
                    { label: "사진 수정" },
                ]}
            />

            <main className="flex-1 px-6 py-12">
                <div className="toss-container max-w-4xl mx-auto space-y-8">
                    <div className="text-center md:text-left">
                        <span className="toss-tag uppercase">Archive</span>
                        <h1 className="mt-4 text-3xl font-bold tracking-tight text-[var(--toss-text-strong)] md:text-4xl">
                            사진 수정
                        </h1>
                        <p className="mt-3 text-sm text-[var(--toss-text-medium)] md:text-base">
                            기존 게시글의 제목과 내용을 수정하고, 필요하다면 이미지를 추가로 업로드할 수 있습니다.
                        </p>
                    </div>

                    {loading ? (
                        <div className="rounded-3xl border border-[var(--toss-border)] bg-white/80 px-8 py-16 text-center text-sm text-[var(--toss-text-medium)]">
                            게시글 정보를 불러오는 중입니다...
                        </div>
                    ) : error && !form.title ? (
                        <div className="rounded-3xl border border-[var(--toss-border)] bg-white/80 px-8 py-16 text-center text-sm text-[var(--toss-text-medium)]">
                            {error}
                        </div>
                    ) : (
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

                                {existingImages.length > 0 && (
                                    <div>
                                        <span className="mb-2 block text-sm font-semibold text-[var(--toss-text-medium)]">
                                            기존 이미지
                                        </span>
                                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                            {existingImages.map((image) => (
                                                <div
                                                    key={image.id}
                                                    className="overflow-hidden rounded-2xl border border-[var(--toss-border)] bg-white"
                                                >
                                                    <img
                                                        src={image.url}
                                                        alt={image.originalFilename || form.title}
                                                        className="h-32 w-full object-cover"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        <p className="mt-2 text-xs text-[var(--toss-text-weak)]">
                                            기존 이미지는 유지되며, 새 이미지를 추가로 업로드하면 함께 저장됩니다.
                                        </p>
                                    </div>
                                )}

                                <label className="block">
                                    <span className="mb-2 block text-sm font-semibold text-[var(--toss-text-medium)]">
                                        추가 이미지 업로드
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

                                {(error && form.title) && (
                                    <div className="rounded-2xl border border-[var(--toss-border)] bg-[var(--toss-error-soft)] px-4 py-3 text-sm text-[var(--toss-error)]">
                                        {error}
                                    </div>
                                )}
                                {success && (
                                    <div className="rounded-2xl border border-[var(--toss-border)] bg-[var(--toss-primary-soft)] px-4 py-3 text-sm text-[var(--toss-primary)]">
                                        {success}
                                    </div>
                                )}

                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                                    <button
                                        type="button"
                                        onClick={() => navigate(-1)}
                                        className="toss-secondary-btn h-11 px-6 text-sm"
                                        disabled={saving}
                                    >
                                        취소
                                    </button>
                                    <button
                                        type="submit"
                                        className="toss-primary-btn h-11 px-6 text-sm"
                                        disabled={saving}
                                    >
                                        {saving ? "수정 중..." : "수정 완료"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
