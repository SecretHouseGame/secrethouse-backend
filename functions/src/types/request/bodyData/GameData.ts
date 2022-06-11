export type GameData = {
    maxPlayers: number;
    eventIntervalQty: number;
    eliminationDelayQty: number;
}

export function castToGameData(value:any): GameData | null {

    try {
        return value as GameData;
    } catch (e) {
        console.error(e);
        return null;
    }
}