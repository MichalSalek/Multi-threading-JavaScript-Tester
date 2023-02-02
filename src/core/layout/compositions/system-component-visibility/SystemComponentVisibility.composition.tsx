import React, { JSXElementConstructor, ReactElement, useMemo } from 'react'
import { AppProps } from 'next/app'
import {
    selectSystemComponentsVisibilities,
    SystemComponentNameType
} from '@/core/layout/components/atoms-and-molecules/control-panel/controlPanel.slice'
import { useAppSelector } from '@/application/store/store'
import {ISystemComponentsVisibilities} from '@/core/layout/components/atoms-and-molecules/control-panel/controlPanel.types'



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
