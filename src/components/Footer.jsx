import React from "react";

export default function Footer() {
    return (
        <footer className="border-t border-[var(--toss-border)] bg-transparent">
            <div className="toss-container py-16">
                <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
                    <div>
                        <div className="flex items-center gap-3">
                            <img src="/img.png" alt="회사 로고" className="h-12 w-auto" />
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[var(--toss-text-weak)]">
                                    HRnC
                                </p>
                                <p className="text-xl font-bold tracking-tight text-[var(--toss-text-strong)]">
                                    HRnC 교육컨설팅
                                </p>
                            </div>
                        </div>
                        <p className="mt-4 max-w-sm text-sm text-[var(--toss-text-medium)]">
                            사람과 조직의 성장을 돕는 교육 파트너. Toss처럼 간결하고 명확한 경험으로
                            교육의 새로운 기준을 만들어갑니다.
                        </p>
                    </div>

                    <nav className="flex flex-wrap gap-x-10 gap-y-4 text-sm text-[var(--toss-text-medium)]">
                        <a href="/company" className="transition hover:text-[var(--toss-primary)]">
                            회사 소개
                        </a>
                        <a href="/education" className="transition hover:text-[var(--toss-primary)]">
                            교육 프로그램
                        </a>
                        <a href="/stress" className="transition hover:text-[var(--toss-primary)]">
                            스트레스 관리
                        </a>
                        <a href="/photos" className="transition hover:text-[var(--toss-primary)]">
                            사진 아카이브
                        </a>
                        <a href="/inquiry" className="transition hover:text-[var(--toss-primary)]">
                            문의하기
                        </a>
                    </nav>
                </div>

                <div className="mt-12 grid gap-8 text-sm text-[var(--toss-text-medium)] md:grid-cols-3">
                    <div className="space-y-1.5">
                        <p className="toss-chip">Business</p>
                        <p>서울특별시 어딘가 123, HRnC교육컨설팅</p>
                        <p>대표: 홍길동</p>
                    </div>
                    <div className="space-y-1.5">
                        <p className="toss-chip">Contact</p>
                        <p>Tel. 02-123-4567</p>
                        <p>Email. info@hrnc.co.kr</p>
                    </div>
                    <div className="space-y-1.5">
                        <p className="toss-chip">Business Info</p>
                        <p>사업자등록번호 123-45-67890</p>
                        <p>HRnC 교육컨설팅</p>
                    </div>
                </div>

                <div className="mt-12 flex flex-col gap-4 border-t border-[var(--toss-border)] pt-6 text-xs text-[var(--toss-text-weak)] md:flex-row md:items-center md:justify-between">
                    <p>© {new Date().getFullYear()} HRnC 교육컨설팅. All rights reserved.</p>
                    <div className="flex gap-4">
                        <a href="/terms" className="hover:text-[var(--toss-primary)]">
                            이용약관
                        </a>
                        <a href="/privacy" className="hover:text-[var(--toss-primary)]">
                            개인정보처리방침
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
