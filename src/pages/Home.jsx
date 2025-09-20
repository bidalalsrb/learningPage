import React from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import FeatureBoxes from "../components/FeatureBoxes";
import NoticeSlider from "../components/NoticeSlider";
import Footer from "../components/Footer.jsx";

export default function Home() {
    return (
        <div>
            <Header />
            <Banner />
            <FeatureBoxes />
            <NoticeSlider />
            <Footer />
        </div>
    );
}
