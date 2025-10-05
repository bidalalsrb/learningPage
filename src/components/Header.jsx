import React from "react";
import {Link, useNavigate} from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();


    const handleHome = () => {
        navigate("/index");
    }


    return (
        <header className="flex justify-between items-center px-6 md:px-12 py-5 shadow-sm bg-white">
            {/* 로고 + 회사명 */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={handleHome}>
                <img src="/iconimg.png" alt="회사 로고" className="h-10 md:h-12 w-auto"/>
            </div>

            {/* 네비게이션 */}
            <nav className="flex gap-5 md:gap-8 text-sm md:text-base text-gray-700">
                <Link
                    to="/company"
                    className="cursor-pointer hover:text-blue-600 transition"
                >
                    회사 소개
                </Link>
                <Link
                    to="/education"
                    className="cursor-pointer hover:text-blue-600 transition"
                >
                    교육 프로그램
                </Link>
                <Link
                    to="/stress"
                    className="cursor-pointer hover:text-blue-600 transition"
                >
                    스트레스 관리
                </Link>
                <Link
                    to="/photos"
                    className="cursor-pointer hover:text-blue-600 transition"
                >
                    사진
                </Link>
                <Link
                    to="/inquiry"
                    className="cursor-pointer hover:text-blue-600 transition"
                >
                    문의
                </Link>
                {/*<Link*/}
                {/*    to="#"*/}
                {/*    className="cursor-pointer hover:text-blue-600 transition"*/}
                {/*>*/}
                {/*    관리자 기능*/}
                {/*</Link>*/}
            </nav>
        </header>
    );
}
