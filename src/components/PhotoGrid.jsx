import React from "react";
import { useNavigate } from "react-router-dom";

export default function PhotoGrid({ photos, itemsPerPage }) {
    const navigate = useNavigate();
    const emptySlots = itemsPerPage - photos.length;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {photos.map((item, idx) => (
                <div
                    key={idx}
                    className="bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden cursor-pointer h-80 flex flex-col"
                    onClick={() => navigate(`/photos/${item.id}`)}
                >
                    {/* 이미지 */}
                    {item.img && (
                        <img
                            src={item.img}
                            alt={item.title}
                            className="w-full h-40 object-cover"
                        />
                    )}

                    {/* 내용 */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                            <h3 className="font-semibold text-gray-900 line-clamp-1">
                                {item.title}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                {item.desc}
                            </p>
                        </div>
                        <div className="flex justify-between items-center text-xs text-gray-400 mt-3">
                            <span>{item.author}</span>
                            <span>{item.date}</span>
                            <span>👁 {item.views}</span>
                        </div>
                    </div>
                </div>
            ))}

            {/* 빈 슬롯 채우기 */}
            {Array.from({ length: emptySlots }, (_, i) => (
                <div key={`empty-${i}`} className="invisible" />
            ))}
        </div>
    );
}
