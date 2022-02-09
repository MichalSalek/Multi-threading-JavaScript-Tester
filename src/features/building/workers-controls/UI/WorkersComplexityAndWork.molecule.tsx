//
// import { Dispatch, SetStateAction, useMemo, useState } from 'react'
// import {
//     selectActuallyWorkingWorkersAmount,
//     selectRequestedWorkersAmount
// } from '@/features/web-workers-configuration/webWorkersSlice'
// import WorkersWorkSwitchMolecule
//     from '@/features/workers-controls/building/CalculationWorkersWorkSwitch.molecule'
// import {
//     constructWorkerNameByOrderIndex,
//     queueAllWorkersTask
// } from '@/features/web-workers-configuration/webWorkers.api'
// import { useAppSelector } from '@/core/store.core'
// import scss from './WorkersView.module.scss'
// import {
//     fireJustClientSide,
//     MAX_WORKER_COMPLEXITY_POSSIBILITY,
//     MIN_WORKER_COMPLEXITY_POSSIBILITY
// } from '@/app-config-and-utils'
// import { Slider } from '@mui/material'
// import AppButtonAtom from '@/app-components/AppButton.atom'
//
//
// interface IProps {
//     setGlobalComplexityValue: Dispatch<SetStateAction<number | 'NaN' | undefined>>
// }
//
// const CalculationsWorkersComplexityAndWorkMolecule = ({setGlobalComplexityValue}: IProps): JSX.Element => {
//
//     const workerRequestedAmount = useAppSelector(selectRequestedWorkersAmount)
//
//     const workersAmountArray = useMemo(() => Array(workerRequestedAmount.amount).fill(undefined), [workerRequestedAmount])
//
//
//     const actuallyWorkingWorkers = useAppSelector(selectActuallyWorkingWorkersAmount)
//
//
//     const [sliderRAWValue, setSliderRAWValue] = useState<number | undefined>(undefined)
//
//
//     const handleNewSliderRAWValue = (newValue: number): void => {
//         setSliderRAWValue(newValue)
//     }
//
//
//     const isSliderHasAnInitialStateYet = useMemo<boolean>(() =>
//         typeof sliderRAWValue === 'undefined', [sliderRAWValue])
//
//
//     const isAnyWorkerWorking = useMemo<boolean>(() =>
//         actuallyWorkingWorkers.amount > 0, [actuallyWorkingWorkers.amount])
//
//
//     const isAllOfWorkersWorking = useMemo<boolean>(() =>
//         actuallyWorkingWorkers.amount === workerRequestedAmount.amount, [actuallyWorkingWorkers.amount, workerRequestedAmount.amount])
//
//
//     const isNoWorkerActive = useMemo(() =>
//         workerRequestedAmount.amount === 0, [workerRequestedAmount.amount])
//
//
//     const handleNewGlobalComplexitySet = (): void => {
//         setGlobalComplexityValue(Array.isArray(sliderRAWValue) ? sliderRAWValue[0] : sliderRAWValue)
//     }
//
//     const handleRefreshUndefinedGlobalComplexityState = (): void => {
//
//         setGlobalComplexityValue(() => 'NaN')
//         fireJustClientSide(() => window.setTimeout(() => setGlobalComplexityValue(undefined), 0))
//     }
//
//     return (<main>
//
//         <AppButtonAtom
//             disabled={isSliderHasAnInitialStateYet || isAnyWorkerWorking || isNoWorkerActive}
//             onClick={onNewGlobalComplexitySet}>
//             <span>SET</span>
//         </AppButtonAtom>
//         <AppButtonAtom
//             onClick={handleRefreshUndefinedGlobalComplexityState}
//             disabled={isAnyWorkerWorking || isNoWorkerActive}>
//             <span>SET INITIAL</span>
//         </AppButtonAtom>
//         <AppButtonAtom
//             onClick={() => queueAllWorkersTask({workerTaskName: 'task__calculations_on'})}
//             disabled={isAllOfWorkersWorking}>
//             <span>MAKE THEM ALL WORK</span>
//         </AppButtonAtom>
//         <AppButtonAtom
//             onClick={() => queueAllWorkersTask({workerTaskName: 'task__calculations_off'})}
//             disabled={!isAnyWorkerWorking}>
//             <span>STOP ALL WORKERS</span>
//         </AppButtonAtom>
//
//     </main>)
// }
//
// export default CalculationsWorkersComplexityAndWorkMolecule
export default {}
