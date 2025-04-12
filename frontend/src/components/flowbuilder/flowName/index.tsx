import React, { useCallback, useState } from 'react';
import { cn } from '@/lib/utils';
import { useCurrentAutomation } from '@/context/currentAutomationContext';
import { SingleInput } from '@/components/singleInput';
import { Button } from '@/components/button';

interface FlowNameProps {
    visualStyle?: 'onWhite';
}

export const FlowName = ({ visualStyle = 'onWhite' }: FlowNameProps) => {
    const { setAutomationName, automationName } = useCurrentAutomation();
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = useCallback((newName: string) => {
        setAutomationName(newName);
        setIsEditing(false);
    }, [setAutomationName]);

    return (
        <div className={cn(
            "flex w-full items-center justify-center gap-2.5",
            visualStyle === 'onWhite' ? "bg-primary text-white px-8 py-4" : "text-foreground"
        )}>
            {!isEditing && (
                <div className="flex items-center gap-2">
                    <p className="text-lg font-semibold">Automation Name &ldquo;{automationName}&ldquo;</p>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(true)}
                        className="text-white hover:bg-white/10"
                    >
                        Edit
                    </Button>
                </div>
            )}
            {isEditing && (
                <SingleInput
                    updateValue={handleEdit}
                    size={20}
                    label={<label className="text-lg font-semibold text-white">Automation name: </label>}
                />
            )}
        </div>
    );
};