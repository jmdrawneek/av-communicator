import React from "react";

import classNames from "classnames";

import styles from './styles.module.scss';

export const StepWrapper = ({ children, stepType }: { children: React.ReactNode, stepType: string }) => {
    return (
        <div className={classNames(styles.wrapper, styles[stepType])}>
            {children}
        </div>
    );
};