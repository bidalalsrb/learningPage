import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import api from "../utils/api.js";
import photos from "../data/photos";

const normalizeImageUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("/")) {
        return path;
    }
    return `/${path}`;
};

const samplePhotos = photos.map((item, idx) => ({
    id: item.id ?? idx,
    title: item.title,
    content: item.desc,
    desc: item.desc,
    author: item.author,
    date: item.date,
    views: item.views,
    images: item.img
        ? [
              {
                  id: `sample-${item.id ?? idx}`,
                  url: normalizeImageUrl(item.img),
                  originalFilename: item.img,
                  sortIndex: 0,
              },
          ]
        : [],
}));

const normalizePost = (post) => {
    const images = (post.images || []).map((image, index) => ({
        id: image.id ?? index,
        url: normalizeImageUrl(image.url || image.imageUrl || image.storedPath),
        originalFilename: image.originalFilename,
        sortIndex: image.sortIndex ?? index,
    }));
    return {
        id: post.id,
        title: post.title,
        content: post.content,
        author: post.author || "관리자",
        date: post.createdAt ? post.createdAt.slice(0, 10) : "",
        views: post.views || 0,
        images,
    };
};

export default function PhotoDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fallbackPhoto = useMemo(
        () => samplePhotos.find((item) => String(item.id) === String(id)) || null,
        [id]
    );

    useEffect(() => {
        const fetchPhoto = async () => {
            setLoading(true);
            try {
                const res = await api.get(`/api/photo-posts/${id}`);
                setPhoto(normalizePost(res.data));
                setError("");
            } catch (err) {
                console.error("사진 상세 불러오기 실패:", err);
                if (fallbackPhoto) {
                    setPhoto(fallbackPhoto);
                    setError("네트워크 오류로 샘플 데이터가 표시됩니다.");
                } else {
                    setPhoto(null);
                    setError("게시글을 찾을 수 없습니다.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPhoto();
    }, [id, fallbackPhoto]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex flex-1 items-center justify-center px-6">
                    <div className="rounded-3xl border border-[var(--toss-border)] bg-white/80 px-8 py-12 text-center text-sm text-[var(--toss-text-medium)]">
                        데이터를 불러오는 중입니다...
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (!photo) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex flex-1 items-center justify-center px-6">
                    <div className="rounded-3xl border border-[var(--toss-border)] bg-white/80 px-8 py-12 text-center text-sm text-[var(--toss-text-medium)]">
                        {error || "게시글을 찾을 수 없습니다."}
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    const primaryImage = photo.images?.[0]?.url;

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 px-6 py-12">
                <div className="toss-container space-y-10">
                    <div className="rounded-[32px] border border-[var(--toss-border)] bg-white/90 p-10 shadow-[0_24px_60px_rgba(19,32,46,0.1)] backdrop-blur">
                        <div className="flex flex-col gap-5 border-b border-[var(--toss-border)] pb-6 md:flex-row md:items-end md:justify-between">
                            <div>
                                <span className="toss-tag uppercase">Photo</span>
                                <h1 className="mt-4 text-3xl font-bold tracking-tight text-[var(--toss-text-strong)] md:text-4xl">
                                    {photo.title}
                                </h1>
                            </div>
                            <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--toss-text-weak)] md:text-sm">
                                {photo.author && <span>작성자 {photo.author}</span>}
                                {photo.date && <span>{photo.date}</span>}
                                {typeof photo.views === "number" && <span>조회수 {photo.views}</span>}
                            </div>
                        </div>

                        {photo.images?.length > 0 ? (
                            <div
                                className={`mt-8 grid gap-4 ${photo.images.length > 1 ? "md:grid-cols-2" : ""}`}
                            >
                                {photo.images.map((image) => (
                                    <img
                                        key={image.id}
                                        src={image.url}
                                        alt={image.originalFilename || photo.title}
                                        className="h-[360px] w-full rounded-3xl object-cover"
                                    />
                                ))}
                            </div>
                        ) : (
                            primaryImage && (
                                <img
                                    src={primaryImage}
                                    alt={photo.title}
                                    className="mt-8 h-[420px] w-full rounded-3xl object-cover"
                                />
                            )
                        )}

                        <p className="mt-8 whitespace-pre-line text-sm leading-7 text-[var(--toss-text-medium)] md:text-base">
                            {photo.content || photo.desc}
                        </p>

                        <div className="mt-8 flex justify-end">
                            <button
                                onClick={() => navigate(-1)}
                                className="toss-secondary-btn h-11 px-6 text-sm"
                            >
                                뒤로가기
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
