

// Let's do some pointless and dumb calculations for increase a CPU usage and yours energy bills.
//
const isPrime = (number: number) => {
	for (let index = 2; index < number; index++)
		if (number % index === 0) return false
	return number > 1
}
export const doCalculations = (CALCULATIONS_COMPLEXITY: number) => {
	const returnSomeCalculations = () => Math.pow(
		(Math.fround(Math.random()) * Math.random()) * Math.random(),
		(Math.random() * Math.random()) * Math.random())
	const heavyArr = Array(CALCULATIONS_COMPLEXITY).fill(returnSomeCalculations()).map((el) => {
		const arr1 = Array(CALCULATIONS_COMPLEXITY).fill(returnSomeCalculations()).reduce((prev, current) => {
			return Math.tanh(Math.PI + prev + current) + (Math.PI + current) +
			isPrime(prev + current * Math.random()) ? prev + current * Math.random() : Math.PI
		})
		const arr2 = Array(CALCULATIONS_COMPLEXITY).fill(returnSomeCalculations() * returnSomeCalculations() * returnSomeCalculations())
		return [arr1, ...arr2, el]
	})
	return Array(CALCULATIONS_COMPLEXITY).fill(heavyArr.reduce((curr, prev) => [...curr, prev])).reduce((prev, curr) => {
		return [prev, ...curr.reduce((p: string, c: string) => p + c).split(',')].reduce((_, curr) => {
			switch (typeof curr) {
			case 'string':
				return Number(curr)
			case 'number':
				return curr
			}
		}, 0)
	})
}
