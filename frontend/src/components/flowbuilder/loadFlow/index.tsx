import React, { useCallback, useEffect, useState } from 'react';

import { useCurrentAutomation } from '@/context/currentAutomationContext';
import { loadFlow, listFlows } from '@/helpers/localStorage';

import type { savedFlow } from '@/components/flowbuilder/saveFlow';

import { Button } from '@/components/button';

import styles from './styles.module.scss';

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
        const loadedFlow = await loadFlow({ flowName: selectedFlow }) as savedFlow;
        console.log({ loadedFlow })
        setEdges(loadedFlow.edges);
        setNodes(loadedFlow.nodes);
        setAutomationName(selectedFlow);
        setLoadedAutomation(selectedFlow);
        toggleLoadTray();
    }, [currentAutomation, setEdges, setNodes, setAutomationName, setLoadedAutomation, selectedFlow, toggleLoadTray]);

    return (
        <div>
            <Button buttonStyle="primary" onClick={toggleLoadTray}>Load</Button>
            {loadTrayOpen && (
                <div className={styles.loadTray}>
                    <select value={selectedFlow} onChange={(e) => setSelectedFlow(e.target.value)}>
                        <option value="">Select a flow</option>
                        {flowList.map((flowName) => (
                            <option key={flowName} value={flowName}>{flowName}</option>
                        ))}
                    </select>
                    <Button buttonStyle="primary" onClick={loadFlowFn}>Load Selected Flow</Button>
                </div>
            )}
        </div>
    );
};