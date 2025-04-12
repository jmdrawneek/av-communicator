import React, { useCallback, useState } from 'react';
import { SingleInput } from '@/components/singleInput';
import { useCurrentAutomation } from '@/context/currentAutomationContext';

import styles from './styles.module.scss';
import { Button } from '@/components/button';

export const FlowName = ({ visualStyle = 'onWhite' }) => {
    const { setAutomationName, automationName } = useCurrentAutomation();
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = useCallback((automationName: string) => {
        setAutomationName(automationName);
        setIsEditing(false);
    }, [setAutomationName]);

    return (
        <div className={`${styles.flowNameContainer} ${styles[visualStyle]}`}>
            {!isEditing && <p>Automation Name &ldquo;{automationName}&ldquo;<Button buttonStyle='primarySmallOnDark' onClick={() => setIsEditing(true)}>Edit</Button></p>}
            {isEditing && <SingleInput updateValue={handleEdit} size={20} label={<label className={styles.flowName}>Automation name: </label>} />}
        </div>
    );
};