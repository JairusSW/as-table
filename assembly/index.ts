import { TableAlignment, TableOptions } from "./types";

class Table {
    public options: TableOptions;
    public rows: string[][];
    public columns: string[][] = [];

    constructor(table: string[][], options: TableOptions = new TableOptions()) {
        this.options = options;
        this.rows = table;
        // Transpose rows to columns
        for (let j = 0; j < table[0].length; j++) {
            this.columns.push([]);
            for (let i = 0; i < table.length; i++) {
                this.columns[j].push(table[i][j]);
            }
        }
    }

    private removeANSIEscapeSequences(str: string): string {
        let result = "";
        let isInEscapeSequence = false;

        for (let i = 0; i < str.length; i++) {
            if (str.charAt(i) === "\u001b" && str.charAt(i + 1) === "[") {
                isInEscapeSequence = true;
            } else if (isInEscapeSequence && str.charAt(i) === "m") {
                isInEscapeSequence = false;
            } else if (!isInEscapeSequence) {
                result += str.charAt(i);
            }
        }

        return result;
    }

    private calculateColumnWidths(): i32[] {
        const widths: i32[] = new Array<i32>(this.columns.length).fill(0);
        for (let i = 0; i < this.columns.length; i++) {
            for (let j = 0; j < this.columns[i].length; j++) {
                const cellLines = this.columns[i][j].split("\n");
                for (let k = 0; k < cellLines.length; k++) {
                    const line = cellLines[k];
                    const cellLength = this.removeANSIEscapeSequences(line).length;
                    if (cellLength > widths[i]) {
                        widths[i] = cellLength;
                    }
                }
            }
            // Add padding to the width
            widths[i] += 2 * this.options.padding.width;
        }
        return widths;
    }

    private calculateRowHeights(): i32[] {
        const heights: i32[] = new Array<i32>(this.rows.length).fill(0);
        for (let i = 0; i < this.rows.length; i++) {
            for (let j = 0; j < this.rows[i].length; j++) {
                const cellLines = this.rows[i][j].split("\n").length;
                if (cellLines > heights[i]) {
                    heights[i] = cellLines;
                }
            }
        }
        return heights;
    }

    private padString(str: string, length: i32, alignment: TableAlignment): string {
        const strippedStr = this.removeANSIEscapeSequences(str);
        const padding = length - strippedStr.length;
        let leftPadding = 0;
        let rightPadding = 0;

        switch (alignment) {
            case TableAlignment.Left:
                rightPadding = padding;
                break;
            case TableAlignment.Right:
                leftPadding = padding;
                break;
            case TableAlignment.Center:
                leftPadding = i32(Math.floor(padding / 2));
                rightPadding = i32(Math.ceil(padding / 2));
                break;
        }

        return " ".repeat(leftPadding) + str + " ".repeat(rightPadding);
    }

    private padCell(cell: string, width: i32, height: i32, alignment: TableAlignment): string[] {
        const lines = cell.split("\n");
        const paddedLines: string[] = [];

        for (let i = 0; i < lines.length; i++) {
            paddedLines.push(this.padString(lines[i], width, alignment));
        }

        // Add padding to make the height correct
        const paddingLines = height - lines.length;
        if (paddingLines > 0) {
            for (let i = 0; i < paddingLines; i++) {
                if (alignment === TableAlignment.Center) {
                    paddedLines.unshift(" ".repeat(width));
                    if (paddedLines.length < height) {
                        paddedLines.push(" ".repeat(width));
                    }
                } else if (alignment === TableAlignment.Top || alignment === TableAlignment.Left) {
                    paddedLines.push(" ".repeat(width));
                } else {
                    paddedLines.unshift(" ".repeat(width));
                }
            }
        }

        return paddedLines;
    }

    draw(): string {
        const widths = this.calculateColumnWidths();
        const heights = this.calculateRowHeights();
        const structure = this.options.structure;
        let result = '';

        // Draw top border
        result += structure.topLeft;
        for (let i = 0; i < widths.length; i++) {
            result += structure.topBody.repeat(widths[i]);
            if (i < widths.length - 1) {
                result += structure.topJoin;
            }
        }
        result += structure.topRight + '\n';

        // Draw rows
        for (let i = 0; i < this.rows.length; i++) {
            const paddedCells: string[][] = [];
            for (let j = 0; j < this.rows[i].length; j++) {
                paddedCells.push(this.padCell(this.rows[i][j], widths[j], heights[i], this.options.alignment));
            }

            for (let k = 0; k < heights[i]; k++) {
                result += structure.bodyLeft;
                for (let j = 0; j < paddedCells.length; j++) {
                    result += paddedCells[j][k];
                    if (j < paddedCells.length - 1) {
                        result += structure.bodyJoin;
                    }
                }
                result += structure.bodyRight + '\n';
            }

            // Draw join row if not the last row
            if (i < this.rows.length - 1) {
                result += structure.joinLeft;
                for (let j = 0; j < widths.length; j++) {
                    result += structure.joinBody.repeat(widths[j]);
                    if (j < widths.length - 1) {
                        result += structure.joinJoin;
                    }
                }
                result += structure.joinRight + '\n';
            }
        }

        // Draw bottom border
        result += structure.bottomLeft;
        for (let i = 0; i < widths.length; i++) {
            result += structure.bottomBody.repeat(widths[i]);
            if (i < widths.length - 1) {
                result += structure.bottomJoin;
            }
        }
        result += structure.bottomRight;

        return result;
    }
}

export function createTable(table: string[][], options: TableOptions = new TableOptions()): string {
    return new Table(table, options).draw();
}

function padCell(cell: string, width: i32, height: i32, alignment: TableAlignment): string[] {
    const lines = cell.split("\n");
    const paddedLines: string[] = [];

    for (let i = 0; i < lines.length; i++) {
        paddedLines.push(padString(lines[i], width, alignment));
    }

    // Add padding to make the height correct
    const paddingLines = height - lines.length;
    if (paddingLines > 0) {
        for (let i = 0; i < paddingLines; i++) {
            if (alignment === TableAlignment.Center) {
                paddedLines.unshift(" ".repeat(width));
                if (paddedLines.length < height) {
                    paddedLines.push(" ".repeat(width));
                }
            } else if (alignment === TableAlignment.Top || alignment === TableAlignment.Left) {
                paddedLines.push(" ".repeat(width));
            } else {
                paddedLines.unshift(" ".repeat(width));
            }
        }
    }

    return paddedLines;
}

function padString(str: string, length: i32, alignment: TableAlignment): string {
    const strippedStr = removeANSIEscapeSequences(str);
    const padding = length - strippedStr.length;
    let leftPadding = 0;
    let rightPadding = 0;

    switch (alignment) {
        case TableAlignment.Left:
            rightPadding = padding;
            break;
        case TableAlignment.Right:
            leftPadding = padding;
            break;
        case TableAlignment.Center:
            leftPadding = Math.floor(padding / 2);
            rightPadding = Math.ceil(padding / 2);
            break;
    }

    return " ".repeat(leftPadding) + str + " ".repeat(rightPadding);
}

function removeANSIEscapeSequences(str: string): string {
    let result = "";
    let isInEscapeSequence = false;

    for (let i = 0; i < str.length; i++) {
        if (str.charAt(i) === "\u001b" && str.charAt(i + 1) === "[") {
            isInEscapeSequence = true;
        } else if (isInEscapeSequence && str.charAt(i) === "m") {
            isInEscapeSequence = false;
        } else if (!isInEscapeSequence) {
            result += str.charAt(i);
        }
    }

    return result;
}
