import React, {useEffect} from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import UniversityProgramPage from "./pages/UniversityProgramPage.jsx";
import CompanyProgramPage from "./pages/CompanyProgramPage.jsx";
import PhotoPage from "./pages/PhotoPage.jsx";
import PhotoDetail from "./components/PhotoDetail.jsx";
import PhotoCreatePage from "./pages/PhotoCreatePage.jsx";
import PhotoEditPage from "./pages/PhotoEditPage.jsx";
import InquiryPage from "./pages/InquiryPage.jsx";
import InquiryDetail from "./components/InquiryDetail.jsx";
import InquiryCreatePage from "./pages/InquiryCreatePage.jsx";
import CompanyPage from "./pages/CompanyPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import StressPage from "./pages/StressPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";

// App 컴포넌트는 라우터를 설정해 페이지 간 이동 경로를 정의합니다.
function App() {

    useEffect(() => {
        const kakaoMapKey = import.meta.env.VITE_KAKAO_MAP_API_KEY;
        if (!window.kakao && kakaoMapKey) {
            const script = document.createElement("script");
            script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapKey}&libraries=services`;
            script.async = true;
            document.head.appendChild(script);
        }
    }, []);
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/index" replace />} />
                <Route path="/index" element={<Home />} />
                <Route path="/admin/login" element={<LoginPage />} />
                <Route path="/admin/signup" element={<SignupPage />} />
                <Route path="/company" element={<CompanyPage />} />
                <Route path="/universty-program" element={<UniversityProgramPage />} />
                <Route path="/compnay-program" element={<CompanyProgramPage />} />
                <Route path="/education" element={<Navigate to="/universty-program" replace />} />
                <Route path="/stress" element={<StressPage />} />
                <Route path="/photos" element={<PhotoPage />} />
                <Route path="/photos/new" element={<PhotoCreatePage />} />
                <Route path="/photos/:id/edit" element={<PhotoEditPage />} />
                <Route path="/photos/:id" element={<PhotoDetail />} />
                <Route path="/inquiry" element={<InquiryPage />}/>
                <Route path="/inquiry/new" element={<InquiryCreatePage />} />
                <Route path="/inquiry/:id" element={<InquiryDetail />} />
            </Routes>
        </Router>
    );
}

export default App;
