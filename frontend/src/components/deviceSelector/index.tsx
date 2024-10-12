import React, { useMemo } from 'react';
import { deviceList } from '../../../../shared/devices';
import { DeviceCard } from '../deviceCard';

import styles from './styles.module.scss';
import { DeviceWithAction } from '../flowbuilder/stepNode';

export const DeviceSelector = ({ onSelect }: { onSelect: (device: DeviceWithAction) => void }) => {

    const devices = useMemo(() => Object.values(deviceList), []);
    const deviceIds = useMemo(() => Object.keys(deviceList), []);
    return (
    <div>
        <ul className={styles.deviceList}>
            {devices.map((device, index) => (
                <li key={`${device.name}-${index}`}>
                    <DeviceCard device={device} deviceId={deviceIds[index]} onSelect={onSelect} />
                </li>
            ))}
        </ul>
    </div>
    );
};