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
                <main className="flex-1 flex items-center justify-center">
                    <p className="text-gray-500">게시글을 찾을 수 없습니다.</p>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 w-4/5 mx-auto px-6 md:px-12 py-10">
                {/* 제목 */}
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{photo.title}</h1>

                {/* 메타 정보 */}
                <div className="flex justify-between text-sm text-gray-500 mb-6 border-b pb-3">
                    <span>작성자: {photo.author}</span>
                    <span>{photo.date}</span>
                    <span>조회수: {photo.views}</span>
                </div>

                {/* 이미지 */}
                {photo.img && (
                    <img
                        src={photo.img}
                        alt={photo.title}
                        className="w-full h-80 object-cover rounded mb-6"
                    />
                )}

                {/* 내용 */}
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {photo.desc}
                </p>

                {/* 뒤로가기 */}
                <button
                    onClick={() => navigate(-1)}
                    className="mt-8 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    뒤로가기
                </button>
            </main>

            <Footer />
        </div>
    );
}
