import { Ok, Err, tryable } from "@axel669/result"
import { Collection, $check, $ } from "@axel669/aegis"

export default Collection`Sync Wrapper`({
    "Ok result": () => {
        const div = tryable(
            (a, b) => a / b
        )
        const value = div(4, 2)
        $check`ok result`
            .value(value)
            .eq($.ok, true)
            .eq($.value, 2)
            .eq($.error, undefined)
    },
    "Error result": () => {
        const bad = tryable(
            () => {
                throw new Error("some error")
            }
        )
        const badresult = bad()
        $check`bad result`
            .value(badresult)
            .eq($.ok, false)
            .eq($.error.message, "some error")
            .eq($.value, undefined)
    }
})

// const div = tryable(
//     (a, b) => a / b
// )
// const bad = tryable(
//     () => { throw new Error("bad") }
// )
// const noErrorBad = () => {
//     return Err(null).with({
//         realError: false,
//     })
// }

// console.log(div(4, 0))
// console.log(bad())
// console.log(noErrorBad())

// console.log(
//     Ok(null).with({
//         extra: true,
//     })
// )

// console.log(
//     await tryawait(fetch)("https://echo.axel669.net")
// )
// console.log(
//     await tryawait(fetch)("https://echo2.axel669.net")
// )
