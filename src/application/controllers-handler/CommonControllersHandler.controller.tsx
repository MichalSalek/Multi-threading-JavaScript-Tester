import React, {ReactNode} from 'react'
import {JSXControllers, voidControllers} from '@/application/controllers-handler/controllers-handler.config'



export type ControllerWithJSX = (() => JSX.Element)
export type ControllersWithJSX = ControllerWithJSX[]

export type VoidController = (() => void)
export type VoidControllers = VoidController[]


type Props = {
    children: ReactNode
}

export const CommonControllersHandler = ({children}: Props): JSX.Element => {

    voidControllers.forEach((controller: VoidController) => {
        controller()
    }
    )

    return <>
        {JSXControllers.map((controller: ControllerWithJSX) =>
            <>{controller()}</>
        )}

        {children}
    </>
}
