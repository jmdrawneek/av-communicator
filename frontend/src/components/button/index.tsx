import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "destructive" | "outline" | "ghost" | "link";
    size?: "sm" | "md" | "lg" | "icon";
    isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", isLoading, children, ...props }, ref) => {
        const baseStyles = "btn";

        const variantStyles = {
            primary: "btn-primary",
            secondary: "btn-secondary",
            destructive: "btn-destructive",
            outline: "btn-outline",
            ghost: "btn-ghost",
            link: "btn-link"
        };

        const sizeStyles = {
            sm: "h-8 px-3 text-xs",
            md: "h-10 px-4",
            lg: "h-12 px-6 text-lg",
            icon: "h-10 w-10"
        };

        return (
            <button
                ref={ref}
                className={cn(
                    baseStyles,
                    variantStyles[variant],
                    sizeStyles[size],
                    isLoading && "opacity-70 pointer-events-none",
                    className
                )}
                disabled={isLoading}
                {...props}
            >
                {isLoading ? (
                    <div className="flex items-center justify-center">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    </div>
                ) : (
                    children
                )}
            </button>
        );
    }
);