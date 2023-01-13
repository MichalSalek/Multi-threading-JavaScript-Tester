import React, { JSXElementConstructor, ReactElement, useMemo } from 'react'
import { AppProps } from 'next/app'
import {
    selectSystemComponentsVisibilities,
    SystemComponentNameType
} from '@/features/building/control-panel/controlPanelSlice'
import { useAppSelector } from '@/core/store.core'
import {ISystemComponentsVisibilities} from '@/features/building/control-panel/controlPanel.types'



type Props = {
    children: ReactElement<AppProps & { isComponentVisible: boolean }, JSXElementConstructor<unknown>>
    visibilityOfSystemComponentControl: SystemComponentNameType
}


const SystemComponentVisibilityComposition = ({children, visibilityOfSystemComponentControl}: Props) => {

    const systemComponentsVisibilities: ISystemComponentsVisibilities = useAppSelector(selectSystemComponentsVisibilities)

    const isComponentVisible = useMemo(() => systemComponentsVisibilities[visibilityOfSystemComponentControl],
        [systemComponentsVisibilities, visibilityOfSystemComponentControl])

    const getVisibilityClassName = (): string => isComponentVisible ? '' : 'visibility-hidden'


    return (
        <aside
            className={getVisibilityClassName()}>
            {React.cloneElement(children, {isComponentVisible})}
        </aside>
    )
}

export default SystemComponentVisibilityComposition
