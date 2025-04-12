import React from 'react';
import { cn } from '@/lib/utils';
import Sidebar from '../sidebar';

interface LayoutProps {
    children: React.ReactNode;
    className?: string;
}

export const Layout = ({ children, className }: LayoutProps) => {
    return (
        <div className="min-h-screen bg-background">
            <div className="flex min-h-screen">
                <aside className="fixed inset-y-0 left-0 z-50 flex h-full w-72 flex-col border-r border-border/20 bg-card shadow-xl">
                    <Sidebar />
                </aside>
                <main className="ml-72 flex-1">
                    <div className={cn("container mx-auto p-8", className)}>
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export const PageHeader = ({ children, className }: LayoutProps) => {
    return (
        <div className={cn("mb-8 space-y-2", className)}>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">{children}</h1>
            {className?.includes('with-separator') && (
                <div className="h-px w-full bg-border/20" />
            )}
        </div>
    );
};

export const Section = ({ children, className }: LayoutProps) => {
    return (
        <section className={cn(
            "mb-8 rounded-lg border border-border/20 bg-card p-6 text-card-foreground shadow-lg",
            className
        )}>
            {children}
        </section>
    );
}; 