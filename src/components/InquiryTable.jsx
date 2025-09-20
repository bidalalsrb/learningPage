import React from "react";

export default function InquiryTable({ inquiries, onRowClick }) {
    return (
        <div className="overflow-x-auto border rounded-lg bg-white shadow-sm">
            <table className="w-full text-sm text-left text-gray-600">
                <thead className="bg-gray-50 border-b">
                <tr>
                    <th className="px-4 py-3 w-16 text-center">번호</th>
                    <th className="px-4 py-3">제목</th>
                    <th className="px-4 py-3 w-32 text-center">작성자</th>
                    <th className="px-4 py-3 w-32 text-center">작성일</th>
                </tr>
                </thead>
                <tbody>
                {inquiries.map((item) => (
                    <tr
                        key={item.id}
                        className="border-b hover:bg-gray-50 transition"
                        onClick={() => onRowClick(item)}
                    >
                        <td className="px-4 py-3 text-center">{item.id}</td>
                        <td className="px-4 py-3 text-blue-600 cursor-pointer hover:underline">
                            {item.title}
                        </td>
                        <td className="px-4 py-3 text-center">{item.author}</td>
                        <td className="px-4 py-3 text-center">{item.date}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
