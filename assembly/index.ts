import { TableStructure } from "./types";

class Cell {
    public x: i32 = 0;
    public y: i32 = 0;
    public text: string = "";
    toString(): string {
        return this.text;
    }
}

const padding = " ";

const fmt = new TableStructure();

function stripAnsii(text: string): string {
    let inEscape = false;
    let output = "";
    for (let i = 0; i < text.length; i++) {
        const char = text.charAt(i);

        if (char === "\x1B") { 
            inEscape = true;
        } else if (char === "m" && inEscape) {
            inEscape = false;
        } else if (!inEscape) {
            output += char;
        }
    }

    return output;
}

function drawRow(cells: Cell[], columnWidths: i32[], padding_width: i32): string {
    let line = fmt.bodyLeft;
    for (let i = 0; i < cells.length; i++) {
        const cell = unchecked(cells[i]);
        const width = unchecked(columnWidths[i]);
        const cellPadding = padding.repeat(padding_width);
        const diff = cell.text.length - stripAnsii(cell.text).length;
        line += cellPadding + cell.text.padEnd(diff + width - (padding_width * 2), padding) + cellPadding;
        if (i < cells.length - 1) {
            line += fmt.bodyJoin;
        } else {
            line += fmt.bodyRight;
        }
    }
    return line;
}

function drawTable(rows: Cell[][], columns: Cell[][], padding_width: i32): string {
    const columnWidths: i32[] = new Array<i32>(columns.length);

    for (let i = 0; i < columns.length; i++) {
        const column = unchecked(columns[i]);
        for (let j = 0; j < column.length; j++) {
            const cell = unchecked(column[j]);
            const cellWidth = stripAnsii(cell.text).length + padding_width * 2;
            if (columnWidths[i] < cellWidth) {
                columnWidths[i] = cellWidth;
            }
        }
    }

    let result = "";

    result += fmt.topLeft;
    for (let i = 0; i < columnWidths.length; i++) {
        result += fmt.topBody.repeat(unchecked(columnWidths[i]));
        if (i < columnWidths.length - 1) {
            result += fmt.topJoin;
        }
    }
    result += fmt.topRight + "\n";

    for (let i = 0; i < rows.length; i++) {
        const row = unchecked(rows[i]);
        result += drawRow(row, columnWidths, padding_width) + "\n";

        if (i < rows.length - 1) {
            result += fmt.joinLeft;
            for (let j = 0; j < columnWidths.length; j++) {
                result += fmt.joinBody.repeat(unchecked(columnWidths[j]));
                if (j < columnWidths.length - 1) {
                    result += fmt.joinJoin;
                }
            }
            result += fmt.joinRight + "\n";
        }
    }

    result += fmt.bottomLeft;
    for (let i = 0; i < columnWidths.length; i++) {
        result += fmt.bottomBody.repeat(unchecked(columnWidths[i]));
        if (i < columnWidths.length - 1) {
            result += fmt.bottomJoin;
        }
    }
    result += fmt.bottomRight;

    return result;
}

export function createTable(table: string[][], padding: i32 = 3): string {
    const cellRows: Cell[][] = [];
    const cellColumns: Cell[][] = new Array<Cell[]>(table[0].length).map<Cell[]>(() => []);

    for (let rowIndex = 0; rowIndex < table.length; rowIndex++) {
        const row = unchecked(table[rowIndex]);
        cellRows.push([]);
        for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
            const col = unchecked(row[columnIndex]);
            const cell = new Cell();
            cell.x = columnIndex;
            cell.y = rowIndex;
            cell.text = col;
            cellRows[rowIndex].push(cell);
            cellColumns[columnIndex].push(cell);
        }
    }

    return drawTable(cellRows, cellColumns, padding);
}
