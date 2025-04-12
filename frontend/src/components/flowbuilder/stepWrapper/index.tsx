import React from "react";

export const StepWrapper = ({ children, stepType, active }: { children: React.ReactNode, stepType: string, active: boolean }) => {
    const baseClasses = "p-4 px-10 border-none block rounded-[25px] relative text-base";

    const typeClasses = {
        start: "bg-[#13ba3a] text-white",
        step: "bg-[#41c2eed6] text-black pt-4 pb-2",
    };

    const activeClass = active ? "bg-[#13ba3a]" : "";

    return (
        <div className={`${baseClasses} ${typeClasses[stepType as keyof typeof typeClasses]} ${activeClass}`}>
            {children}
        </div>
    );
};