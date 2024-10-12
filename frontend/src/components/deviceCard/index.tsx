import React, { useState } from "react";

import type { Device } from "../../../../shared/devices";

import styles from './styles.module.scss';
import { DeviceWithAction } from "../flowbuilder/stepNode";

export const DeviceCard = ({ device, deviceId, onSelect }: { device: Device, deviceId: string, onSelect: (device: DeviceWithAction) => void }) => {
    const [selectedAction, setSelectedAction] = useState<{name: string, action: string, deviceId: string} | null>(null);
    const [deviceIp, setDeviceIp] = useState<string | null>(null);


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedAction && deviceIp) {
            onSelect({name: device.name, action: selectedAction.action, deviceId, ip: deviceIp, type: device.type});
        }
    }

    return (
    <div>
        <h3>{device.name}</h3>
        <form onSubmit={handleSubmit}>
            <fieldset className={styles.deviceActionsList}>
                {device.actions.map(({id, label}) => (
            <li key={id} className={styles.deviceActionListItem}>
                <label htmlFor={id}>{label}</label>
                <input className={styles.deviceAction} type="radio" id={id} onChange={() => setSelectedAction({name: device.name, action: id, deviceId })} />
            </li>
                ))}
            </fieldset>
            {selectedAction && <input type="text" placeholder="Device IP" onChange={(e) => setDeviceIp(e.target.value)} />}
            {deviceIp && <button type="submit">Save</button>}
        </form>
    </div>
    );
};