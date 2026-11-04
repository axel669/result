// @ts-check

/**
@template t
@typedef {{
    ok: true,
    value: t
    meta: Record<string, any>
    addMeta: (meta: Record<string, any>) => void
    [k: symbol]: boolean
}} Ok<t>
*/
/**
@typedef {{
    ok: false,
    error: Error
    meta: Record<string, any>
    addMeta: (meta: Record<string, any>) => void
    [k: symbol]: boolean
}} Err
*/
/** @template t @typedef {Ok<t> | Err} Result<t> */

const resultKey = Symbol("result key")
/** @type (obj: any) => boolean */
export const isResult = (obj) => {
    if (obj === null || obj === undefined) {
        return false
    }
    return obj[resultKey] === true
}

/**
Creates a result that indicates the operation was a success.
@template t
@type {(value: t, meta?: Record<string, any>) => Ok<t>}
*/
export const ok = (value, meta = {}) => {
    const self = {
        /** @type true */
        ok: true,
        value,
        meta,
        /** @type (meta: Record<string, any>) => void */
        addMeta: (meta) => {
            self.meta = { ...self.meta, ...meta }
        },
        [resultKey]: true
    }
    return self
}
/**
Creates a result that indicates failure of some kind.
@type {(error: Error, meta?: Record<string, any>) => Err}
*/
export const err = (error, meta = {}) => {
    const self = {
        /** @type false */
        ok: false,
        error,
        meta,
        /** @type (meta: Record<string, any>) => void */
        addMeta: (meta) => {
            self.meta = { ...self.meta, ...meta }
        },
        [resultKey]: true
    }
    return self
}
/**
Wraps a function that might throw so that is instead returns a Result<T>.
@template t
@type {(func: Function) => ((...args: any[]) => Result<t>)}
*/
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
            // @ts-ignore
            return err(error)
        }
    }
/**
@template t, f
@type {(func: Function) => ((...args: any[]) => Promise<Result<t>>)}
*/
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
            // @ts-ignore
            return err(error)
        }
    }
