import React from "react";
import Modal from "react-modal";

// React-Modal 설정
Modal.setAppElement("#root");

export default function ModalCard({ isOpen, onClose, title, description, image, link }) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 outline-none animate-fade-in"
        >
            {/* 제목 */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{title}</h2>
                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-black text-lg"
                >
                    ✕
                </button>
            </div>

            {/* 이미지 */}
            {image && (
                <img
                    src={image}
                    alt={title}
                    className="w-full h-48 object-cover rounded mb-4"
                />
            )}

            {/* 설명 */}
            <p className="text-gray-600 mb-4">{description}</p>

            {/* 링크 */}
            {link && (
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    자세히 보기
                </a>
            )}
        </Modal>
    );
}
