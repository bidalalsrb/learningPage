import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PhotoGrid from "../components/PhotoGrid";
import Pagination from "../components/Pagination";
import photos from "../data/photos";
import api from "../utils/api.js";

// PhotoPage 컴포넌트는 사진 목록을 불러와 페이지네이션과 함께 화면에 보여줍니다.
export default function PhotoPage() {
    const itemsPerPage = 9;
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const token = typeof window !== "undefined" ? localStorage.getItem("ACCESS_TOKEN") : null;
    const isAdmin = useMemo(() => Boolean(token), [token]);
    const samplePhotoList = useMemo(
        () =>
            photos.map((item, idx) => ({
                id: item.id ?? idx,
                title: item.title,
                desc: item.desc,
                content: item.desc,
                author: item.author,
                date: item.date,
                views: item.views,
                img: item.img,
                images: item.img
                    ? [
                          {
                              id: `sample-${item.id ?? idx}`,
                              url: item.img,
                              originalFilename: item.img,
                              sortIndex: 0,
                          },
                      ]
                    : [],
            })),
        []
    );
    const [photoList, setPhotoList] = useState(samplePhotoList);
    const location = useLocation();
    const [flashMessage, setFlashMessage] = useState(location.state?.message || "");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    // normalizeImageUrl 함수는 서버에서 받은 이미지 경로를 브라우저가 접근 가능한 URL로 변환합니다.
    const normalizeImageUrl = (path) => {
        if (!path) return "";
        if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("/")) {
            return path;
        }
        return `/${path}`;
    };

    // normalizePost 함수는 API 응답을 컴포넌트가 사용하기 쉬운 사진 데이터 형태로 정규화합니다.
    const normalizePost = (post) => {
        const images = (post.images || []).map((image, idx) => ({
            id: image.id ?? idx,
            url: normalizeImageUrl(image.url || image.imageUrl || image.storedPath),
            originalFilename: image.originalFilename,
            sortIndex: image.sortIndex ?? idx,
        }));
        const primary = images[0]?.url;
        return {
            id: post.id,
            title: post.title,
            desc: post.content,
            content: post.content,
            author: post.author || "관리자",
            date: post.createdAt ? post.createdAt.slice(0, 10) : "",
            views: post.views || 0,
            img: normalizeImageUrl(primary),
            images,
        };
    };

    // fetchPhotos 함수는 서버에서 사진 목록을 가져오고 예외 상황에 맞춰 상태를 갱신합니다.
    const fetchPhotos = useCallback(async () => {
        setLoading(true);
        try {
            const res = await api.get("/api/photo-posts");
            console.log('res', res);
            const list = Array.isArray(res.data) ? res.data : [];
            if (list.length === 0) {
                setPhotoList(samplePhotoList);
                setError("등록된 사진이 아직 없습니다. 샘플 데이터가 표시됩니다.");
            } else {
                setPhotoList(list.map(normalizePost));
                setError("");
            }
        } catch (err) {
            console.error("사진 목록 불러오기 실패:", err);
            setPhotoList(samplePhotoList);
            setError("사진 목록을 불러오지 못했습니다. 샘플 데이터가 표시됩니다.");
        } finally {
            setLoading(false);
            setCurrentPage(1);
        }
    }, [samplePhotoList]);

    useEffect(() => {
        fetchPhotos();
    }, [fetchPhotos, location.key]);

    useEffect(() => {
        if (location.state?.message) {
            setFlashMessage(location.state.message);
            fetchPhotos();
            navigate(location.pathname, { replace: true });
        }
    }, [location.state, location.pathname, navigate, fetchPhotos]);

    const startIdx = (currentPage - 1) * itemsPerPage;
    const currentPhotos = photoList.slice(startIdx, startIdx + itemsPerPage);

    const totalPages = Math.ceil(photoList.length / itemsPerPage);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1">
                <section className="px-6 pt-12">
                    <div className="toss-container text-center md:text-left">
                        <span className="toss-tag uppercase">Archive</span>
                        <h1 className="mt-4 text-3xl font-bold tracking-tight text-[var(--toss-text-strong)] md:text-4xl">
                            사진 아카이브
                        </h1>
                        <p className="mt-3 text-sm text-[var(--toss-text-medium)] md:text-base">
                            교육 현장의 순간과 분위기를 담았습니다. 총 {photoList.length}개의 콘텐츠를 확인해보세요.
                        </p>
                    </div>
                </section>

                <section className="px-6 pb-16 pt-10">
                    <div className="toss-container space-y-6">
                        {flashMessage && (
                            <div className="rounded-2xl border border-[var(--toss-border)] bg-[var(--toss-primary-soft)] px-4 py-3 text-sm text-[var(--toss-primary)]">
                                {flashMessage}
                            </div>
                        )}
                        {error && !loading && (
                            <div className="rounded-2xl border border-[var(--toss-border)] bg-white px-4 py-3 text-sm text-[var(--toss-text-medium)]">
                                {error}
                            </div>
                        )}
                        {loading ? (
                            <div className="rounded-2xl border border-dashed border-[var(--toss-border)] bg-white/70 px-4 py-12 text-center text-sm text-[var(--toss-text-medium)]">
                                사진 목록을 불러오는 중입니다...
                            </div>
                        ) : (
                            <>
                                <PhotoGrid
                                    photos={currentPhotos}
                                    itemsPerPage={itemsPerPage}
                                />
                                {isAdmin && (
                                    <div className="flex justify-end">
                                        <Link
                                            to="/photos/new"
                                            className="toss-primary-btn h-11 px-6 text-sm"
                                        >
                                            사진 등록하기
                                        </Link>
                                    </div>
                                )}
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={(page) => setCurrentPage(page)}
                                />
                            </>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
