import React from "react";

export default function InquiryTable({ inquiries, onRowClick }) {
    return (
        <div className="bg-white">
            {/* 상단 검색/필터 */}
            <div className="flex justify-between items-center px-2 md:px-4 py-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                    <select className="border rounded px-2 py-1 text-sm focus:outline-none">
                        <option>제목</option>
                        <option>작성자</option>
                    </select>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="제목, 내용을 검색하세요"
                            className="border rounded pl-3 pr-8 py-1 text-sm focus:outline-none"
                        />
                        <span className="absolute right-2 top-1.5 text-gray-400">🔍</span>
                    </div>
                </div>
            </div>

            {/* 테이블 */}
            <table className="w-full text-sm text-gray-700">
                <tbody>
                {inquiries.map((item) => (
                    <tr
                        key={item.id}
                        className="border-b hover:bg-gray-50 cursor-pointer"
                        onClick={() => onRowClick(item)}
                    >
                        {/* 번호 */}
                        <td className="w-16 text-center py-3 text-gray-400">{item.id}</td>
                        {/* 제목 */}
                        <td className="py-3">
                            <span className="text-gray-800 hover:underline">{item.title}</span>
                        </td>
                        {/* 작성일 */}
                        <td className="w-32 text-center py-3 text-gray-500">{item.date}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
