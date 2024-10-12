import { AutomationConfig } from '@/helpers/convertFlowToCommand';

const randomTimeoutDelay = async ({ delay }: { delay: number }) => {
    return new Promise((resolve) => setTimeout(resolve, Math.floor(Math.random() * delay)))
}
export const startProcess = ({ 
        signalFinished, 
        nodeListener, 
        id 
    }: { 
        signalFinished: (id: string) => void, 
        nodeListener: AutomationConfig['steps'][number]['data']['signal'], 
        id: string 
    }
) => {

    // Let the node know it's active.
    nodeListener.set({ active: true, id });

    randomTimeoutDelay({ delay: 3000 })
        .then(() => {
            nodeListener.set({ active: false, id });
            signalFinished(id);
        });

}