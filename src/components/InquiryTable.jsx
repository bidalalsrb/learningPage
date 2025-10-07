import React from "react";

export default function InquiryTable({ inquiries, onRowClick }) {
    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-3 rounded-3xl border border-[var(--toss-border)] bg-white/70 px-4 py-4 text-sm text-[var(--toss-text-medium)] md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-2">
                    <select className="h-10 rounded-xl border border-[var(--toss-border)] bg-white px-3 text-sm text-[var(--toss-text-medium)] transition focus:border-[var(--toss-primary)] focus:outline-none">
                        <option>제목</option>
                        <option>작성자</option>
                    </select>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="제목, 내용을 검색하세요"
                            className="h-10 w-56 rounded-xl border border-[var(--toss-border)] bg-white px-4 pr-10 text-sm transition focus:border-[var(--toss-primary)] focus:outline-none"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-lg text-[var(--toss-text-weak)]">
                            🔍
                        </span>
                    </div>
                </div>
                <p className="text-xs text-[var(--toss-text-weak)]">
                    이번 페이지 <strong className="text-[var(--toss-text-medium)]">{inquiries.length}</strong>건의 문의
                </p>
            </div>

            <div className="overflow-hidden rounded-3xl border border-[var(--toss-border)] bg-white shadow-[0_18px_30px_rgba(19,32,46,0.04)]">
                <table className="toss-table">
                    <thead>
                        <tr>
                            <th className="w-20 text-center">번호</th>
                            <th>제목</th>
                            <th className="w-36 text-center">작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inquiries.map((item) => (
                            <tr key={item.id} onClick={() => onRowClick(item)} className="cursor-pointer">
                                <td className="text-center text-[var(--toss-text-weak)]">{item.id}</td>
                                <td>
                                    <span className="font-medium text-[var(--toss-text-strong)]">
                                        {item.title}
                                    </span>
                                </td>
                                <td className="text-center text-[var(--toss-text-medium)]">{item.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
