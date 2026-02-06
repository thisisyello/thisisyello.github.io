import { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    hoverable?: boolean; // Force hover effect
}

export default function Card({
    children,
    className = "",
    onClick,
    hoverable = false,
}: CardProps) {
    const isInteractive = onClick || hoverable;

    return (
        <div
            onClick={onClick}
            className={`
                rounded-2xl border transition-all duration-300
                border-gray-200 bg-transparent
                dark:border-gray-800 dark:bg-gray-900
                ${
                    isInteractive
                        ? "cursor-pointer hover:border-primary hover:shadow-lg hover:-translate-y-1"
                        : ""
                }
                ${className}
            `}
        >
            {children}
        </div>
    );
}
