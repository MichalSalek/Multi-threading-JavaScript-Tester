import React, { FormEvent, useEffect, useMemo, useState } from 'react'
import { getValidatedPassedAmount, queueWorkerTask } from '@/features/background/web-workers/webWorkers.api'
import { WEB_WORKER_TASKS } from '@/features/background/web-workers/webWorkersEvents'
import { WorkerKeyType } from '@/features/background/web-workers/webWorkers.types'
import {
    useSingleWorkerSpecificStatus,
    UseSpecificWorkerStatusCommandEnum
} from '@/features/background/web-workers/webWorkers.hooks'
import AppButtonAtom from '@/app-components/AppButton.atom'
import AppInputAtom from '@/app-components/AppInput.atom'
import {
    MAIN_THREAD_KEY,
    MAX_WORKER_COMPLEXITY_POSSIBILITY,
    MIN_WORKER_COMPLEXITY_POSSIBILITY
} from '@/app-config-constants'
import { Slider, Typography } from '@mui/material'
import scss from './workersWorkSwitch.module.scss'
import { randomIntFromNumbersRange } from '@/coding-utils/numberOperations.api'
import { useMainThreadCalculations } from '@/features/building/workers-work-switch/workersWork.hooks'
import { useAppDispatch } from '@/core/store.core'
import { handleWorkerComplexityStateReport } from '@/features/background/web-workers/webWorkersSlice'
import {
    getDynamicAnimationClassNameByComplexity,
    getDynamicColorByComplexity,
    getDynamicColorStyleByComplexityEdgeCase
} from '@/features/building/workers-work-switch/workersUIOperations'



export type ComplexityValueType = number | string


interface IProps {
    workerKey: WorkerKeyType
    globalComplexityValue?: ComplexityValueType
}


const WorkersWorkSwitchMolecule = ({workerKey, globalComplexityValue}: IProps): JSX.Element => {

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



    // Set global complexity from props to component state
    //
    useEffect(() => {
        if (typeof globalComplexityValue !== 'number') {
            setUserInputComplexity(randomizedNumber)
        } else {
            setUserInputComplexity(globalComplexityValue)
        }
        return () => undefined
    }, [globalComplexityValue, randomizedNumber])



    const isCurrentInstanceAMainThread = (): boolean => workerKey.workerName === MAIN_THREAD_KEY.workerName


    // Set new complexity state report on component complexity change
    //
    useEffect(() => {
        dispatch(handleWorkerComplexityStateReport({
            workerName: workerKey.workerName,
            complexity: Number(userInputComplexity)
        }))

        return () => undefined
    }, [dispatch, userInputComplexity, workerKey.workerName])


    const handleWorkerWorkSwitch = (): void => {
        queueWorkerTask(workerKey, !isWorkerWorking ?
            {
                workerTaskName: WEB_WORKER_TASKS.turnOnCalculations,
                complexity: getValidatedPassedAmount(userInputComplexity, MIN_WORKER_COMPLEXITY_POSSIBILITY, MAX_WORKER_COMPLEXITY_POSSIBILITY)
            }
            : {workerTaskName: WEB_WORKER_TASKS.turnOffCalculations},
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
