import React, { useCallback } from 'react';

import { useCurrentFlow } from '@/context/currentFlowContext';
import { convertFlowToCommand } from '@/helpers/convertFlowToCommand';

import { Button } from '@/components/button';

import { AutomationConfig } from '@/helpers/convertFlowToCommand';
import { startProcess } from './startProocess';


const runFlow = ({ flowName, steps }: AutomationConfig) => {
    const promiseMap = new Map();
    console.log(`Running flow ${flowName}`);

    steps.forEach(({ data, source, id }: AutomationConfig['steps'][number]) => {

        promiseMap.set(id,
            [...(promiseMap.get(id) || []),
            () => new Promise((yes: (id: string) => void) => {
                const sourcePromise = promiseMap.get(source) || Promise.resolve('Start node');

                if ('signal' in data) {
                    sourcePromise.then(() => {
                        startProcess({ signalFinished: yes, nodeListener: data.signal, id })
                        
                    });
                }
                else {
                    throw new Error(`No signal found on node ${id}`);
                }
            })
            ])
    });

    Array.from(promiseMap.keys()).forEach((key) => {
        promiseMap.set(key, 
            Promise.all(promiseMap.get(key)
                // Start the processes once in sequence.
                .map((fn: () => Promise<string>) => fn())
        ))
    });
}


export const RunFlow = () => {
    const { currentFlow, flowName } = useCurrentFlow();

    const saveFlowFn = useCallback(async () => {
        if (!flowName || !currentFlow) return;
        const flow = convertFlowToCommand({ flow: currentFlow });

        console.log({ flow })

        runFlow(flow)

    }, [flowName, currentFlow]);

    return <Button buttonStyle="primary" onClick={saveFlowFn}>Run Flow</Button>;
}