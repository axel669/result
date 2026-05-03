import { Ok, Err } from "@axel669/result"
import { Collection, $check, $ } from "@axel669/aegis"

const good = (value) => Ok(value ** 2)
const bad = (value) => Err(`Bad Value: ${value}`)

export default Collection`Standalone`({
    "Created Values": () => {
        $check`Primitive`
            .value(Ok(100))
            .eq($.ok, true)
            .eq($.value, 100)
            .eq($.error, undefined)
        $check`Array`
            .value(Ok([1, 2, 3, 4]))
            .eq($.ok, true)
            .eq($.value.length, 4)
            .eq($.value[1], 2)
            .eq($.error, undefined)
    },
    "Returned Values": () => {
        $check`Good return`
            .value(good(4))
            .eq($.ok, true)
            .eq($.value, 16)
            .eq($.error, undefined)
        $check`Bad return`
            .value(bad(42))
            .eq($.ok, false)
            .eq($.value, undefined)
            .eq($.error, "Bad Value: 42")
    }
})
