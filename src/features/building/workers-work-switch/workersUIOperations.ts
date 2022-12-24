import React from 'react'
import { MAX_WORKER_COMPLEXITY_POSSIBILITY } from '@/core/constants.core'
import { ComplexityValueType } from '@/features/building/workers-work-switch/UI/WorkersWorkSwitch.molecule'
import scss from '@/features/building/workers-work-switch/UI/workersWorkSwitch.module.scss'



export const getDynamicColorByComplexity = (
    complexity: ComplexityValueType,
    stylePropertyKey: string,
    opacityLevel: 1 | 50 = 50
): React.CSSProperties => ({
    [stylePropertyKey]: `hsl(${MAX_WORKER_COMPLEXITY_POSSIBILITY / 2 - Math.floor(Number(complexity) / 2 + 2)}deg, 100%, 60%, ${Math.floor(Number(complexity) / 4 + opacityLevel) / 100})`
})


export const getDynamicColorStyleByComplexityEdgeCase = (complexity: ComplexityValueType, complexityEdgeDistanceValue = 40): React.CSSProperties => ({
    color: complexity > MAX_WORKER_COMPLEXITY_POSSIBILITY - complexityEdgeDistanceValue ? 'hsl(0,100%,97%)' : 'inherit'
})


export const getDynamicAnimationClassNameByComplexity = (complexity: ComplexityValueType, complexityEdgeDistanceValue = 40): string => {
    if (complexity < complexityEdgeDistanceValue) {
        return scss.buttonAnimationSoft
    } else if (complexity > complexityEdgeDistanceValue && complexity < MAX_WORKER_COMPLEXITY_POSSIBILITY / 2) {
        return scss.buttonAnimationMedium
    } else if (complexity > MAX_WORKER_COMPLEXITY_POSSIBILITY / 2 && complexity < MAX_WORKER_COMPLEXITY_POSSIBILITY - complexityEdgeDistanceValue) {
        return scss.buttonAnimationHard
    } else if (complexity > MAX_WORKER_COMPLEXITY_POSSIBILITY - complexityEdgeDistanceValue) {
        return scss.buttonAnimationExtreme
    } else { // Default case
        return scss.buttonAnimationMedium
    }
}
