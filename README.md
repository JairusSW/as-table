<h5 align="center">
<pre> _____  _____      _____  _____  _____  __     _____ 
|  _  ||   __| ___|_   _||  _  || __  ||  |   |   __|
|     ||__   ||___| | |  |     || __ -||  |__ |   __|
|__|__||_____|      |_|  |__|__||_____||_____||_____|
v1.0.0
</pre>
</h5>

## Installation

```bash
npm install table-as
```

## Usage

```js
import { createTable } from "table-as";

const table = createTable([
  ["0A","0B","0C"],
  ["1A","1B","1C"],
  ["2A","2B","2C"]
]);

console.log(table);

// ┌────────────────────────────────┐
// │    0A    │    0B    │    0C    │
// ├────────────────────────────────┤
// │    1A    │    1B    │    1C    │
// │    2A    │    2B    │    2C    │
// └────────────────────────────────┘
```

Note: I usually never use AI, but I did ask AI to make most of this because it was a pretty simple task and I was in a rush. Its really inefficient though, so I'll probably rewrite it and make it nice.

## Issues

Please submit an issue to https://github.com/JairusSW/as-table/issues if you find anything wrong with this library