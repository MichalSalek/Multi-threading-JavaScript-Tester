import React, {useState} from 'react'
import {queueWorkerTask} from '@/features/workers/workers.api'
import {WEB_WORKER_TASKS} from '@/features/workers/workers-events'
import {WorkerKeyType} from '@/features/workers/workers.types'
import {
    useSpecificWorkerStatus,
    UseSpecificWorkerStatusCommandEnum
} from '@/features/calculations-components/calculationsHooks'



interface IProps {
	workerKey: WorkerKeyType
}


const CalculationsWorkerSwitchMolecule = ({workerKey}: IProps): JSX.Element => {

    // Listening to worker's ready state
    //
    const [isWorkerReady] = useSpecificWorkerStatus(UseSpecificWorkerStatusCommandEnum.ready, workerKey)

    // Listening to worker's work state
    //
    const [isWorkerWorking] = useSpecificWorkerStatus(UseSpecificWorkerStatusCommandEnum.working, workerKey)

    // Complexity of calculations defined by user
    //
    const [userInputComplexity, setUserInputComplexity] = useState(25)



    if (!isWorkerReady) return <section><span>Loading {workerKey.workerName}...<br/><br/></span></section>
    return (
        <section>

            <input
                disabled={isWorkerWorking}
                type={'number'}
                value={userInputComplexity}
                min={2}
                max={200}
                onInput={(e) => setUserInputComplexity(Number(e.currentTarget.value))}
            />

            <button onClick={() => {
                queueWorkerTask(workerKey, !isWorkerWorking ?
                    {workerTaskName: WEB_WORKER_TASKS.turnOnCalculations, complexity: userInputComplexity}
                    : {workerTaskName: WEB_WORKER_TASKS.turnOffCalculations},
                `Triggering a switch at the "${workerKey.workerName}"`)
            }}
            > Worker {workerKey.workerName} {isWorkerWorking ? <strong>ON</strong> : 'OFF'}
            </button>
            <br/>
            {/*<button onClick={() => workerLifeSwitch(workerKey, WorkerLifeSwitchCommandEnum.uninstall)}>Remove this Worker -</button>*/}
            <br/>

        </section>
    )
}

export default CalculationsWorkerSwitchMolecule
