import React from "react";

import Link from "next/link";

import { Button } from "../button";

import styles from './styles.module.scss';

const Sidebar = () => {
    return (<div className={styles.sidebarContainer}>
        <nav>
        <ul className={styles.navList}>
            <li><Link href="/dashboard"><Button buttonStyle="primaryOnDark">Dashboard</Button></Link></li>
            <li><Link href="/settings"><Button buttonStyle="primaryOnDark">Settings</Button></Link></li>
        </ul>
        </nav>
    </div>);
};

export default Sidebar;