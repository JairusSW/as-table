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
import { rainbow } from "as-rainbow/assembly";


```

<h6>
<pre> _____  _____      _____  _____  _____  _____ 
|  _  ||   __| ___|_   _||   __||   __||_   _|
|     ||__   ||___| | |  |   __||__   |  | |  
|__|__||_____|      |_|  |_____||_____|  |_|  

-----------------------------------------

 [PASS]  Math operations

 [PASS]  Array manipulation

 [PASS]  Addition

 [PASS]  Comparison

 [PASS]  Type checking

 [PASS]  Array length

 [PASS]  Array inclusion

-----------------------------------------

Test Suites: 0 failed, 2 total
Tests:       0 failed, 8 total
Snapshots:   0 total
Time:        101.812μs
</pre>
</h6>

## Running

You can run as-test *anywhere* that WASI is supported! I've yet to add support for bindings, but all it needs is access to the terminal.

To add WASI support, install it with

```
npm install @assemblyscript/wasi-shim
```

Add the following scripts to your `package.json` where NAME-HERE is your test file.
You can swap out `wasmtime` with [Node.js](https://nodejs.org/), [Wasmer](https://wasmer.io/), [Wasm3](https://github.com/wasm3/wasm3), or any WASI-supporting runtime

```json
"scripts": {
  "test": "wasmtime ./build/NAME.spec.wasm",
  "pretest": "asc asc NAME.spec.ts -o build/NAME.spec.wasm --bindings esm --config ./node_modules/@assemblyscript/wasi-shim/asconfig.json"
}
```

And finally, run it with:

```bash
npm run test
```

To add `as-test` to your CI/CD workflow, check out [The provided example](https://github.com/JairusSW/as-test/blob/main/.github/workflows/nodejs.yml)

If you use this project in your codebase, consider dropping a [⭐ HERE](https://github.com/JairusSW/as-test). I would really appreciate it!

## Notes

This library is in the EARLY STAGES OF DEVELOPMENT!
If you want a feature, drop an issue (and again, maybe a star). I'll likely add it in less than 7 days.

## Contact

Contact me at:

Email: `me@jairus.dev`

GitHub: `JairusSW`

Discord: `jairussw`

## Issues

Please submit an issue to https://github.com/JairusSW/as-test/issues if you find anything wrong with this library