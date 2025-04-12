import React, { useCallback, useEffect, useState } from 'react';

import { useCurrentAutomation } from '@/context/currentAutomationContext';
import { loadFlow, listFlows } from '@/helpers/localStorage';

import type { savedFlow } from '@/components/flowbuilder/saveFlow';

import { Button } from '@/components/button';

export const LoadFlow = () => {
    const { currentAutomation, setEdges, setNodes, setAutomationName, setLoadedAutomation } = useCurrentAutomation();
    const [flowList, setFlowList] = useState<string[]>([]);
    const [selectedFlow, setSelectedFlow] = useState<string>('');
    const [loadTrayOpen, setLoadTrayOpen] = useState(false);

    useEffect(() => {
        listFlows().then((flowNames) => {
            setFlowList(flowNames);
        });
    }, []);

    const toggleLoadTray = useCallback(() => {
        setLoadTrayOpen(!loadTrayOpen);
    }, [loadTrayOpen]);

    const loadFlowFn = useCallback(async () => {
        if (!currentAutomation) return;
        const loadedFlow = await loadFlow({ flowName: selectedFlow });
        if (!loadedFlow) return;

        setEdges(loadedFlow.edges);
        setNodes(loadedFlow.nodes);
        setAutomationName(selectedFlow);
        setLoadedAutomation(selectedFlow);
        toggleLoadTray();
    }, [currentAutomation, setEdges, setNodes, setAutomationName, setLoadedAutomation, selectedFlow, toggleLoadTray]);

    return (
        <div className="relative">
            <Button variant="primary" onClick={toggleLoadTray}>Load</Button>
            {loadTrayOpen && (
                <div className="absolute top-full left-0 mt-2 p-4 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                    <select
                        className="w-full p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={selectedFlow}
                        onChange={(e) => setSelectedFlow(e.target.value)}
                    >
                        <option value="">Select a flow</option>
                        {flowList.map((flowName) => (
                            <option key={flowName} value={flowName}>{flowName}</option>
                        ))}
                    </select>
                    <Button
                        variant="primary"
                        onClick={loadFlowFn}
                        className="w-full"
                    >
                        Load Selected Flow
                    </Button>
                </div>
            )}
        </div>
    );
};