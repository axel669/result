export const Ok = (value) => {
    const self = {
        ok: true,
        value,
    }
    Object.defineProperty(
        self,
        "with",
        {
            enumerable: false,
            value: (meta) => {
                self.meta = meta
                return self
            }
        }
    )
    return self
}
export const Err = (error) => {
    const self = {
        ok: false,
        error,
    }
    Object.defineProperty(
        self,
        "with",
        {
            enumerable: false,
            value: (meta) => {
                self.meta = meta
                return self
            }
        }
    )
    return self
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
export const tryawait = (func) =>
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
