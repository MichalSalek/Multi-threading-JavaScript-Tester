import React, { FormEvent, useEffect, useMemo, useState } from 'react'
import {
    getValidatedPassedAmount,
    queueWorkerTask
} from '@/features/background/web-workers-configuration/webWorkers.api'
import { WEB_WORKER_TASKS } from '@/features/background/web-workers-configuration/webWorkersEvents'
import { WorkerKeyType } from '@/features/background/web-workers-configuration/webWorkers.types'
import {
    useSingleWorkerSpecificStatus,
    UseSpecificWorkerStatusCommandEnum
} from '@/features/background/web-workers-configuration/webWorkers.hooks'
import AppButtonAtom from '@/app-components/AppButton.atom'
import AppInputAtom from '@/app-components/AppInput.atom'
import {
    MAIN_THREAD_KEY,
    MAX_WORKER_COMPLEXITY_POSSIBILITY,
    MIN_WORKER_COMPLEXITY_POSSIBILITY
} from '@/app-config-constants'
import { Slider, Typography } from '@mui/material'
import scss from './WorkersWorkSwitch.module.scss'
import { randomIntFromNumbersRange } from '@/coding-utils/numberOperations.api'
import { useMainThreadCalculations } from '@/features/building/workers-controls/WorkersControls.hooks'



type ComplexityValueType = number | string


interface IProps {
    workerKey: WorkerKeyType
    globalComplexityValue?: ComplexityValueType
}


const WorkersWorkSwitchMolecule = ({workerKey, globalComplexityValue}: IProps): JSX.Element => {

    // Listening to worker's ready state
    //
    const [isWorkerReady] = useSingleWorkerSpecificStatus(UseSpecificWorkerStatusCommandEnum.ready, workerKey)

    // Listening to worker's work state
    //
    const [isWorkerWorking] = useSingleWorkerSpecificStatus(UseSpecificWorkerStatusCommandEnum.working, workerKey)


    const randomizedNumber = useMemo(() => randomIntFromNumbersRange(15, 80), [])

    // Complexity of calculations defined by user
    //
    const [userInputComplexity, setUserInputComplexity] = useState<ComplexityValueType>(randomizedNumber)


    useEffect(() => {
        if (typeof globalComplexityValue !== 'number') {
            setUserInputComplexity(randomizedNumber)
        } else {
            setUserInputComplexity(globalComplexityValue)
        }
        return () => undefined
    }, [globalComplexityValue, randomizedNumber])



    const [isMainThreadOn, handleMainThreadSwitchChange] =
        useMainThreadCalculations(120, Number(userInputComplexity), false)

    const isCurrentInstanceAMainThread = (): boolean => workerKey.workerName === MAIN_THREAD_KEY.workerName

    const handleWorkerWorkSwitch = (): void => {
        queueWorkerTask(workerKey, !isWorkerWorking ?
            {
                workerTaskName: WEB_WORKER_TASKS.turnOnCalculations,
                complexity: getValidatedPassedAmount(userInputComplexity, MIN_WORKER_COMPLEXITY_POSSIBILITY, MAX_WORKER_COMPLEXITY_POSSIBILITY)
            }
            : {workerTaskName: WEB_WORKER_TASKS.turnOffCalculations},
        `Triggering a switch at the "${workerKey.workerName}"`)
    }


    const getDynamicColorStyleByComplexityEdgeCase = (complexity: ComplexityValueType, edgeDistanceValue = 40): React.CSSProperties => ({
        color: complexity > MAX_WORKER_COMPLEXITY_POSSIBILITY - edgeDistanceValue ? 'hsl(0,100%,97%)' : 'inherit'
    })

    const getDynamicClassNameByComplexityEdgeCase = (complexity: ComplexityValueType, edgeDistanceValue = 40): string => {
        if (complexity < edgeDistanceValue) {
            return scss.buttonAnimationSoft
        } else if (complexity > MAX_WORKER_COMPLEXITY_POSSIBILITY - edgeDistanceValue) {
            return scss.buttonAnimationHard
        } else {
            return scss.buttonAnimationMedium
        }
    }

    const getDynamicColorByComplexity = (stylePropertyKey: string): React.CSSProperties => ({
        [stylePropertyKey]: `hsl(${MAX_WORKER_COMPLEXITY_POSSIBILITY / 2 - Math.floor(Number(userInputComplexity) / 2)}deg, 100%, 60%, ${Math.floor(Number(userInputComplexity) / 4 + 50) / 100})`
    })



    if (!isCurrentInstanceAMainThread() && !isWorkerReady) return (
        <section className={scss.host}>
            <div className={scss.loadingPlaceholder}/>
        </section>)



    return (
        <section className={scss.host}>

            <>
                {
                    isCurrentInstanceAMainThread() ?
                        <AppButtonAtom
                            className={[scss.mainFireButton, (() => isWorkerWorking ? getDynamicClassNameByComplexityEdgeCase(userInputComplexity) : '')()].join(' ')}
                            style={getDynamicColorByComplexity('backgroundColor')}

                            onClick={handleMainThreadSwitchChange}
                        >
                            <span
                                style={getDynamicColorStyleByComplexityEdgeCase(userInputComplexity)}>
                                {workerKey.workerName} {isMainThreadOn ? <strong> ON</strong> : 'OFF'}
                            </span>
                        </AppButtonAtom>

                        :

                        <AppButtonAtom
                            className={[scss.mainFireButton, (() => isWorkerWorking ? getDynamicClassNameByComplexityEdgeCase(userInputComplexity) : '')()].join(' ')}
                            style={getDynamicColorByComplexity('backgroundColor')}

                            onClick={handleWorkerWorkSwitch}

                        >
                            <span
                                style={getDynamicColorStyleByComplexityEdgeCase(userInputComplexity)}>
                                {workerKey.workerName} {isWorkerWorking ? <strong> ON</strong> : 'OFF'}
                            </span>
                        </AppButtonAtom>
                }
            </>

            <section className={scss.complexityForm}>
                <Typography variant="body2" component="span" className={scss.inputLabel}> complexity: </Typography>

                <AppInputAtom
                    disabled={isWorkerWorking}
                    value={userInputComplexity}
                    inputProps={{type: 'number'}}
                    onChange={(event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                        setUserInputComplexity(event.currentTarget.value)}
                    onBlur={(event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                        setUserInputComplexity(getValidatedPassedAmount(event.currentTarget.value, MIN_WORKER_COMPLEXITY_POSSIBILITY, MAX_WORKER_COMPLEXITY_POSSIBILITY))}
                />
                <Slider
                    disabled={isWorkerWorking}
                    value={Number(userInputComplexity)}
                    onChange={((_, newValue: number | number[]) => {
                        setUserInputComplexity(Array.isArray(newValue) ? newValue[0] : newValue)
                    })}
                    aria-labelledby="input-slider"
                    min={MIN_WORKER_COMPLEXITY_POSSIBILITY}
                    max={MAX_WORKER_COMPLEXITY_POSSIBILITY}
                />
            </section>

        </section>
    )
}

export default WorkersWorkSwitchMolecule
