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
            console.log('aaaaaaaaaaaa',res.data);
            localStorage.setItem("ACCESS_TOKEN", res.data.accessToken);
            navigate("/index");
        } catch (err) {
            console.error("로그인 실패:", err.response?.data || err.message);
            setError("아이디 또는 비밀번호가 올바르지 않습니다.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white border rounded-xl shadow-md p-8 space-y-5"
            >
                {/* 타이틀 */}
                <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
                    로그인
                </h1>

                {/* 아이디 */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        아이디
                    </label>
                    <input
                        type="text"
                        value={form.username}
                        onChange={(e) =>
                            setForm({...form, username: e.target.value})
                        }
                        placeholder="아이디를 입력하세요"
                        autoComplete="username"
                        className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* 비밀번호 */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        비밀번호
                    </label>
                    <input
                        type="password"
                        value={form.password}
                        onChange={(e) =>
                            setForm({...form, password: e.target.value})
                        }
                        placeholder="비밀번호를 입력하세요"
                        autoComplete="current-password"
                        className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* 에러 메시지 */}
                {error && (
                    <p className="text-red-500 text-sm text-center">{error}</p>
                )}

                {/* 버튼 */}
                <button
                    type="submit"
                    disabled={!isValid}
                    className={`w-full py-2.5 rounded-lg text-white text-sm font-medium transition
                        ${
                        isValid
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-gray-300 cursor-not-allowed"
                    }`}
                >
                    로그인
                </button>
            </form>
        </div>
    );
}
