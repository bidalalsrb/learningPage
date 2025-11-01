import React from "react";
import { Link } from "react-router-dom";

export default function Breadcrumb({ items = [] }) {
    if (!Array.isArray(items) || items.length === 0) return null;

    const lastIndex = items.length - 1;

    return (
        <nav
            aria-label="현재 위치"
            className=" backdrop-blur-md border-b border-transparent mt-3"
        >
            <div className="toss-container py-3">
                <ol className="flex items-center flex-wrap gap-1.5 text-[13px] text-[var(--toss-text-medium)]">
                    {items.map((item, idx) => {
                        const isLast = idx === lastIndex;
                        return (
                            <li key={idx} className="flex items-center gap-1">
                                {idx > 0 && (
                                    <span className="text-[var(--toss-text-weak)] opacity-60">
                                        >
                                    </span>
                                )}
                                {item.to && !isLast ? (
                                    <Link
                                        to={item.to}
                                        className="transition-colors duration-200 hover:text-[var(--toss-primary)]"
                                    >
                                        {item.label}
                                    </Link>
                                ) : (
                                    <span
                                        className={`${
                                            isLast
                                                ? "font-semibold text-[var(--toss-text-strong)]"
                                                : "text-[var(--toss-text-medium)]"
                                        }`}
                                        aria-current={isLast ? "page" : undefined}
                                    >
                                        {item.label}
                                    </span>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </div>
        </nav>
    );
}
