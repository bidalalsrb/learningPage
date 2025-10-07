import React from "react";

// Banner 컴포넌트는 프로모션 섹션과 다운로드 버튼을 보여줍니다.
export default function Banner() {
    return (
        <section className="bg-gradient-to-r from-blue-100 to-blue-50 py-16 text-center">
            <h1 className="text-3xl font-bold mb-4">
                금융의 모든 것 <br /> 토스에서 쉽고 간편하게
            </h1>
            <div className="flex justify-center gap-4 mt-6">
                <button className="px-6 py-2 bg-black text-white rounded-lg">
                    App Store
                </button>
                <button className="px-6 py-2 bg-black text-white rounded-lg">
                    Google Play
                </button>
            </div>
        </section>
    );
}
