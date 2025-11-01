import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb.jsx";
import InquiryForm from "../components/InquiryForm.jsx";

// InquiryCreatePage 컴포넌트는 문의 등록 폼을 표시하고 전송 성공 후 이동을 처리합니다.
export default function InquiryCreatePage() {
    const navigate = useNavigate();

    // handleSuccess 함수는 문의가 성공적으로 접수되면 목록 페이지로 이동시킵니다.
    const handleSuccess = () => {
        navigate("/inquiry", {
            replace: true,
            state: { message: "문의가 접수되었습니다." },
        });
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <Breadcrumb
                items={[
                    { label: "홈", to: "/index" },
                    { label: "문의", to: "/inquiry" },
                    { label: "문의 등록" },
                ]}
            />

            <main className="flex-1 px-6 py-8">
                <div className="toss-container max-w-3xl mx-auto space-y-8">
                    <div className="text-center md:text-left">
                        <span className="toss-tag uppercase">Contact</span>
                        <h1 className="mt-4 text-3xl font-bold tracking-tight text-[var(--toss-text-strong)] md:text-4xl">
                            문의 등록
                        </h1>
                        <p className="mt-3 text-sm text-[var(--toss-text-medium)] md:text-base">
                            담당자가 빠르게 확인하고 연락드립니다. 연락 가능한 정보를 정확히 입력해주세요.
                        </p>
                    </div>

                    <InquiryForm onSubmit={handleSuccess} />
                </div>
            </main>

            <Footer />
        </div>
    );
}
