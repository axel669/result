import { Ok, Err, tryable } from "@axel669/result"

const div = tryable(
    (a, b) => a / b
)
const bad = tryable(
    () => { throw new Error("bad") }
)
const noErrorBad = () => {
    return Err(null).with({
        realError: false,
    })
}

console.log(div(4, 0))
console.log(bad())
console.log(noErrorBad())

console.log(
    Ok(null).with({
        extra: true,
    })
)
