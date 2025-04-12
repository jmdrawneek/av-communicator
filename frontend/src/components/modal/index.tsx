import React from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { Portal } from '../portal';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
    className?: string;
    variant?: 'modal' | 'drawer';
}

export const Modal = ({ isOpen, onClose, children, title, className, variant = 'modal' }: ModalProps) => {
    if (!isOpen) return null;

    const content = variant === 'drawer' ? (
        <div className="fixed inset-0 z-50">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-background/80 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Drawer */}
            <div className={cn(
                "fixed right-0 top-0 z-50 h-full w-full max-w-md bg-card p-6 shadow-xl",
                "animate-in slide-in-from-right duration-300",
                className
            )}>
                {/* Header */}
                <div className="flex items-center justify-between pb-4">
                    {title && (
                        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
                    )}
                    <button
                        onClick={onClose}
                        className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-accent/10 hover:text-accent"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="relative h-[calc(100%-4rem)] overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    ) : (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-background/80 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className={cn(
                "absolute left-0 top-0 z-50 w-full max-w-container rounded-lg border border-border/20 bg-card p-6 shadow-xl",
                "animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-5",
                className
            )}>
                {/* Header */}
                <div className="flex items-center justify-between pb-4">
                    {title && (
                        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
                    )}
                    <button
                        onClick={onClose}
                        className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-accent/10 hover:text-accent"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="relative">
                    {children}
                </div>
            </div>
        </div>
    );

    return <Portal>{content}</Portal>;
};
