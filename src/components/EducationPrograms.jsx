import React, {useEffect, useState} from "react";
import DetailCard from "./DetailCard"; // ✅ ModalCard → DetailCard 교체
import {FaCog, FaPlus} from "react-icons/fa";
import api from "../utils/api.js";

export default function EducationPrograms() {
    const [selectedItem, setSelectedItem] = useState(null); // 상세 보기용
    const [editItem, setEditItem] = useState(null); // 수정 모달용
    const [addItemModal, setAddItemModal] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);
    const hasToken = !!localStorage.getItem("ACCESS_TOKEN");

    const [categories, setCategories] = useState([
        {
            title: "진로",
            type: "CAREER",     // ✅ enum 매핑
            target: "UNIVERSITY",
            items: [],
        },
        {
            title: "취업",
            type: "JOB",
            target: "UNIVERSITY",
            items: [],
        },
        {
            title: "창업",
            type: "STARTUP",
            target: "COMPANY",
            items: [],
        },
    ]);


    useEffect(() => {
        fetchPrograms();
    }, []);
    const fetchPrograms = async () => {
        try {
            const res = await api.get("/api/edu-programs");
            console.log('aaaaaa',res)
            // setCategories(res.data); // 서버에서 {title, items[]} 구조로 내려주면 됨
        } catch (err) {
            console.error("프로그램 불러오기 실패:", err);
        }
    };
    // 추가 핸들러 (진로 카테고리에만 적용)
    const handleAdd = (newItem) => {
        setCategories((prev) =>
            prev.map((cat) =>
                cat.title === "진로"
                    ? { ...cat, items: [...cat.items, newItem].slice(0, 5) } // ✅ 최대 5개 제한
                    : cat
            )
        );
        setAddItemModal(false);
    };
    // ✅ 저장 (수정)
    const handleSave = async (newData, cat) => {
        try {
            const formData = new FormData();
            formData.append("name", newData.title);
            formData.append("description", newData.description);
            formData.append("link", newData.link || "");
            formData.append("type", cat.type);     // ✅ enum 값
            formData.append("target", cat.target); // ✅ enum 값

            if (newData.image instanceof File) {
                formData.append("image", newData.image);
            }

            if (newData.id) {
                await api.put(`/api/edu-programs/${newData.id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                await api.post("/api/edu-programs", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }

            alert("저장 성공 ✅");
            setEditItem(null);
            setAddItemModal(false);
            fetchPrograms();
        } catch (err) {
            console.error("저장 실패:", err);
            alert("저장 실패 ❌");
        }
    };
    // ✅ 삭제
    const handleDelete = async (id) => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;
        try {
            await api.delete(`/api/edu-programs/${id}`);
            alert("삭제 성공 ✅");
            fetchPrograms();
        } catch (err) {
            console.error("삭제 실패:", err);
            alert("삭제 실패 ❌");
        }
    };

    return (
        <>
            {/* 대학 섹션 */}
            <section className="max-w-7xl mx-auto px-6 py-12 flex-1">
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-2xl font-bold">대학</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((cat, idx) => (
                        <div key={idx} className="bg-white rounded-lg shadow hover:shadow-md transition p-6">
                            {/* 카테고리 타이틀 + + 버튼 */}
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {cat.title}
                                </h3>
                                { hasToken && (
                                    <button
                                        onClick={() => {
                                            setCurrentCategory(cat);   // ✅ 어느 카테고리에서 추가하는지 저장
                                            setAddItemModal(true);
                                        }}
                                        className="ml-2 p-1 rounded-full  text-gray-500 hover:text-blue-500"
                                    >
                                        <FaPlus size={18} />
                                    </button>
                                )}
                            </div>
                            <ul className="space-y-3 max-h-100 overflow-y-auto pr-2 custom-scrollbar">
                                {cat.items.map((item, i) => (
                                    <li
                                        key={i}
                                        className="flex justify-between items-center p-3 rounded hover:bg-gray-50 transition"
                                    >
                                        {/* 상세 보기 */}
                                        <div
                                            className="cursor-pointer"
                                            onClick={() =>
                                                setSelectedItem({
                                                    title: item.name,
                                                    description: item.desc,
                                                    image: item.img,
                                                    link: item.link,
                                                })
                                            }
                                        >
                                            <p className="font-medium text-gray-700">{item.name}</p>
                                            <p className="text-xs text-gray-500">{item.desc}</p>
                                        </div>

                                        {/* 수정 아이콘 */}
                                        {hasToken && (
                                            <button
                                                onClick={() =>
                                                    setEditItem({
                                                        title: item.name,
                                                        description: item.desc,
                                                        image: item.img,
                                                        link: item.link,
                                                    })
                                                }
                                                className="ml-3 text-gray-400 hover:text-blue-500"
                                            >
                                                <FaCog size={18} />
                                            </button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* 기업 섹션 */}
            <section className="max-w-7xl mx-auto px-6 pt-0 pb-12 flex-1">
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-2xl font-bold">기업</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((cat, idx) => (
                        <div key={idx} className="bg-white rounded-lg shadow hover:shadow-md transition p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {cat.title}
                                </h3>
                                { hasToken && (
                                    <button
                                        onClick={() => setAddItemModal(true)}
                                        className="ml-2 p-1 rounded-full  text-gray-500 hover:text-blue-500"
                                    >
                                        <FaPlus size={18} />
                                    </button>
                                )}
                            </div>
                            <ul className="space-y-3 max-h-100 overflow-y-auto pr-2 custom-scrollbar">
                                {cat.items.map((item, i) => (
                                    <li
                                        key={i}
                                        className="flex justify-between items-center p-3 rounded hover:bg-gray-50 transition"
                                    >
                                        <div
                                            className="cursor-pointer"
                                            onClick={() =>
                                                setSelectedItem({
                                                    title: item.name,
                                                    description: item.desc,
                                                    image: item.img,
                                                    link: item.link,
                                                })
                                            }
                                        >
                                            <p className="font-medium text-gray-700">{item.name}</p>
                                            <p className="text-xs text-gray-500">{item.desc}</p>
                                        </div>
                                        {hasToken && (
                                            <button
                                                onClick={() =>
                                                    setEditItem({
                                                        title: item.name,
                                                        description: item.desc,
                                                        image: item.img,
                                                        link: item.link,
                                                    })
                                                }
                                                className="ml-3 text-gray-400 hover:text-blue-500"
                                            >
                                                <FaCog size={18} />
                                            </button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* 상세 보기 모달 */}
            <DetailCard
                isOpen={!!selectedItem}
                onClose={() => setSelectedItem(null)}
                item={selectedItem}
            />

            {/* 수정 모달 */}
            <DetailCard
                isOpen={!!editItem}
                onClose={() => setEditItem(null)}
                item={editItem}
                editable={true}
                onSave={handleSave}
            />
            {/* 추가 모달 */}
            <DetailCard
                isOpen={addItemModal}
                onClose={() => setAddItemModal(false)}
                item={{ title: "", description: "", image: "" }}
                editable={true}
                onSave={(newData) => handleSave(newData, currentCategory)}
            />
        </>
    );
}
