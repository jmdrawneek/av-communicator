import React from "react";

import Link from "next/link";

import { Button } from "../button";
import { FlowControls } from "../flowControl";

import styles from './styles.module.scss';


const Sidebar = () => {
    return (
        <div className={styles.sidebarContainer}>
            <nav className={styles.mainNav}>
                <ul className={styles.navList}>
                    <li><Link href="/rooms"><Button buttonStyle="primaryOnDark">Rooms</Button></Link></li>
                    <li><Link href="/devices"><Button buttonStyle="primaryOnDark">Devices</Button></Link></li>
                    <li><Link href="/automation-builder"><Button buttonStyle="primaryOnDark">Automatons</Button></Link></li>
                    <li><Link href="/settings"><Button buttonStyle="primaryOnDark">Settings</Button></Link></li>
                </ul>
            </nav>

            <nav className={styles.footerNav}>
                <FlowControls />
                <ul className={styles.navList}>
                    <li><Link href="/logout"><Button buttonStyle="primaryOnDark">Logout</Button></Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;