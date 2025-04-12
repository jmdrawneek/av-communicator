'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader } from '@/components/loader';

export default function AutomationBuilder() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/automations');
    }, [router]);

    return (
        <div className="flex min-h-[50vh] flex-col items-center justify-center space-y-4 p-8">
            <div className="flex items-center space-x-4">
                <Loader size="md" />
                <h2 className="text-xl font-semibold text-foreground">Redirecting...</h2>
            </div>
            <p className="text-muted-foreground">
                Automations have moved to a new location. You are being redirected.
            </p>
        </div>
    );
}