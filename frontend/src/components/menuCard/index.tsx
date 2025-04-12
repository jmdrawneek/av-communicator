import React, { useCallback, useState } from "react";

import type { DashboardConfig } from "@/context/dashboardContext";
import type { RoomConfig } from "@/context/roomContext";

import Link from "next/link";

import { Button } from "../button";

import styles from "./styles.module.scss";

const CardInner = ({ isEditing, itemName, updateItemName, namePlaceholder }: {
    item: RoomConfig | DashboardConfig,
    isEditing: boolean,
    itemName: string,
    updateItemName: (e: React.ChangeEvent<HTMLInputElement>) => void,
    namePlaceholder: string
}) => {
    return (
        <>
            {isEditing && <input className={styles.title} value={itemName} placeholder={namePlaceholder} onChange={updateItemName} />}
            {!isEditing && <h1 className={styles.title}>{itemName}</h1>}
        </>
    )
}

export const MenuCard = ({ item, cardType, saveItem, deleteItem, namePlaceholder, currentRoom }: {
    item: RoomConfig | DashboardConfig,
    cardType: 'rooms' | 'dashboards',
    saveItem: (item: RoomConfig | DashboardConfig) => void,
    deleteItem: (id: string) => void,
    namePlaceholder: string,
    currentRoom?: RoomConfig
}) => {
    const [itemName, setItemName] = useState(item.name);
    const [isEditing, setIsEditing] = useState(item.notSaved);

    const save = useCallback(() => {
        // Save the room with the new name.
        saveItem({ ...item, name: itemName, ...(currentRoom ? { roomId: currentRoom.id } : {}) });
        setIsEditing(false);
    }, [saveItem, item, itemName, currentRoom]);

    const updateItemName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setItemName(e.target.value);
    }, []);

    const edit = useCallback(() => {
        setIsEditing(true);
    }, []);

    const deleteItemCb = useCallback(() => {
        deleteItem(item.id);
    }, [item.id, deleteItem]);

    const activeLink = !item.notSaved && !isEditing;

    return (
        <div className={styles.container}>
            {activeLink && (
                <Link href={`/${cardType}/${item.id}`}>
                    <CardInner
                        item={item}
                        isEditing={false}
                        itemName={item.name}
                        updateItemName={updateItemName}
                        namePlaceholder={namePlaceholder}
                    />
                </Link>
            )}
            {!activeLink && (
                <CardInner
                    item={item}
                    isEditing={isEditing}
                    itemName={itemName}
                    updateItemName={updateItemName}
                    namePlaceholder={namePlaceholder}
                />)}
            <div className={styles.buttons}>
                {isEditing && <Button variant="primary" size="sm" onClick={save} >Save</Button>}
                {!isEditing && <Button variant="primary" size="sm" onClick={edit}>Edit</Button>}
                {(!item.notSaved && isEditing) && <Button variant="primary" size="sm" onClick={deleteItemCb}>Delete</Button>}
            </div>
        </div>
    );
}