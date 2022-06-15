export type BuzzData = {
    secret: string;
    isConfirmed: boolean;
}

export function castToBuzzData(value:any): BuzzData | null {

    try {
        return value as BuzzData;
    } catch (e) {
        console.error(e);
        return null;
    }
}