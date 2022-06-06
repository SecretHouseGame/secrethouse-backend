export type GameData = {
    maxPlayers: number;
    eventIntervalQty: number;
    eliminationDelayQty: number;
}

export function castToGameData(value:any): GameData | null {
    let data: GameData;
    try {
        data = value as GameData;
        return data;
    } catch (e) {
        console.log(e);
        return null;
    }
}