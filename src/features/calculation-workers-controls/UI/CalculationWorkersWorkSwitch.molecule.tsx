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
import { MAX_WORKER_COMPLEXITY_POSSIBILITY } from '@/app-config-and-utils'
import { Typography } from '@mui/material'
import scss from './CalculationWorkersWorkSwitch.module.scss'



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
    const [userInputComplexity, setUserInputComplexity] = useState<number | string>(25)



    if (!isWorkerReady) return <section><span>Loading {workerKey.workerName}...<br/><br/></span></section>
    return (
        <section className={scss.host}>
            <AppButtonAtom
                size={'small'}
                onClick={() => {
                    queueWorkerTask(workerKey, !isWorkerWorking ?
                        {
                            workerTaskName: WEB_WORKER_TASKS.turnOnCalculations,
                            complexity: getValidatedPassedAmount(userInputComplexity, 2, MAX_WORKER_COMPLEXITY_POSSIBILITY)
                        }
                        : {workerTaskName: WEB_WORKER_TASKS.turnOffCalculations},
                    `Triggering a switch at the "${workerKey.workerName}"`)
                }}
            >{workerKey.workerName} {isWorkerWorking ? <strong> ON</strong> : 'OFF'}
            </AppButtonAtom>

            <section className={scss.complexityForm}>
                <Typography variant="body2" component="span"> complexity: </Typography>
                <AppInputAtom
                    disabled={isWorkerWorking}
                    value={userInputComplexity}
                    inputProps={{type: 'number'}}
                    onChange={(e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                        setUserInputComplexity(e.currentTarget.value)}
                    onBlur={(e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                        setUserInputComplexity(getValidatedPassedAmount(e.currentTarget.value, 2, MAX_WORKER_COMPLEXITY_POSSIBILITY))}
                />
            </section>
            <br/>

        </section>
    )
}

export default CalculationWorkersWorkSwitchMolecule
