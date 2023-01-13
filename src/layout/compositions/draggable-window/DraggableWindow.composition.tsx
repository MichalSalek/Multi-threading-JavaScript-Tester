import Draggable, {ControlPosition} from 'react-draggable'
import React, {ReactNode, useEffect, useState} from 'react'
import scss from './DraggableWindow.module.scss'
import {
    ControlPanelSwitchVisibilityType,
    handleControlPanelSwitchVisibility
} from '@/features/building/control-panel/controlPanelSlice'
import {useAppDispatch} from '@/core/store.core'
import {usePersistedPositionByBrowserStorage} from '@/features/background/browser-storage/domain/browserStorage.hooks'




type Props = {
  children: ReactNode
  componentUITitleBarName: string
  switchVisibilityConfiguration: ControlPanelSwitchVisibilityType
  onTheScreenPosition?: ControlPosition
  zIndex?: number
  isComponentVisible?: boolean
}


export const DraggableWindowComposition = ({
    children,
    componentUITitleBarName,
    switchVisibilityConfiguration,
    onTheScreenPosition = {x: 50, y: 50},
    zIndex = 1900,
    isComponentVisible
}: Props): JSX.Element => {

    const dispatch = useAppDispatch()

    const nodeRef = React.createRef<HTMLDivElement>()


    const handleCloseWindow = (): void => {
        dispatch(handleControlPanelSwitchVisibility(switchVisibilityConfiguration))
    }


    const [clickedOutsideThisWindow, setClickedOutsideThisWindow] = useState(false)

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


    const [memoizedOnTheScreenPosition, onDragStopHandler] = usePersistedPositionByBrowserStorage(switchVisibilityConfiguration.name, onTheScreenPosition)


    // Handling isComponentVisible optional prop from SystemComponentVisibility.
    // Enter in "active" visual mode on visibility on.
    //
    useEffect(() => {
        setClickedOutsideThisWindow(!isComponentVisible)
    }, [isComponentVisible])


    return (<aside
        style={{
            zIndex,
            position: 'relative'
        }}>
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
