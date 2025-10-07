import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import photos from "../data/photos";

export default function PhotoDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const photo = photos.find((p) => p.id === Number(id));

    if (!photo) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex flex-1 items-center justify-center px-6">
                    <div className="rounded-3xl border border-[var(--toss-border)] bg-white/80 px-8 py-12 text-center text-sm text-[var(--toss-text-medium)]">
                        게시글을 찾을 수 없습니다.
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

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
                            <div className="flex gap-4 text-xs text-[var(--toss-text-weak)] md:text-sm">
                                <span>작성자 {photo.author}</span>
                                <span>{photo.date}</span>
                                <span>조회수 {photo.views}</span>
                            </div>
                        </div>

                        {photo.img && (
                            <img
                                src={photo.img}
                                alt={photo.title}
                                className="mt-8 h-[420px] w-full rounded-3xl object-cover"
                            />
                        )}

                        <p className="mt-8 whitespace-pre-line text-sm leading-7 text-[var(--toss-text-medium)] md:text-base">
                            {photo.desc}
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
