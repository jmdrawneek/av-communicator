import React, { useCallback } from 'react';

import { useAutomationContext } from '@/context/automationContext';
import { convertFlowToCommand } from '@/helpers/convertFlowToCommand';
import { Button } from '@/components/button';

export const RunAutomation = () => {
    const { nodes, edges, automationName, currentAutomation } = useAutomationContext();

    const runAutomation = useCallback(() => {
        if (!currentAutomation) return;

        const config = convertFlowToCommand({
            flow: {
                nodes,
                edges,
                automationName
            }
        });

        console.log('Running automation:', config);

        // Here you would send the automation config to your backend or process it
        // For now, let's just log it
        alert('Automation started! Check console for details.');
    }, [nodes, edges, automationName, currentAutomation]);

    return (
        <Button variant="primary" size="sm" onClick={runAutomation}>
            Run Automation
        </Button>
    );
}; 