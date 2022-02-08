export const randomIntFromNumbersRange = (minRange: number, maxRange: number) =>
    Math.floor(Math.random() * (maxRange - minRange + 1) + minRange)
