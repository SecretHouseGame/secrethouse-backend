export type EventData = {
    content: string;
}

export function castToEventData(value:any): EventData | null {
  try {
    return value as EventData;
  } catch (e) {
    console.error(e);
    return null;
  }
}
