import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";

import {
    listRooms as listRoomsLocalStorage,
    loadRoom as loadRoomLocalStorage,
    saveRoom as saveRoomLocalStorage,
    deleteRoom as deleteRoomLocalStorage
} from "@/helpers/localStorage";

// TODO: Remove when we hook up to the backend.
export function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
}



export type RoomConfig = {
    name: string;
    dashboards: string[];
    flows: string[];
    notSaved: boolean;
    id: string;
}

type RoomContextType = {
    rooms: RoomConfig[];
    setRooms: (rooms: RoomConfig[]) => void;
    currentRoom: RoomConfig | null;
    setCurrentRoom: (roomName: string) => void;
    notSavedRooms: RoomConfig[];
    setNotSavedRooms: (rooms: RoomConfig[]) => void;
    addRoom: () => void;
    saveRoom: (room: RoomConfig) => void;
    deleteRoom: (roomId: string) => void;
    getRoom: (roomId: string) => Promise<RoomConfig | null>;
}

const defaultRoomContext: RoomContextType = {
    rooms: [],
    setRooms: () => { },
    currentRoom: null,
    setCurrentRoom: () => { },
    notSavedRooms: [],
    setNotSavedRooms: () => { },
    addRoom: () => { },
    saveRoom: () => { },
    deleteRoom: () => { },
    getRoom: () => Promise.resolve(null)
}

export const RoomContext = createContext<RoomContextType>(defaultRoomContext);

export const RoomProvider: React.FC<{ children: ReactNode }> = ({ children }: { children: ReactNode }) => {
    const [rooms, setRooms] = useState<RoomConfig[]>(defaultRoomContext.rooms);
    const [currentRoom, setCurrentRoomFn] = useState<RoomConfig | null>(defaultRoomContext.currentRoom);
    const [notSavedRooms, setNotSavedRooms] = useState<RoomConfig[]>([]);

    console.log({ notSavedRooms })

    useEffect(() => {
        listRoomsLocalStorage().then((rooms) => {
            console.log({ rooms })
            setRooms(rooms);
        });
    }, []);

    const setCurrentRoom = useCallback((roomId: string) => {
        loadRoomLocalStorage({ roomId }).then((room) => {
            console.log({ room })
            if (room?.name) {
                setCurrentRoomFn({ ...room });
            } else {
                throw new Error('Room config not found');
            }
        });
    }, [setCurrentRoomFn]);

    const addRoom = useCallback(() => {
        setNotSavedRooms((prev) => [...prev, {
            name: '', dashboards: [], flows: [], notSaved: true, id: uuidv4()
        }]);
    }, [setNotSavedRooms]);

    const saveRoom = useCallback((item: RoomConfig) => {
        // Remove not saved key from room
        const roomToSave = { ...item, notSaved: false };
        return saveRoomLocalStorage({ roomId: item.id, room: roomToSave }).then(() => {
            // Remove the room from the notSavedRooms array
            setNotSavedRooms((prev) => prev.filter((r) => r.id !== item.id));
            // Add the room to the rooms array
            setRooms((prev) => [...prev.filter((r) => r.id !== item.id), { ...roomToSave }]);
        });
    }, [setNotSavedRooms]);

    const deleteRoom = useCallback((roomId: string) => {
        deleteRoomLocalStorage({ roomId });
    }, []);

    const getRoom = useCallback(async (roomId: string) => {
        console.log('HELLO')
        console.log('getRoom', { roomId })
        return await loadRoomLocalStorage({ roomId }).then((room) => {
            console.log('getRoom', { room })
            if (room?.name) {
                setCurrentRoomFn({ ...room });
                return room;
            } else {
                throw new Error('Room config not found');
            }
        });
    }, [setCurrentRoomFn]);

    return (
        <RoomContext.Provider value={{
            rooms,
            setRooms,
            currentRoom,
            setCurrentRoom,
            notSavedRooms,
            setNotSavedRooms,
            addRoom,
            saveRoom,
            deleteRoom,
            getRoom
        }}>{children}</RoomContext.Provider>
    );
}

export const useRoomContext = () => {
    const context = useContext(RoomContext);
    if (!context) {
        throw new Error('useRoomContext must be used within a RoomProvider');
    }
    return context;
}