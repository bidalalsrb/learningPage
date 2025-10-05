import React, { useState, useEffect } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function DetailCard({ isOpen, onClose, item, editable = false, onSave }) {
    const [form, setForm] = useState({ title: "", description: "", image: "" });

    useEffect(() => {
        if (item) {
            setForm({
                title: item.title || "",
                description: item.description || "",
                image: item.image || "",
            });
        }
    }, [item]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 outline-none"
        >
            {/* 헤더 */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                    {editable ? "내용 수정" : form.title}
                </h2>
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 text-lg"
                >
                    ✕
                </button>
            </div>

            {/* 이미지 미리보기 */}
            {form.image && (
                <img
                    src={form.image}
                    alt="미리보기"
                    className="w-full h-48 object-cover rounded-md mb-4 border"
                />
            )}

            {/* 수정 모드 */}
            {editable ? (
                <div className="space-y-3">
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="제목"
                        className="w-full border px-3 py-2 rounded"
                    />
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="내용"
                        className="w-full border px-3 py-2 rounded"
                    />
                    <input
                        type="text"
                        name="image"
                        value={form.image}
                        onChange={handleChange}
                        placeholder="이미지 URL"
                        className="w-full border px-3 py-2 rounded"
                    />

                    <div className="flex justify-end gap-2">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                        >
                            취소
                        </button>
                        <button
                            onClick={() => onSave(form)}
                            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                        >
                            저장
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    {/* 읽기 모드 */}
                    <p className="text-gray-600 mb-6">{form.description}</p>
                    <div className="flex justify-center">
                        <a
                            href={item?.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        >
                            문의하기
                        </a>
                    </div>
                </>
            )}
        </Modal>
    );
}
