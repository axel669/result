const resultKey = Symbol("result key")
export const isResult = (obj) => {
    if (obj === null || obj === undefined) {
        return false
    }
    return obj[resultKey] === true
}

const mark = (self) => {
    Object.defineProperty(
        self,
        resultKey,
        {
            value: true,
            configurable: false,
            enumerable: false,
            writable: false,
        }
    )
    return self
}

export const ok = (value, meta = {}) => mark({
    ok: true,
    value,
    meta,
})
export const err = (error, meta = {}) => mark({
    ok: false,
    error,
    meta,
})
export const tryable = (func) =>
    (...args) => {
        try {
            const result = func(...args)
            if (isResult(result) === true) {
                return result
            }
            return ok(result)
        }
        catch (error) {
            return err(error)
        }
    }
export const tryableAsync = (func) =>
    async (...args) => {
        try {
            const result = await func(...args)
            if (isResult(result) === true) {
                return result
            }
            return ok(result)
        }
        catch (error) {
            return err(error)
        }
    }
