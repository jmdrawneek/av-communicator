import React, { useCallback } from 'react';

import { useCurrentAutomation } from '@/context/currentAutomationContext';
import { deleteFlow } from '@/helpers/localStorage';

export const DeleteFlow = () => {
    const { setEdges, setNodes, setAutomationName, loadedAutomation, setLoadedAutomation } = useCurrentAutomation();

    const deleteFlowFn = useCallback(async () => {
        if (!loadedAutomation) return;
        deleteFlow({ flowName: loadedAutomation });
        setEdges([]);
        setNodes([]);
        setAutomationName('');
        setLoadedAutomation(null);
    }, [loadedAutomation, setEdges, setNodes, setAutomationName, setLoadedAutomation]);

    return (
        <div>
            {loadedAutomation && <button onClick={deleteFlowFn}>Delete</button>}
        </div>
    );
};