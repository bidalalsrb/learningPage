import React from "react";

const NAV_GROUPS = [
    {
        title: "Company",
        links: [
            { label: "회사 소개", to: "/company" },

        ],
    },
    {
        title: "Services",
        links: [
            { label: "교육 프로그램", to: "/education" },
            { label: "스트레스 관리", to: "/stress" },
            { label: "사진 아카이브", to: "/photos" },
        ],
    },
    {
        title: "Support",
        links: [
            { label: "문의하기", to: "/inquiry" },
        ],
    },
];

// Footer 컴포넌트는 사이트 하단 정보와 내비게이션 링크를 제공합니다.
export default function Footer() {
    return (
        <footer className=" mt-5 mb-5 text-black">
            <div className="toss-container flex flex-col gap-10 py-12 md:flex-row md:items-start md:justify-between">
                <div className="space-y-4 text-sm text-black/70">
                    <div>
                        <img
                            src="/iconimg.png"
                            alt="HRnC 로고"
                            className="h-10 w-auto"
                        />

                    </div>
                    <div className="space-y-1.5 text-xs">
                        <p>사업자등록번호 123-45-67890 · 대표 한진아</p>
                        <p>서울특별시 어딘가 123, 한국ESG리더십교육협회</p>
                        <p>info@hrnc.co.kr</p>
                    </div>
                </div>

                <div className="grid flex-1 gap-8 text-sm text-black/80 md:grid-cols-3">
                    {NAV_GROUPS.map((group) => (
                        <div key={group.title} className="space-y-3 text-center md:text-left">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50">
                                {group.title}
                            </p>
                            <ul className="space-y-2">
                                {group.links.map((link) => (
                                    <li key={link.to}>
                                        <a
                                            href={link.to}
                                            className="transition hover:text-black"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div className="border-t border-white/10  mt-3">
                <div className="toss-container flex flex-col gap-3 py-5 text-xs  text-black/40 md:flex-row md:items-center md:justify-between">
                    <p>© {new Date().getFullYear()} 한국ESG리더십교육협회. All rights reserved.</p>
                    <div className="flex gap-4">
                        <a href="/privacy" className="transition hover:text-black/80">
                            개인정보처리방침
                        </a>
                        <a href="/terms" className="transition hover:text-black/80">
                            이용약관
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
