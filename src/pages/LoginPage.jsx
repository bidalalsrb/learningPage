import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import api from "../utils/api.js";

export default function LoginPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({username: "", password: ""});
    const [error, setError] = useState("");

    const isValid =
        form.username.trim().length >= 3 && form.password.trim().length >= 4;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isValid) return;
        const payload = {
            username: form.username,
            password: form.password,
        }
        try {
            const res = await api.post("/api/auth/login", payload);
            localStorage.setItem("ACCESS_TOKEN", res.data.accessToken);
            navigate("/index");
        } catch (err) {
            console.error("로그인 실패:", err.response?.data || err.message);
            setError("아이디 또는 비밀번호가 올바르지 않습니다.");
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
                        관리자 로그인
                    </h1>
                    <p className="mt-2 text-sm text-[var(--toss-text-medium)]">
                        안전한 접근을 위해 계정 정보를 입력해주세요.
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
                            autoComplete="current-password"
                            className="w-full rounded-2xl border border-[var(--toss-border)] px-4 py-3 text-sm transition focus:border-[var(--toss-primary)] focus:outline-none"
                        />
                    </div>

                    {error && (
                        <p className="text-center text-sm text-red-500">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={!isValid}
                        className={`h-12 w-full rounded-full text-sm font-semibold transition ${
                            isValid
                                ? "toss-primary-btn"
                                : "cursor-not-allowed bg-[rgba(25,31,40,0.08)] text-[var(--toss-text-weak)]"
                        }`}
                    >
                        로그인
                    </button>
                </div>
            </form>
        </div>
    );
}
