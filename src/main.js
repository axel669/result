const result = (ok) => {
    const self = { ok }
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
            return Ok(
                func(...args)
            )
        }
        catch (error) {
            return Err(error)
        }
    }
export const tryableAsync = (func) =>
    async (...args) => {
        try {
            return Ok(
                await func(...args)
            )
        }
        catch (error) {
            return Err(error)
        }
    }
