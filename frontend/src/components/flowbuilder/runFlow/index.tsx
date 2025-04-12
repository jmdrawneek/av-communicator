import React, { useCallback } from 'react';

import { useCurrentAutomation } from '@/context/currentAutomationContext';
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
    const { currentAutomation, automationName } = useCurrentAutomation();

    const saveFlowFn = useCallback(async () => {
        if (!automationName || !currentAutomation) return;
        const flow = convertFlowToCommand({
            flow: {
                nodes: currentAutomation.nodes,
                edges: currentAutomation.edges,
                automationName: automationName
            }
        });

        console.log({ flow })

        runFlow(flow)

    }, [automationName, currentAutomation]);

    return <Button buttonStyle="primary" onClick={saveFlowFn}>Run Automation</Button>;
}