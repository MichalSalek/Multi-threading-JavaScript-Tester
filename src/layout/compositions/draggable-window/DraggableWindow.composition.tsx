import Draggable, { ControlPosition, DraggableData, DraggableEvent } from 'react-draggable'
import React, { JSXElementConstructor, ReactElement, useEffect, useState } from 'react'
import { AppProps } from 'next/app'
import scss from './DraggableItem.composition.module.scss'
import { handleControlPanelSwitchVisibility, SystemComponentNameType } from '@/features/control-panel/controlPanelSlice'
import { useAppDispatch } from '@/core/store.core'
import { useMemoizedOnTheScreenPosition } from '@/features/browser-storage/browserStorage.hooks'
import { Button } from 'semantic-ui-react'



interface IProps {
    children: ReactElement<AppProps, JSXElementConstructor<unknown>>
    componentUITitleBarName: string
    systemComponentName: SystemComponentNameType
    onTheScreenPosition?: ControlPosition
}


export const DraggableItemComposition = ({
    children,
    componentUITitleBarName,
    systemComponentName,
    onTheScreenPosition = {x: 50, y: 50}
}: IProps): JSX.Element => {

    const dispatch = useAppDispatch()

    const nodeRef = React.createRef<HTMLDivElement>()


    const handleCloseWindow = (): void => {
        switch (systemComponentName) {
        case 'scoreboard':
            dispatch(handleControlPanelSwitchVisibility({name: 'scoreboard', visibilitySwitchState: false}))
            break
        case 'FPSMonitor':
            dispatch(handleControlPanelSwitchVisibility({name: 'FPSMonitor', visibilitySwitchState: false}))
            break
        }
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

    const [memoizedOnTheScreenPosition, setMemoizedOnTheScreenPosition] = useMemoizedOnTheScreenPosition(systemComponentName, onTheScreenPosition)


    const onDragStopHandler = (event: DraggableEvent, data: DraggableData): void => {
        setMemoizedOnTheScreenPosition({
            x: data.x,
            y: data.y
        })
    }


    return (
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
                    <Button onClick={handleCloseWindow} className={scss.closeButton}
                        data-description={'close-window-button'}/>
                </strong>
                {children}
            </div>
        </Draggable>
    )

}
