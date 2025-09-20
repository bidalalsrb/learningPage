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

            {/* 페이지 타이틀 */}
            <section className="px-6 md:px-12 py-10 border-b">
                <h1 className="text-3xl font-bold">사진 게시판</h1>
                <p className="text-gray-500 mt-1">총 {photos.length}개의 게시글</p>
            </section>

            {/* 콘텐츠 */}
            <main className="flex-1 max-w-7xl mx-auto px-6 md:px-12 py-10">
                <PhotoGrid photos={currentPhotos} itemsPerPage={itemsPerPage} />
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </main>

            <Footer />
        </div>
    );
}
