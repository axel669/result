import { Ok, Err, tryable, tryableAsync } from "@axel669/result"
import { Collection, $check, $ } from "@axel669/aegis"

const getJSON = tryableAsync(
    async (url) => {
        const response = await fetch(url)
        if (response.ok === false) {
            return Err(await response.text()).addMeta({
                url,
                status: response.status,
                text: response.statusText,
            })
        }
        return await response.json()
    }
)

const task = tryable(
    (code) => {
        if (code === "throw") {
            throw new Error("Failed")
        }
        if (code === "fail") {
            return Err("broken").addMeta({
                code,
            })
        }
        return 69
    }
)

export default Collection`Wrapper`({
    "Sync": () => {
        const good = task()
        const error = task("throw")
        const bad = task("fail")

        $check`Good Result`
            .value(good)
            .eq($.ok, true)
            .eq($.error, undefined)
            .eq($.value, 69)

        $check`Caught Error`
            .value(error)
            .eq($.ok, false)
            .eq($.value, undefined)
            .eq($.error.message, "Failed")

        $check`Passthrough Return`
            .value(bad)
            .eq($.ok, false)
            .eq($.value, undefined)
            .eq($.error, `broken`)
        $check`Added Metadata`
            .value(bad)
            .eq($.meta.code, "fail")
    },
    "Async": async () => {
        const [good, error, incomplete] = await Promise.all([
            getJSON("https://echo.axel669.net"),
            getJSON("https://echo-no-dns.axel669.net"),
            getJSON("https://echo.axel669.net/status/500"),
        ])

        $check`Good Result`
            .value(good)
            .eq($.ok, true)
            .eq($.error, undefined)
            .eq($.value.method, "GET")
            .eq($.value.data, null)

        $check`Caught Error`
            .value(error)
            .eq($.ok, false)
            .eq($.value, undefined)
            .eq($.error.cause.code, "ENOTFOUND")

        $check`Passthrough Return`
            .value(incomplete)
            .eq($.ok, false)
            .eq($.value, undefined)
            .eq($.error, `{"message":"Custom return code"}`)
        $check`Added Metadata`
            .value(incomplete)
            .eq($.meta.status, 500)
    }
})
