import React from 'react';
import { cn } from '@/lib/utils';

interface LoaderProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export const Loader = ({ size = 'md', className }: LoaderProps) => {
    const sizeClasses = {
        sm: 'h-4 w-4 border-2',
        md: 'h-8 w-8 border-3',
        lg: 'h-12 w-12 border-4'
    };

    return (
        <div className="flex items-center justify-center">
            <div
                className={cn(
                    "animate-spin rounded-full border-current border-t-transparent text-accent",
                    sizeClasses[size],
                    className
                )}
            />
        </div>
    );
};
