import React, { JSXElementConstructor, ReactElement } from 'react'
import { AppProps } from 'next/app'
import {
    ISystemComponentsVisibilities,
    selectSystemComponentsVisibilities,
    VisibilityOfSystemComponentNameType
} from '@/features/control-panel/controlPanelSlice'
import { useAppSelector } from '@/core/store.core'



interface IProps {
    children: ReactElement<AppProps, JSXElementConstructor<unknown>>
    visibilityOfSystemComponentControl: VisibilityOfSystemComponentNameType
}


const SystemComponentVisibilityComposition = ({children, visibilityOfSystemComponentControl}: IProps) => {

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
