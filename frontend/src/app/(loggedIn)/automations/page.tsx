'use client';

import React from "react";
import Link from "next/link";
import styles from "./styles.module.scss";

import { AutomationProvider, useAutomationContext } from "@/context/automationContext";
import { Button } from "@/components/button";

const AutomationList = () => {
    const { automations, notSavedAutomations, addAutomation } = useAutomationContext();

    const allAutomations = [...automations, ...notSavedAutomations];

    return (
        <div className={styles.automationList}>
            {allAutomations.length === 0 ? (
                <p className={styles.noAutomations}>No automations found. Create your first automation to get started.</p>
            ) : (
                <ul className={styles.list}>
                    {allAutomations.map((automation) => (
                        <li key={automation.id} className={styles.automationItem}>
                            <div className={styles.automationInfo}>
                                <h3 className={styles.automationName}>{automation.name}</h3>
                                <div className={styles.metadata}>
                                    {automation.roomId && (
                                        <span className={styles.metadataItem}>
                                            Room: <Link href={`/rooms/${automation.roomId}`}>
                                                {automation.roomId}
                                            </Link>
                                        </span>
                                    )}
                                    {automation.dashboardId && (
                                        <span className={styles.metadataItem}>
                                            Dashboard: <Link href={`/dashboards/${automation.dashboardId}`}>
                                                {automation.dashboardId}
                                            </Link>
                                        </span>
                                    )}
                                    {automation.notSaved && (
                                        <span className={styles.unsavedBadge}>Unsaved</span>
                                    )}
                                </div>
                            </div>
                            <div className={styles.automationActions}>
                                <Link href={`/automations/${automation.id}`} passHref>
                                    <Button buttonStyle="primarySmall">
                                        {automation.notSaved ? 'Continue Editing' : 'Edit'}
                                    </Button>
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const Automations = () => {
    const { addAutomation } = useAutomationContext();

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Automations</h1>
                <p className={styles.description}>
                    Create and manage automations for your AV system. Set up triggers and actions to automate your environment.
                </p>
            </div>

            <div className={styles.controls}>
                <Button buttonStyle="primary" onClick={() => addAutomation()}>
                    Create Automation
                </Button>
            </div>

            <AutomationList />
        </div>
    );
};

const AutomationsPage = () => {
    return <Automations />;
};

export default AutomationsPage; 