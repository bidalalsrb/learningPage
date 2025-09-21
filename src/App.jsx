import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EducationPage from "./pages/EducationPage";
import PhotoPage from "./pages/PhotoPage.jsx";
import PhotoDetail from "./components/PhotoDetail.jsx";
import InquiryPage from "./pages/InquiryPage.jsx";
import InquiryDetail from "./components/InquiryDetail.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/education" element={<EducationPage />} />
                <Route path="/photos" element={<PhotoPage />} /> {/* 새로운 라우트 */}
                <Route path="/photos/:id" element={<PhotoDetail />} /> {/* ✅ 상세 */}
                <Route path="/inquiry" element={<InquiryPage />}/>
                <Route path="/inquiry/:id" element={<InquiryDetail />} />
            </Routes>
        </Router>
    );
}

export default App;
