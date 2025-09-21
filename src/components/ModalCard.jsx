import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function ModalCard({ isOpen, onClose, title, description, image, link }) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 outline-none"
        >
            {/* 헤더 */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{title}</h2>
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 text-lg"
                >
                    ✕
                </button>
            </div>

            {/* 이미지 */}
            {image && (
                <img
                    src={image}
                    alt={title}
                    className="w-full h-48 object-cover rounded-md mb-4"
                />
            )}

            {/* 설명 */}
            <p className="text-gray-600 mb-6">{description}</p>

            {/* 링크 버튼 */}
            {link && (
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    문의하기
                </a>
            )}
        </Modal>
    );
}
