import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import EducationPage from "./pages/EducationPage";
import PhotoPage from "./pages/PhotoPage.jsx";
import PhotoDetail from "./components/PhotoDetail.jsx";
import PhotoCreatePage from "./pages/PhotoCreatePage.jsx";
import InquiryPage from "./pages/InquiryPage.jsx";
import InquiryDetail from "./components/InquiryDetail.jsx";
import InquiryCreatePage from "./pages/InquiryCreatePage.jsx";
import CompanyPage from "./pages/CompanyPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import StressPage from "./pages/StressPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/index" replace />} />
                <Route path="/index" element={<Home />} />
                <Route path="/admin/login" element={<LoginPage />} />
                <Route path="/admin/signup" element={<SignupPage />} />
                <Route path="/company" element={<CompanyPage />} />
                <Route path="/education" element={<EducationPage />} />
                <Route path="/stress" element={<StressPage />} />
                <Route path="/photos" element={<PhotoPage />} />
                <Route path="/photos/new" element={<PhotoCreatePage />} />
                <Route path="/photos/:id" element={<PhotoDetail />} />
                <Route path="/inquiry" element={<InquiryPage />}/>
                <Route path="/inquiry/new" element={<InquiryCreatePage />} />
                <Route path="/inquiry/:id" element={<InquiryDetail />} />
            </Routes>
        </Router>
    );
}

export default App;
