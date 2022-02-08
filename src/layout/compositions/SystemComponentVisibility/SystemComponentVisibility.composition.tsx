import React, { JSXElementConstructor, ReactElement } from 'react'
import { AppProps } from 'next/app'
import {
    ISystemComponentsVisibilities,
    selectSystemComponentsVisibilities,
    SystemComponentNameType
} from '@/features/business/control-panel/controlPanelSlice'
import { useAppSelector } from '@/core/store.core'



interface IProps {
    children: ReactElement<AppProps, JSXElementConstructor<unknown>>
    visibilityOfSystemComponentControl: SystemComponentNameType
}


const SystemComponentVisibilityComposition = ({children, visibilityOfSystemComponentControl}: IProps) => {

    const systemComponentsVisibilities: ISystemComponentsVisibilities = useAppSelector(selectSystemComponentsVisibilities)

    const getVisibilityClassName = (): string => systemComponentsVisibilities[visibilityOfSystemComponentControl] ? '' : 'visibility-hidden'


    return (
        <aside
            className={getVisibilityClassName()}>
            {children}
        </aside>
    )
}

export default SystemComponentVisibilityComposition
