export interface RoomGameData {
    isLocked: boolean;
}

export function castToRoomGameData(value:any): RoomGameData | null {
  try {
    return value as RoomGameData;
  } catch (e) {
    console.error(e);
    return null;
  }
}
