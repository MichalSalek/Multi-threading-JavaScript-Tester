import { getValidatedPassedAmount } from '@/features/background/web-workers/webWorkers.api'



describe('webWorkers.api', () => {

    test('getValidatedPassedAmount - between range', () => {
        expect(getValidatedPassedAmount(10, 2, 32)).toBe(10)
    })

    test('getValidatedPassedAmount - lower value than min', () => {
        expect(getValidatedPassedAmount(1, 2, 32)).toBe(2)
    })

    test('getValidatedPassedAmount - higher value than max', () => {
        expect(getValidatedPassedAmount(100, 2, 32)).toBe(32)
    })

})

export default {}
