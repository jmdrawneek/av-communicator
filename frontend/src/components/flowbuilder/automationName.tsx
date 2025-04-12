import React, { useState, useEffect } from 'react';

import { useAutomationContext } from '@/context/automationContext';

import styles from './styles.module.scss';

export const AutomationName = () => {
    const { automationName, setAutomationName } = useAutomationContext();
    const [name, setName] = useState(automationName);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        setName(automationName);
    }, [automationName]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleBlur = () => {
        if (name.trim() === '') {
            setName(automationName);
        } else {
            setAutomationName(name);
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (name.trim() === '') {
                setName(automationName);
            } else {
                setAutomationName(name);
            }
            setIsEditing(false);
        } else if (e.key === 'Escape') {
            setName(automationName);
            setIsEditing(false);
        }
    };

    return (
        <div className={styles.automationName}>
            {isEditing ? (
                <input
                    type="text"
                    value={name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    placeholder="Automation name"
                />
            ) : (
                <p onClick={() => setIsEditing(true)}>{name}</p>
            )}
        </div>
    );
}; 