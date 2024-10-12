import React, { useCallback, useEffect, useState } from 'react';

import { useCurrentFlow } from '@/context/currentFlowContext';
import { loadFlow, listFlows } from '@/helpers/localStorage';

import type { savedFlow } from '@/components/flowbuilder/saveFlow';

import { Button } from '@/components/button';

import styles from './styles.module.scss';

export const LoadFlow = () => {
    const { currentFlow, setEdges, setNodes, setFlowName, setLoadedFlow } = useCurrentFlow();
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
        if (!currentFlow) return;
        const loadedFlow = await loadFlow({ flowName: selectedFlow }) as savedFlow;
        console.log({loadedFlow})
        setEdges(loadedFlow.edges);
        setNodes(loadedFlow.nodes);
        setFlowName(selectedFlow);
        setLoadedFlow(loadedFlow.flowName);
        toggleLoadTray();
    }, [currentFlow, setEdges, setNodes, setFlowName, setLoadedFlow, selectedFlow, toggleLoadTray]);

    return (
        <>
            {!loadTrayOpen && <Button buttonStyle='secondaryOnDark' onClick={toggleLoadTray}>Load a flow</Button>}
            {loadTrayOpen && (
                <div className={styles.loadFlowBlock}>
                    <label className={styles.label} htmlFor='loaderPicker'>Load a flow:</label>
                    <select id='loaderPicker' value={selectedFlow} onChange={(e) => setSelectedFlow(e.target.value)}>
                        <option value="" disabled>Select a flow</option>
                        {flowList.map((flowName) => (
                            <option key={flowName} value={flowName}>
                                {flowName}
                            </option>
                        ))}
                    </select>
                    {selectedFlow && <Button onClick={loadFlowFn}>Load</Button>}
                </div>
            )}
        </>
    );
};