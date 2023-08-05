export interface BoardModel {
    index: number;
    active: boolean;
    // corner: boolean;
    ball: boolean;
    corner: CornerModel;
}

export interface CornerModel {
    position: string;
}