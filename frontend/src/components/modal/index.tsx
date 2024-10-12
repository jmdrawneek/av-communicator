import React from "react";
import { Root, Trigger, Portal, Overlay, Content, Close, DialogTitle } from "@radix-ui/react-dialog";

import styles from './style.module.scss';


export const Modal = ({ triggerText, content, title }: { triggerText: string, content: React.ReactNode, title: string }) => (
    <Root>
        <Trigger asChild>
            <button className={`${styles.Button} violet`}>{triggerText}</button>
        </Trigger>
        <Portal>
            <Overlay className={styles.Overlay} />
            <Content className={styles.Content}>
                <DialogTitle>{title}</DialogTitle>
                {content}
                <Close asChild>
                    <button className={styles.IconButton} aria-label="Close">
                    X
                </button>
            </Close>
            </Content>
        </Portal>
    </Root>
);
