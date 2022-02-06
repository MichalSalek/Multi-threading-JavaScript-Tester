import React, { FormEvent, useState } from 'react'
import { getValidatedPassedAmount, queueWorkerTask } from '@/features/web-workers-configuration/webWorkers.api'
import { WEB_WORKER_TASKS } from '@/features/web-workers-configuration/webWorkersEvents'
import { WorkerKeyType } from '@/features/web-workers-configuration/webWorkers.types'
import {
    useSingleWorkerSpecificStatus,
    UseSpecificWorkerStatusCommandEnum
} from '@/features/calculation-workers-configuration/calculationWorkers.hooks'
import AppButtonAtom from '@/app-components/AppButton.atom'
import AppInputAtom from '@/app-components/AppInput.atom'
import {
    MAIN_THREAD_KEY,
    MAX_WORKER_COMPLEXITY_POSSIBILITY,
    MIN_WORKER_COMPLEXITY_POSSIBILITY
} from '@/app-config-and-utils'
import { Slider, Typography } from '@mui/material'
import scss from './CalculationWorkersWorkSwitch.module.scss'
import { randomIntFromNumbersRange } from '@/core/coding-utils/numberOperations'
import { useMainThreadCalculations } from '@/features/calculation-workers-controls/calculationWorkersControls.hooks'



interface IProps {
    workerKey: WorkerKeyType
}


const CalculationWorkersWorkSwitchMolecule = ({workerKey}: IProps): JSX.Element => {

    // Listening to worker's ready state
    //
    const [isWorkerReady] = useSingleWorkerSpecificStatus(UseSpecificWorkerStatusCommandEnum.ready, workerKey)

    // Listening to worker's work state
    //
    const [isWorkerWorking] = useSingleWorkerSpecificStatus(UseSpecificWorkerStatusCommandEnum.working, workerKey)

    // Complexity of calculations defined by user
    //
    const [userInputComplexity, setUserInputComplexity] = useState<number | string>(randomIntFromNumbersRange(15, 120))


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


    const getIsComplexityValueEdgeCase = (complexity: number | string, edgeDistanceValue = 20): boolean =>
        complexity > MAX_WORKER_COMPLEXITY_POSSIBILITY - edgeDistanceValue



    const getComplexityDependsDynamicBackgroundStyle = (): React.CSSProperties => ({
        backgroundColor: `hsl(${MAX_WORKER_COMPLEXITY_POSSIBILITY / 2 - Math.floor(Number(userInputComplexity) / 2)}deg, 100%, 60%, ${Math.floor(Number(userInputComplexity) / 4 + 50) / 100})`
    })


    if (!isCurrentInstanceAMainThread() && !isWorkerReady) return (
        <section className={scss.host}>
            <div className={scss.loadingPlaceholder}/>
        </section>)

    return (
        <section className={scss.host}>

            {
                isCurrentInstanceAMainThread() ?
                    <AppButtonAtom
                        className={[scss.mainFireButton, 'no-transition'].join(' ')}
                        style={getComplexityDependsDynamicBackgroundStyle()}
                        onClick={handleMainThreadSwitchChange}
                    >
                        <span
                            style={{filter: getIsComplexityValueEdgeCase(userInputComplexity) ? 'invert(0)' : 'invert(1)'}}>
                            {workerKey.workerName} {isMainThreadOn ? <strong> ON</strong> : 'OFF'}
                        </span>
                    </AppButtonAtom>
                    :
                    <AppButtonAtom
                        className={[scss.mainFireButton, 'no-transition'].join(' ')}
                        style={getComplexityDependsDynamicBackgroundStyle()}
                        onClick={handleWorkerWorkSwitch}
                    >
                        <span
                            style={{filter: getIsComplexityValueEdgeCase(userInputComplexity) ? 'invert(0)' : 'invert(1)'}}>
                            {workerKey.workerName} {isWorkerWorking ? <strong> ON</strong> : 'OFF'}
                        </span>
                    </AppButtonAtom>
            }

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
            <br/>

        </section>
    )
}

export default CalculationWorkersWorkSwitchMolecule
