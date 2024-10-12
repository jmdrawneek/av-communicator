import React from 'react';
import styles from './styles.module.scss';
export const Loader = ({ colour }: { colour?: string }) => (
    <div className={styles.loaderWrapper}>
        <div className={`${styles.load} ${styles[colour || '']}`}></div>
    </div>
);
