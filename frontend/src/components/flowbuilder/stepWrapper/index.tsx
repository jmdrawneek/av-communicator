import React from "react";

import classNames from "classnames";

import styles from './styles.module.scss';

export const StepWrapper = ({ children, stepType, active }: { children: React.ReactNode, stepType: string, active: boolean }) => {
    return (
        <div className={classNames(styles.wrapper, styles[stepType], { [styles.active]: active })}>
            {children}
        </div>
    );
};