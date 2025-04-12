import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../button';
import { Monitor, Plus } from 'lucide-react';
import { type Device } from '../../../../shared/devices';
import type { DeviceWithAction } from '../flowbuilder/stepNode';

interface DeviceCardProps {
    device: Device;
    deviceId: string;
    status: 'online' | 'offline';
    className?: string;
    onSelect?: (device: DeviceWithAction) => void;
}

export const DeviceCard = ({
    device,
    deviceId,
    onSelect,
    className
}: DeviceCardProps) => {
    const { name, type } = device;
    return (
        <div className={cn(
            "card group relative overflow-hidden transition-all hover:shadow-2xl hover:shadow-accent/5",
            className
        )}>
            {/* Status indicator */}
            <div className={cn(
                "absolute right-4 top-4 h-2 w-2 rounded-full",
                status === 'online' ? "bg-green-500" : "bg-red-500"
            )} />

            {/* Icon */}
            <div className="mb-4">
                <Monitor className="h-8 w-8 text-accent" />
            </div>

            {/* Content */}
            <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground">{name}</h3>
                <p className="text-sm text-muted-foreground">{type}</p>
                <p className="text-sm text-muted-foreground">{deviceId}</p>
                <p className="text-sm text-muted-foreground">{device.actions.map((action) => action.label).join(', ')}</p>
                <p className="text-sm text-muted-foreground">{device.manufacturer}</p>
                <p className="text-sm text-muted-foreground">{device.model}</p>
            </div>

            {/* Actions */}
            <div className="mt-6 flex items-center gap-2">
                {onSelect && (
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onSelect(device)}
                        className="transition-transform hover:scale-105"
                    >
                        <Plus className="h-4 w-4" color="white" />
                    </Button>
                )}
            </div>

            {/* Hover effect */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
    );
};