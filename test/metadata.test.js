import { Ok, Err } from "@axel669/result"
import { Collection, $check, $ } from "@axel669/aegis"

export default Collection`Metadata`({
    "On create": () => {
        const ok = Ok(true).addMeta({
            stuff: true
        })
        const bad = Err(false).addMeta({
            func: "realFunc"
        })

        $check`Ok result`
            .value(ok)
            .eq($.meta.stuff, true)

        $check`Error result`
            .value(bad)
            .eq($.meta.func, "realFunc")
    }
})
