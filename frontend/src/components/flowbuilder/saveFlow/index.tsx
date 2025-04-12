import React, { useCallback } from 'react';

import { Edge, Node } from '@xyflow/react';

import { useCurrentAutomation } from '@/context/currentAutomationContext';

import { saveFlow } from '@/helpers/localStorage';

import { Button } from '@/components/button';

export interface savedFlow {
    nodes: Node[];
    edges: Edge[];
    automationName: string;
}

export const SaveFlow = () => {
    const { currentAutomation, automationName } = useCurrentAutomation();

    const saveFlowFn = useCallback(() => {
        if (!automationName || !currentAutomation) return;
        console.log({ automationName, automation: currentAutomation });
        saveFlow({
            flowName: automationName, flow: {
                nodes: currentAutomation.nodes,
                edges: currentAutomation.edges,
                automationName: automationName
            }
        });
    }, [automationName, currentAutomation]);

    return <Button variant="primary" size="lg" onClick={saveFlowFn}>Save</Button>;
};