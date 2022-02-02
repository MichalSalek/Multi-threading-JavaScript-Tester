import Draggable, { ControlPosition } from 'react-draggable'
import React, { JSXElementConstructor, ReactElement, useEffect, useState } from 'react'
import { AppProps } from 'next/app'
import scss from './DraggableWindow.module.scss'
import {
    ControlPanelSwitchVisibilityType,
    handleControlPanelSwitchVisibility
} from '@/features/control-panel/controlPanelSlice'
import { useAppDispatch } from '@/core/store.core'
import { useMemoizedOnTheScreenPosition } from '@/features/browser-storage/browserStorage.hooks'



interface IProps {
    children: ReactElement<AppProps, JSXElementConstructor<unknown>>
    componentUITitleBarName: string
    switchVisibilityConfiguration: ControlPanelSwitchVisibilityType
    onTheScreenPosition?: ControlPosition
}


export const DraggableWindowComposition = ({
    children,
    componentUITitleBarName,
    switchVisibilityConfiguration,
    onTheScreenPosition = {x: 50, y: 50}
}: IProps): JSX.Element => {

    const dispatch = useAppDispatch()

    const nodeRef = React.createRef<HTMLDivElement>()


    const handleCloseWindow = (): void => {
        dispatch(handleControlPanelSwitchVisibility(switchVisibilityConfiguration))
    }


    const [clickedOutsideThisWindow, setClickedOutsideThisWindow] = useState(true)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (nodeRef.current && !nodeRef.current.contains(event.target as Node)) {
                setClickedOutsideThisWindow(true)
            } else {
                setClickedOutsideThisWindow(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside, true)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside, true)
        }
    }, [nodeRef])


    const [memoizedOnTheScreenPosition, onDragStopHandler] = useMemoizedOnTheScreenPosition(switchVisibilityConfiguration.name, onTheScreenPosition)



    return (<aside className={scss.host}>
        <Draggable
            nodeRef={nodeRef}
            handle="strong"
            position={memoizedOnTheScreenPosition}
            onStop={onDragStopHandler}
            bounds={'body'}
        >
            <div ref={nodeRef} className={scss.dragItem}>
                <strong className={clickedOutsideThisWindow ? scss.inactive : scss.active}>
                    <span>{componentUITitleBarName}</span>
                    <button onClick={handleCloseWindow} className={scss.closeButton}
                        data-description={'close-window-button'}/>
                </strong>
                {children}
            </div>
        </Draggable>
    </aside>)

}
