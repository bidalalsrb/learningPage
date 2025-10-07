import React from "react";
import { Link } from "react-router-dom";

export default function Breadcrumb({ items }) {
    return (
        <nav className="border-b border-[var(--toss-border)] bg-transparent text-sm">
            <div className="toss-container flex items-center gap-2 py-4 text-[var(--toss-text-medium)]">
                {items.map((item, idx) => (
                    <React.Fragment key={idx}>
                        {idx > 0 && <span className="text-[var(--toss-text-weak)]">›</span>}
                        {item.to ? (
                            <Link
                                to={item.to}
                                className="cursor-pointer transition hover:text-[var(--toss-primary)]"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span className="font-semibold text-[var(--toss-text-strong)]">
                                {item.label}
                            </span>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </nav>
    );
}
