const resultKey = Symbol("result key")
export const isResult = (obj) => {
    if (obj === null || obj === undefined) {
        return false
    }
    return obj[resultKey] === true
}
const result = (ok) => {
    const self = { ok, meta: {} }
    Object.defineProperty(
        self,
        "addMeta",
        {
            enumerable: false,
            value: (meta) => {
                self.meta = { ...self.meta, ...meta }
                return self
            }
        }
    )
    Object.defineProperty(
        self,
        resultKey,
        {
            enumerable: false,
            value: true
        }
    )
    return self
}
export const Ok = (value) => {
    const res = result(true)
    res.value = value
    return res
}
export const Err = (error) => {
    const res = result(false)
    res.error = error
    return res
}
export const tryable = (func) =>
    (...args) => {
        try {
            const result = func(...args)
            if (isResult(result) === true) {
                return result
            }
            return Ok(result)
        }
        catch (error) {
            return Err(error)
        }
    }
export const tryableAsync = (func) =>
    async (...args) => {
        try {
            const result = await func(...args)
            if (isResult(result) === true) {
                return result
            }
            return Ok(result)
        }
        catch (error) {
            return Err(error)
        }
    }
