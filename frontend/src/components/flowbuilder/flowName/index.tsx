import React, { useCallback, useState } from 'react';
import { SingleInput } from '@/components/singleInput';
import { useCurrentFlow } from '@/context/currentFlowContext';

import styles from './styles.module.scss';

export const FlowName = () => {
    const { setFlowName, flowName } = useCurrentFlow();
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = useCallback((flowName: string) => {
        setFlowName(flowName);
        setIsEditing(false);
    },[]);
    
    return (
        <div className={styles.flowNameContainer}>
            {!isEditing && <p>Flow Name &ldquo;{flowName}&ldquo;<button className={styles.edit} onClick={() => setIsEditing(true)}>Edit</button></p>}
            {isEditing && <SingleInput updateValue={handleEdit} size={20} label={<label className={styles.flowName}>Flow name: </label>} />}
        </div>
    );
};