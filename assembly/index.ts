import { HeaderPosition, PaddingOptions, TablePosition, TableStructure, TableAlignment } from "./types";

class TableOptions {
    position: TablePosition = TablePosition.Center;
    alignment: TableAlignment = TableAlignment.Center;
    padding: PaddingOptions = new PaddingOptions();
    structure: TableStructure = new TableStructure();
    headerPosition: HeaderPosition = HeaderPosition.Top;
}

class Table {
    public options: TableOptions;
    public rows: string[][];
    public columns: string[][] = [];

    public padding: i32 = 4;

    constructor(table: string[][], options: TableOptions = new TableOptions()) {
        this.options = options;
        this.rows = table;
        for (let i = 0; i < table.length; i++) {
            this.columns.push([]);
            for (let j = 0; j < table[i].length; j++) {
                this.columns[i].push(table[j][i]);
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

    draw(): string {
        const fmt = this.options.structure;
        const lines: string[] = [];

        const columnWidths: i32[] = new Array<i32>(this.columns.length).fill(0);

        // Calculate column widths
        for (let i = 0; i < this.columns.length; i++) {
            for (let j = 0; j < this.columns[i].length; j++) {
                const cellLength = this.removeANSIEscapeSequences(this.columns[i][j]).length;
                if (cellLength > columnWidths[i]) {
                    columnWidths[i] = cellLength;
                }
            }
        }

        if (this.options.headerPosition === HeaderPosition.Top) {
            // Top header position
            lines.push(fmt.topLeft + fmt.topBody.repeat(
                columnWidths.reduce((a, b) => a + b, 0) + (this.padding * 2 + 1) * this.columns.length - 1
            ) + fmt.topRight);

            for (let row = 0; row < 1; row++) { // Only one header row
                let headerRow = fmt.bodyLeft;
                for (let index = 0; index < this.columns.length; index++) {
                    const col = this.columns[index];
                    const cellLength = this.removeANSIEscapeSequences(col[0]).length;
                    let padding: string = "";

                    if (this.options.alignment === TableAlignment.Left) {
                        padding = " ".repeat(this.padding * 2);
                        headerRow += padding + col[0];
                    } else if (this.options.alignment === TableAlignment.Right) {
                        padding = " ".repeat((columnWidths[index] + this.padding * 2 - cellLength));
                        headerRow += padding + col[0];
                    } else {
                        padding = " ".repeat(i32(Math.floor((columnWidths[index] + this.padding * 2 - cellLength) / 2)));
                        headerRow += padding + col[0] + padding + " ".repeat((columnWidths[index] + this.padding * 2) % 2);
                    }

                    if (index < this.columns.length - 1) {
                        headerRow += fmt.bodyJoin;
                    }
                }
                headerRow += fmt.bodyRight;
                lines.push(headerRow);
            }

            lines.push(fmt.joinLeft + fmt.joinBody.repeat(
                columnWidths.reduce((a, b) => a + b, 0) + (this.padding * 2 + 1) * this.columns.length - 1
            ) + fmt.joinRight);
        }

        // Body rows
        for (let row = 1; row < this.rows.length; row++) { // Start from 1 to skip header row
            let bodyRow = fmt.bodyLeft;
            for (let index = 0; index < this.columns.length; index++) {
                const col = this.columns[index];
                const cellLength = this.removeANSIEscapeSequences(col[row]).length;
                let padding: string = "";

                if (this.options.alignment === TableAlignment.Left) {
                    padding = " ".repeat(this.padding * 2);
                    bodyRow += padding + col[row];
                } else if (this.options.alignment === TableAlignment.Right) {
                    padding = " ".repeat((columnWidths[index] + this.padding * 2 - cellLength));
                    bodyRow += padding + col[row];
                } else {
                    padding = " ".repeat(i32(Math.floor((columnWidths[index] + this.padding * 2 - cellLength) / 2)));
                    bodyRow += padding + col[row] + padding + " ".repeat((columnWidths[index] + this.padding * 2) % 2);
                }

                if (index < this.columns.length - 1) {
                    bodyRow += fmt.bodyJoin;
                }
            }
            bodyRow += fmt.bodyRight;
            lines.push(bodyRow);
        }

        if (this.options.headerPosition === HeaderPosition.Bottom) {
            // Bottom header position
            lines.push(fmt.bottomLeft + fmt.bottomBody.repeat(
                columnWidths.reduce((a, b) => a + b, 0) + (this.padding * 2 + 1) * this.columns.length - 1
            ) + fmt.bottomRight);

            for (let row = 0; row < 1; row++) { // Only one header row
                let headerRow = fmt.bodyLeft;
                for (let index = 0; index < this.columns.length; index++) {
                    const col = this.columns[index];
                    const cellLength = this.removeANSIEscapeSequences(col[0]).length;
                    let padding: string = "";

                    if (this.options.alignment === TableAlignment.Left) {
                        padding = " ".repeat(this.padding * 2);
                        headerRow += padding + col[0];
                    } else if (this.options.alignment === TableAlignment.Right) {
                        padding = " ".repeat((columnWidths[index] + this.padding * 2 - cellLength));
                        headerRow += padding + col[0];
                    } else {
                        padding = " ".repeat(i32(Math.floor((columnWidths[index] + this.padding * 2 - cellLength) / 2)));
                        headerRow += padding + col[0] + padding + " ".repeat((columnWidths[index] + this.padding * 2) % 2);
                    }

                    if (index < this.columns.length - 1) {
                        headerRow += fmt.bodyJoin;
                    }
                }
                headerRow += fmt.bodyRight;
                lines.push(headerRow);
            }
        }

        return lines.join("\n");
    }
}

export function createTable(table: string[][], options: TableOptions = new TableOptions()): string {
    return new Table(table, options).draw();
}
