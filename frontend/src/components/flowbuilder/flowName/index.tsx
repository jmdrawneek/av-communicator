import React, { useCallback, useState } from 'react';
import { SingleInput } from '@/components/singleInput';
import { useCurrentFlow } from '@/context/currentFlowContext';

import styles from './styles.module.scss';
import { Button } from '@/components/button';

export const FlowName = ({ visualStyle = 'onWhite'}) => {
    const { setFlowName, flowName } = useCurrentFlow();
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = useCallback((flowName: string) => {
        setFlowName(flowName);
        setIsEditing(false);
    },[setFlowName]);
    
    return (
        <div className={`${styles.flowNameContainer} ${styles[visualStyle]}`}>
            {!isEditing && <p>Flow Name &ldquo;{flowName}&ldquo;<Button buttonStyle='primarySmallOnDark' onClick={() => setIsEditing(true)}>Edit</Button></p>}
            {isEditing && <SingleInput updateValue={handleEdit} size={20} label={<label className={styles.flowName}>Flow name: </label>} />}
        </div>
    );
};