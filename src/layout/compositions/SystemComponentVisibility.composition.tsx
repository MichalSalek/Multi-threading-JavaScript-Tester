import React, { JSXElementConstructor, ReactElement } from 'react'
import { AppProps } from 'next/app'
import {
    ISystemComponentsVisibilities,
    selectSystemComponentsVisibilities,
    VisibilityOfSystemComponentType
} from '@/features/control-panel/controlPanelSlice'
import { useAppSelector } from '@/core/store.core'



interface IProps {
    children: ReactElement<AppProps, JSXElementConstructor<unknown>>
    visibilityOfSystemComponentControl: VisibilityOfSystemComponentType
}


const SystemComponentVisibilityComposition = ({children, visibilityOfSystemComponentControl}: IProps) => {

    // Listen to changes at the visibility of whole system components
    //
    const systemComponentsVisibilities: ISystemComponentsVisibilities = useAppSelector(selectSystemComponentsVisibilities)

    const getVisibilityClassName = (): string => systemComponentsVisibilities[visibilityOfSystemComponentControl] ? '' : 'display-none'

    const getGenericComponentClassName = (): string => `component-visibility-${visibilityOfSystemComponentControl}`

    return (
        <aside
            className={[getVisibilityClassName(), getGenericComponentClassName()].join(' ')}>
            {children}
        </aside>
    )
}

export default SystemComponentVisibilityComposition
