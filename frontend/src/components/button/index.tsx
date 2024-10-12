import React from "react";

import styles from './styles.module.scss';

export const Button = ({ 
    children, 
    btnType = 'button',
    buttonStyle = 'primary',
    onClick = () => {} 
} : { 
        children: React.ReactNode, 
        btnType?: 'button' | 'submit' | 'reset', 
        buttonStyle?: 'primary' | 'primaryOnDark' | 'primarySmall' | 'primarySmallOnDark' | 'secondary' | 'secondaryOnDark',
        onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void 
    }) => {
    return <button type={btnType} className={styles[buttonStyle]} onClick={onClick}>{children}</button>;
}