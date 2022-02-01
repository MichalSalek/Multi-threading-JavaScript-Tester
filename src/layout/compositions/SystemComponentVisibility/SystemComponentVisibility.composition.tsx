import React, { JSXElementConstructor, ReactElement } from 'react'
import { AppProps } from 'next/app'
import {
    ISystemComponentsVisibilities,
    selectSystemComponentsVisibilities,
    SystemComponentNameType
} from '@/features/control-panel/controlPanelSlice'
import { useAppSelector } from '@/core/store.core'



interface IProps {
    children: ReactElement<AppProps, JSXElementConstructor<unknown>>
    visibilityOfSystemComponentControl: SystemComponentNameType
}


const SystemComponentVisibilityComposition = ({children, visibilityOfSystemComponentControl}: IProps) => {

    const systemComponentsVisibilities: ISystemComponentsVisibilities = useAppSelector(selectSystemComponentsVisibilities)

    const getGenericComponentClassName = (): string => `component-visibility component-visibility-${visibilityOfSystemComponentControl}`

    const getVisibilityClassName = (): string => systemComponentsVisibilities[visibilityOfSystemComponentControl] ? '' : 'display-none'

    return (
        <aside
            className={[getGenericComponentClassName(), getVisibilityClassName(), 'turn-on-opacity-animation'].join(' ')}>
            {children}
        </aside>
    )
}

export default SystemComponentVisibilityComposition
