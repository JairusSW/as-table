export enum TablePosition {
    Left,
    Center,
    Right
}

export enum TableAlignment {
    Left,
    Center,
    Right
}


export class TableOptions {
    position: TablePosition = TablePosition.Center;
    padding: PaddingOptions = new PaddingOptions();
    structure: TableStructure = new TableStructure();
    headerPosition: HeaderPosition = HeaderPosition.Top;
}

export enum HeaderPosition {
    Top,
    Bottom,
    Left,
    Right
}

export class PaddingOptions {
    width: i32 = 2;
    height: i32 = 2;
}

export class TableStructure {
    topBody: string = "─";
    topJoin: string = "┬";
    topLeft: string = "┌";
    topRight: string = "┐";

    bottomBody: string = "─";
    bottomJoin: string = "┴";
    bottomLeft: string = "└";
    bottomRight: string = "┘";

    bodyLeft: string = "│";
    bodyRight: string = "│";
    bodyJoin: string = "│";

    joinBody: string = "─";
    joinLeft: string = "├";
    joinRight: string = "┤";
    joinJoin: string = "┼";
}