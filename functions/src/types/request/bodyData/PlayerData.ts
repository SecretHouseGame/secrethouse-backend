export type PlayerData = {
    name: string;
    secret: string;
}

export function castToPlayerData(value:any): PlayerData | null {
  try {
    return value as PlayerData;
  } catch (e) {
    console.error(e);
    return null;
  }
}
