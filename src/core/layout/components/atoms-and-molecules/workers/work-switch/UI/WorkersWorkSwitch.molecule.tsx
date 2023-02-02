import React, { FormEvent, useEffect, useMemo, useState } from 'react'
import { CALCULATIONS_WORKER_COMMANDS } from '@/core/features/calculations-workers/calculationsWorkersCommandsList'
import {
    useSingleWorkerSpecificStatus,
    UseSpecificWorkerStatusCommandEnum
} from '@/core/features/calculations-workers/calculationsWorkers.hooks'
import AppButtonAtom from '@/core/layout/components/common/AppButton.atom'
import AppInputAtom from '@/core/layout/components/common/AppInput.atom'
import { Slider, Typography } from '@mui/material'
import scss from './workersWorkSwitch.module.scss'
import { randomIntFromNumbersRange } from '@/utils/numberOperations.api'
import { useMainThreadCalculations } from '@/core/layout/components/atoms-and-molecules/workers/work-switch/workersWork.hooks'
import { useAppDispatch } from '@/application/store/store'
import { handleWorkerComplexityStateReport } from '@/core/features/calculations-workers/calculationsWorkers.slice'
import {
    getDynamicAnimationClassNameByComplexity,
    getDynamicColorByComplexity,
    getDynamicColorStyleByComplexityEdgeCase
} from '@/core/layout/components/atoms-and-molecules/workers/work-switch/workersUIOperations'
import {WorkersPolicy} from '../../../../../../../../shared-policies/workers.policy'
import {WorkerKeyType} from '@/application/workers/workers.types'
import {getValidatedPassedAmount, queueWorkerTask} from '@/application/workers/workers.api'



export type ComplexityValueType = number | string


type Props = {
    workerKey: WorkerKeyType
    globalComplexityValue?: ComplexityValueType
}


const WorkersWorkSwitchMolecule = ({workerKey, globalComplexityValue}: Props): JSX.Element => {

    const dispatch = useAppDispatch()


    // Random range of the initial complexity
    //
    const randomizedNumber = useMemo(() => randomIntFromNumbersRange(10, 120), [])

    // Complexity of calculations defined by user
    //
    const [userInputComplexity, setUserInputComplexity] = useState<ComplexityValueType>(randomizedNumber)


    // Listening to worker's ready state
    //
    const [isWorkerReady] = useSingleWorkerSpecificStatus(UseSpecificWorkerStatusCommandEnum.ready, workerKey)


    // Listening to worker's work state
    //
    const [isWorkerWorking] = useSingleWorkerSpecificStatus(UseSpecificWorkerStatusCommandEnum.working, workerKey)

    // Switch on Main thread calculations
    //
    const [isMainThreadOn, handleMainThreadSwitchChange] =
        useMainThreadCalculations(100, Number(userInputComplexity), false)



    // Set common complexity from props to component state
    //
    useEffect(() => {
        if (typeof globalComplexityValue !== 'number') {
            setUserInputComplexity(randomizedNumber)
        } else {
            setUserInputComplexity(globalComplexityValue)
        }
    }, [globalComplexityValue, randomizedNumber])



    const isCurrentInstanceAMainThread = (): boolean => workerKey.workerName === WorkersPolicy.MAIN_THREAD_KEY.workerName


    // Set new complexity state report on component complexity change
    //
    useEffect(() => {
        dispatch(handleWorkerComplexityStateReport({
            workerName: workerKey.workerName,
            complexity: Number(userInputComplexity)
        }))

    }, [dispatch, userInputComplexity, workerKey.workerName])


    const handleWorkerWorkSwitch = (): void => {
        queueWorkerTask(workerKey, !isWorkerWorking ?
            {
                workerTaskName: CALCULATIONS_WORKER_COMMANDS.turnOnCalculations,
                complexity: getValidatedPassedAmount(userInputComplexity, WorkersPolicy.MIN_WORKER_COMPLEXITY_POSSIBILITY, WorkersPolicy.MAX_WORKER_COMPLEXITY_POSSIBILITY)
            }
            : {workerTaskName: CALCULATIONS_WORKER_COMMANDS.turnOffCalculations},
        `Triggering a switch at the "${workerKey.workerName}"`)
    }


    if (!isCurrentInstanceAMainThread() && !isWorkerReady) return (
        <section className={scss.host}>
            <div className={scss.loadingPlaceholder}/>
        </section>)



    return (
        <section className={scss.host}>

            {
                isCurrentInstanceAMainThread() ?

                    <AppButtonAtom
                        className={[scss.mainFireButton, (() => isMainThreadOn ? getDynamicAnimationClassNameByComplexity(userInputComplexity) : '')()].join(' ')}
                        style={getDynamicColorByComplexity(userInputComplexity, 'backgroundColor')}
                        onClick={handleMainThreadSwitchChange}>

                        <span
                            style={getDynamicColorStyleByComplexityEdgeCase(userInputComplexity)}>
                            MAIN THREAD: {isMainThreadOn ? <u>ON</u> : 'OFF'}
                        </span>

                    </AppButtonAtom>

                    :

                    <AppButtonAtom
                        className={[scss.mainFireButton, (() => isWorkerWorking ? getDynamicAnimationClassNameByComplexity(userInputComplexity) : '')()].join(' ')}
                        style={getDynamicColorByComplexity(userInputComplexity, 'backgroundColor')}
                        onClick={handleWorkerWorkSwitch}>

                        <span
                            style={getDynamicColorStyleByComplexityEdgeCase(userInputComplexity)}>
                            <strong>{workerKey.workerName.slice(18) // cutting 'calculationWorker' before it's number
                            }</strong>
                            <p>{isWorkerWorking ? <u>ON</u> : ' OFF'}</p>

                        </span>

                    </AppButtonAtom>
            }

            <section className={scss.complexityForm}>
                <AppInputAtom
                    disabled={isWorkerWorking}
                    value={userInputComplexity}
                    inputProps={{type: 'number'}}
                    onChange={(event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                        setUserInputComplexity(event.currentTarget.value)}
                    onBlur={(event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                        setUserInputComplexity(getValidatedPassedAmount(event.currentTarget.value, WorkersPolicy.MIN_WORKER_COMPLEXITY_POSSIBILITY, WorkersPolicy.MAX_WORKER_COMPLEXITY_POSSIBILITY))}
                />
                <Slider
                    disabled={isWorkerWorking}
                    value={Number(userInputComplexity)}
                    onChange={((_, newValue: number | number[]) => {
                        setUserInputComplexity(Array.isArray(newValue) ? newValue[0] : newValue)
                    })}
                    aria-labelledby="input-slider"
                    min={WorkersPolicy.MIN_WORKER_COMPLEXITY_POSSIBILITY}
                    max={WorkersPolicy.MAX_WORKER_COMPLEXITY_POSSIBILITY}

                    style={{
                        ...getDynamicColorByComplexity(userInputComplexity, 'color'),
                        ...getDynamicColorByComplexity(userInputComplexity, isWorkerWorking ? 'backgroundColor' : '', 1),
                        ...{[isWorkerWorking ? 'filter' : '']: 'saturate(1.5)'}
                    }}

                />
            </section>

            {isMainThreadOn ?
                <Typography variant={'body2'} component={'aside'}
                    className={[scss.asideText, 'lower-opacity'].join(' ')}>
                    Move the slider and watch the animation.
                </Typography>
                : null}

        </section>
    )
}

export default WorkersWorkSwitchMolecule
