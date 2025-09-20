import React from "react";
import { Link } from "react-router-dom";

export default function Breadcrumb({ items }) {
    return (
        <nav className="bg-gray-100 border-b text-sm">
            <div className="max-w-7xl mx-auto px-6 py-3 flex gap-2 text-gray-600">
                {items.map((item, idx) => (
                    <React.Fragment key={idx}>
                        {idx > 0 && <span>›</span>}
                        {item.to ? (
                            <Link
                                to={item.to}
                                className="hover:text-blue-600 cursor-pointer"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span className="text-gray-900 font-medium">{item.label}</span>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </nav>
    );
}
