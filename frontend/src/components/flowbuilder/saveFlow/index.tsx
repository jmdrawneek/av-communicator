import React, { useCallback } from 'react';

import { useCurrentFlow } from '@/context/currentFlowContext';
import { saveFlow } from '@/helpers/localStorage';
import { Edge, Node } from '@xyflow/react';

export interface savedFlow {
    nodes: Node[];
    edges: Edge[];
    flowName: string;
}

export const SaveFlow = () => {
    const { currentFlow, flowName } = useCurrentFlow();

    const saveFlowFn = useCallback(() => {
        if (!flowName) return;
        console.log({ flowName, flow: currentFlow });
        saveFlow({ flowName, flow: currentFlow });
    }, [flowName, currentFlow]);

    return <button onClick={saveFlowFn}>Save</button>;
}