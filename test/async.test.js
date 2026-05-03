import { Ok, Err, tryableAsync } from "@axel669/result"
import { Collection, $check, $ } from "@axel669/aegis"

const goodFetch = tryableAsync(fetch)
export default Collection`Wrapper`({
    "Ok result": async () => {
        // should be fine
        const goodres = await goodFetch("https://echo.axel669.net")
        $check`ok result`
            .value(goodres)
            .eq($.ok, true)
            .eq($.value.ok, true)
            .eq($.error, undefined)
    },
    "Error result": async () => {
        // should give a dns error
        const badres = await goodFetch("https://echo-bad.axel669.net")
        // console.log(badres)
        $check`bad result`
            .value(badres)
            .eq($.ok, false)
            .eq($.error.cause.code, "ENOTFOUND")
            .eq($.value, undefined)
    }
})
