import React from 'react'
import { ComplexityValueType } from '@/core/layout/components/atoms-and-molecules/workers/work-switch/UI/WorkersWorkSwitch.molecule'
import scss from '@/core/layout/components/atoms-and-molecules/workers/work-switch/UI/workersWorkSwitch.module.scss'
import {WorkersPolicy} from '../../../../../../../shared-policies/workers.policy'



export const getDynamicColorByComplexity = (
    complexity: ComplexityValueType,
    stylePropertyKey: string,
    opacityLevel: 1 | 50 = 50
): React.CSSProperties => ({
    [stylePropertyKey]: `hsl(${WorkersPolicy.MAX_WORKER_COMPLEXITY_POSSIBILITY / 2 - Math.floor(Number(complexity) / 2 + 2)}deg, 100%, 60%, ${Math.floor(Number(complexity) / 4 + opacityLevel) / 100})`
})


export const getDynamicColorStyleByComplexityEdgeCase = (complexity: ComplexityValueType, complexityEdgeDistanceValue = 40): React.CSSProperties => ({
    color: complexity > WorkersPolicy.MAX_WORKER_COMPLEXITY_POSSIBILITY - complexityEdgeDistanceValue ? 'hsl(0,100%,97%)' : 'inherit'
})


export const getDynamicAnimationClassNameByComplexity = (complexity: ComplexityValueType, complexityEdgeDistanceValue = 40): string => {
    if (complexity < complexityEdgeDistanceValue) {
        return scss.buttonAnimationSoft
    } else if (complexity > complexityEdgeDistanceValue && complexity < WorkersPolicy.MAX_WORKER_COMPLEXITY_POSSIBILITY / 2) {
        return scss.buttonAnimationMedium
    } else if (complexity > WorkersPolicy.MAX_WORKER_COMPLEXITY_POSSIBILITY / 2 && complexity < WorkersPolicy.MAX_WORKER_COMPLEXITY_POSSIBILITY - complexityEdgeDistanceValue) {
        return scss.buttonAnimationHard
    } else if (complexity > WorkersPolicy.MAX_WORKER_COMPLEXITY_POSSIBILITY - complexityEdgeDistanceValue) {
        return scss.buttonAnimationExtreme
    } else { // Default case
        return scss.buttonAnimationMedium
    }
}
