import React from "react";
import { Link } from "react-router-dom";

export default function Breadcrumb({ items = [] }) {
    if (!Array.isArray(items) || items.length === 0) {
        return null;
    }

    const lastIndex = items.length - 1;

    return (
        <nav
            aria-label="현재 위치"
            className="border-b border-[var(--toss-border)] bg-white/70 backdrop-blur"
        >
            <div className="toss-container py-4">
                <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-[var(--toss-text-medium)]">
                    {items.map((item, idx) => {
                        const isLast = idx === lastIndex;
                        const key = `${item.label}-${idx}`;

                        return (
                            <React.Fragment key={key}>
                                {idx > 0 && (
                                    <span className="text-[var(--toss-text-weak)]">/</span>
                                )}
                                {item.to && !isLast ? (
                                    <Link
                                        to={item.to}
                                        className="transition hover:text-[var(--toss-primary)]"
                                    >
                                        {item.label}
                                    </Link>
                                ) : (
                                    <span
                                        className={
                                            isLast
                                                ? "font-semibold text-[var(--toss-text-strong)]"
                                                : "text-[var(--toss-text-medium)]"
                                        }
                                        aria-current={isLast ? "page" : undefined}
                                    >
                                        {item.label}
                                    </span>
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
