import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/api.js";

// SignupPage 컴포넌트는 관리자 회원가입 폼과 전송 흐름을 구성합니다.
export default function SignupPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const isValid =
        form.username.trim().length >= 3 && form.password.trim().length >= 4;

    // handleSubmit 함수는 회원가입 요청을 처리하고 성공 시 로그인 페이지로 이동합니다.
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isValid || loading) return;

        setLoading(true);
        setError("");

        try {
            await api.post("/api/auth/signup", {
                username: form.username.trim(),
                password: form.password.trim(),
            });
            alert("회원가입이 완료되었습니다. 로그인해주세요.");
            navigate("/admin/login");
        } catch (err) {
            const message =
                err.response?.data?.message ||
                err.response?.data ||
                "회원가입 중 오류가 발생했습니다.";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[var(--toss-bg)] px-6 py-16">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md rounded-3xl border border-[var(--toss-border)] bg-white/90 p-10 shadow-[0_30px_60px_rgba(19,32,46,0.12)] backdrop-blur"
            >
                <div className="text-center">
                    <span className="toss-tag uppercase">Admin</span>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-[var(--toss-text-strong)]">
                        관리자 회원가입
                    </h1>
                    <p className="mt-2 text-sm text-[var(--toss-text-medium)]">
                        간단한 정보만으로 관리 계정을 생성합니다.
                    </p>
                </div>

                <div className="mt-10 space-y-5">
                    <div>
                        <label
                            htmlFor="username"
                            className="mb-2 block text-sm font-semibold text-[var(--toss-text-medium)]"
                        >
                            아이디
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={form.username}
                            onChange={(e) =>
                                setForm({ ...form, username: e.target.value })
                            }
                            placeholder="아이디를 입력하세요"
                            autoComplete="username"
                            className="w-full rounded-2xl border border-[var(--toss-border)] px-4 py-3 text-sm transition focus:border-[var(--toss-primary)] focus:outline-none"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-semibold text-[var(--toss-text-medium)]"
                        >
                            비밀번호
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={form.password}
                            onChange={(e) =>
                                setForm({ ...form, password: e.target.value })
                            }
                            placeholder="비밀번호를 입력하세요"
                            autoComplete="new-password"
                            className="w-full rounded-2xl border border-[var(--toss-border)] px-4 py-3 text-sm transition focus:border-[var(--toss-primary)] focus:outline-none"
                        />
                    </div>

                    {error && (
                        <p className="text-center text-sm text-red-500">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={!isValid || loading}
                        className={`h-12 w-full rounded-full text-sm font-semibold transition ${
                            isValid && !loading
                                ? "toss-primary-btn"
                                : "cursor-not-allowed bg-[rgba(25,31,40,0.08)] text-[var(--toss-text-weak)]"
                        }`}
                    >
                        {loading ? "가입 중..." : "회원가입"}
                    </button>
                </div>

                <div className="mt-8 text-center text-xs text-[var(--toss-text-medium)]">
                    이미 계정이 있으신가요?{" "}
                    <Link
                        to="/admin/login"
                        className="font-semibold text-[var(--toss-primary)] underline-offset-4 hover:underline"
                    >
                        로그인하기
                    </Link>
                </div>
            </form>
        </div>
    );
}
