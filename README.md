# Result
A library for quickly making returns and wrapping try/catch in a way that runs
faster and is easier to track.

## API
```js
import { Ok, Err, tryable } from "@axel669/result"

const wrapped = tryable(throwingFunction)

const result = wrapped(...args)
// result.ok === true if it didnt throw, false if it did
if (result.ok === false) {
    // the .error prop will have the thrown error
    console.error(result.error)
    process.exit(1)
}

// value contains the original return of the function
console.log(result.value)

// make your own, you don't need to throw an error to have a bad result
const validate = (input) => {
    if (input.length < 10) {
        return Err("too short")
    }
    return Ok(true)
}

```
