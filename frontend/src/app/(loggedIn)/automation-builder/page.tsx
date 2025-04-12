'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AutomationBuilder() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/automations');
    }, [router]);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            flexDirection: 'column',
            gap: '1rem'
        }}>
            <h2>Redirecting...</h2>
            <p>Automations have moved to a new location. You are being redirected.</p>
        </div>
    );
}