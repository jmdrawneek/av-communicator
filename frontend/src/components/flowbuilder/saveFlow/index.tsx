import React, { useCallback } from 'react';

import { Edge, Node } from '@xyflow/react';

import { useCurrentFlow } from '@/context/currentFlowContext';

import { saveFlow } from '@/helpers/localStorage';

import { Button } from '@/components/button';

export interface savedFlow {
    nodes: Node[];
    edges: Edge[];
    flowName: string;
}

export const SaveFlow = () => {
    const { currentFlow, flowName } = useCurrentFlow();

    const saveFlowFn = useCallback(() => {
        if (!flowName || !currentFlow) return;
        console.log({ flowName, flow: currentFlow });
        saveFlow({ flowName, flow: currentFlow });
        


    }, [flowName, currentFlow]);

    return <Button buttonStyle="primary" onClick={saveFlowFn}>Save</Button>;
}