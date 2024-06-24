import { createTable } from ".";
import { rainbow } from "as-rainbow";

const table = createTable([
    [rainbow.red("0A"), rainbow.green("0B"), rainbow.yellow("0C")],
    [rainbow.blue("1A"), rainbow.magenta("1B"), rainbow.cyan("1C")],
    [rainbow.white("2A"), rainbow.dimMk("2B"), rainbow.blackBright("2C")]
]);

console.log(table);