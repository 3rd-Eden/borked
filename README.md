# `BORKED`

> [borked:](https://www.urbandictionary.com/define.php?term=borked)
> To have broken something so entirely, you break the words used to describe the item.

`borked` is a micro utility designed for a very specific use-case. Timing out
async functions (caveat: it does not cancel the long running promise).

When you `await` an async function or promise in JavaScript it will wait with
the executing the rest of the function until async function returns or the
promise resolves/rejects. So if it never resolves, completes because it's
borked, your whole function will just be waiting indefinitely.

We solve this by executing your async function/promise with an `Promise.race`
where we will reject the promise when the supplied timeout is reached.

## Installation

The package in published in the public npm registry and can be installed by
running.

```bash
npm install --save borked
```

## Usage

```js
import bork from 'borked';

const borked = bork(2000);

//
// Normally in your code you would do:
//
// await example();
//
// And wait for the results, with borked you await `borked`
//
try { await borked(example()) }
catch (e) {
  console.log('called after 2000 ms');
}
```

```js
import { borked } from 'borked';

try { await borked(example()) }
catch (e) {
  console.log('called after 2000 ms');
}
```

## License

[MI](LICENSE)
