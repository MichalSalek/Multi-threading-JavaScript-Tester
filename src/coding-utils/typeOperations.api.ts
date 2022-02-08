// Shorthand for undefined type check.
// DON'T WORKS WITH GUARD STATEMENTS - use then conventional notation (typeof) or optional?.chaining - TypeScript purposes
//
export const isUndefinedType = (somethingToCheck: unknown | undefined): boolean => typeof somethingToCheck === 'undefined'

