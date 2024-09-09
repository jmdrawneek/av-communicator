import React, { useCallback, useEffect, useState } from 'react';

import { useCurrentFlow } from '@/context/currentFlowContext';
import { deleteFlow } from '@/helpers/localStorage';

export const DeleteFlow = () => {
    const { setEdges, setNodes, setFlowName, loadedFlow, setLoadedFlow } = useCurrentFlow();

    const deleteFlowFn = useCallback(async () => {
        if (!loadedFlow ) return;
        deleteFlow({ flowName: loadedFlow });
        setEdges([]);
        setNodes([]);
        setFlowName('');
        setLoadedFlow(null);
    }, [loadedFlow, setEdges, setNodes, setFlowName, setLoadedFlow]);

    return (
        <div>
            {loadedFlow && <button onClick={deleteFlowFn}>Delete</button>}
        </div>
    );
};