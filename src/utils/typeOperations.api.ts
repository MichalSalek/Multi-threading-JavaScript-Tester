// Shorthand for undefined type check.
// TypeScript transparent with guard statements. I you need, use then conventional notation (typeof) or optional?.chaining.
//
export const isUndefinedType = (somethingToCheck: unknown | undefined): boolean => typeof somethingToCheck === 'undefined'
