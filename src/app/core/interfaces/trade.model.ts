export interface ITrade {
    id?: number,
    entryDate: string,
    entryPrice: number,
    exitDate: string,
    exitPrice: number,
    profit: number
}

export enum ViewModeEnum {
    CreateMode = 1,
    EditMode = 2
}