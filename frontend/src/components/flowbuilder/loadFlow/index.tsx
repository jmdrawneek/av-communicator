import React, { useCallback, useEffect, useState } from 'react';

import { useCurrentFlow } from '@/context/currentFlowContext';
import { loadFlow, listFlows } from '@/helpers/localStorage';

import type { savedFlow } from '@/components/flowbuilder/saveFlow';

export const LoadFlow = () => {
    const { currentFlow, setEdges, setNodes, setFlowName, setLoadedFlow } = useCurrentFlow();
    const [flowList, setFlowList] = useState<string[]>([]);
    const [selectedFlow, setSelectedFlow] = useState<string>('');

    useEffect(() => {
        listFlows().then((flowNames) => {
            setFlowList(flowNames);
        });
    }, []);

    const loadFlowFn = useCallback(async () => {
        if (!currentFlow) return;
        const loadedFlow = await loadFlow({ flowName: selectedFlow }) as savedFlow;
        setEdges(loadedFlow.edges);
        setNodes(loadedFlow.nodes);
        setFlowName(loadedFlow.flowName);
        setLoadedFlow(loadedFlow.flowName);
    }, [currentFlow, setEdges, setNodes, setFlowName, setLoadedFlow, selectedFlow]);

    return (
        <div>
            <select value={selectedFlow} onChange={(e) => setSelectedFlow(e.target.value)}>
                <option value="" disabled>Select a flow</option>
                {flowList.map((flowName) => (
                    <option key={flowName} value={flowName}>
                        {flowName}
                    </option>
                ))}
            </select>
            {selectedFlow && <button onClick={loadFlowFn}>Load</button>}
        </div>
    );
};