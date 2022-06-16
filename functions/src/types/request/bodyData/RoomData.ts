export interface RoomData {
    name: string;
    isSecret: boolean;
}

export function castToRoomData(value:any): RoomData | null {

    try {
        return value as RoomData;
    } catch (e) {
        console.error(e);
        return null;
    }
}