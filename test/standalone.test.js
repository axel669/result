// @ts-check
import * as result from "@axel669/result"
import { Collection, $check, $ } from "@axel669/aegis"

const good = (value) => result.ok(value ** 2)
const bad = (value) => result.err(`Bad Value: ${value}`)

export default Collection`Standalone`({
    "Created Values": () => {
        $check`Primitive`
            .value(result.ok(100))
            .eq($.ok, true)
            .eq($.value, 100)
            .eq($.error, undefined)
        $check`Array`
            .value(result.ok([1, 2, 3, 4]))
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
