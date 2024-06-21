import { rainbow } from "as-rainbow";
import { createTable } from ".";

console.log(createTable([
    ['\u001b[31m0A\u001b[0m', '\u001b[32m0B\u001b[0m', '\u001b[33m0Cadfadfad\u001b[0m'],
    ['\u001b[34m1A\u001b[0m', '\u001b[35m1B\u001b[0m', '\u001b[36m1C\u001b[0m'],
    ['\u001b[37m2A\u001b[0m', '\u001b[38m2B\u001b[0m', '\u001b[39m2C\u001b[0m']
]));