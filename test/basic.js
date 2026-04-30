import { Ok, Err, tryable, tryawait } from "@axel669/result"

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

console.log(
    await tryawait(fetch)("https://echo.axel669.net")
)
console.log(
    await tryawait(fetch)("https://echo2.axel669.net")
)
