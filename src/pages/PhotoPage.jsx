import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PhotoGrid from "../components/PhotoGrid";
import Pagination from "../components/Pagination";
import photos from "../data/photos";

export default function PhotoPage() {
    const itemsPerPage = 9;
    const [currentPage, setCurrentPage] = useState(1);

    const startIdx = (currentPage - 1) * itemsPerPage;
    const currentPhotos = photos.slice(startIdx, startIdx + itemsPerPage);

    const totalPages = Math.ceil(photos.length / itemsPerPage);

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
                            교육 현장의 순간과 분위기를 담았습니다. 총 {photos.length}개의 콘텐츠를 확인해보세요.
                        </p>
                    </div>
                </section>

                <section className="px-6 pb-16 pt-10">
                    <div className="toss-container space-y-10">
                        <PhotoGrid photos={currentPhotos} itemsPerPage={itemsPerPage} />
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={(page) => setCurrentPage(page)}
                        />
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
