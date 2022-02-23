// Shorthand for undefined type check.
// Don't works with guard statements. Use then conventional notation (typeof) or optional?.chaining - TypeScript purposes
//
export const isUndefinedType = (somethingToCheck: unknown | undefined): boolean => typeof somethingToCheck === 'undefined'

