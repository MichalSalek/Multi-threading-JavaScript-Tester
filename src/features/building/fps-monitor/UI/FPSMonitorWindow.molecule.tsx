import React, { useEffect, useRef } from 'react'

import scss from './FPSMonitor.module.scss'
import { DraggableWindowComposition } from '@/layout/compositions/draggable-window/DraggableWindow.composition'
import SystemComponentVisibilityComposition
    from '@/layout/compositions/system-component-visibility/SystemComponentVisibility.composition'



const FPSMonitorWindowMolecule = (): JSX.Element => {

    const FPSMonitorRef = useRef<HTMLElement>(null)

    // Importing .min.js file from public directory to get around TypeScript processor,
    // without any ban ts-ignore comments
    //
    useEffect(() => {
        const script = document.createElement('script')
        script.onload = function () {
            const stats = new StatsRemake()
            stats.showPanel(0)
            FPSMonitorRef.current?.appendChild(stats.dom)

            requestAnimationFrame(function loop() {
                stats.update()
                requestAnimationFrame(loop)
            })
        }
        script.src = '/stats.min.js'
        document.head.appendChild(script)

        return () => undefined
    }, [])
    

    return (
        <SystemComponentVisibilityComposition visibilityOfSystemComponentControl={'FPSMonitor'}>
            <DraggableWindowComposition
                componentUITitleBarName={'FPS monitor'}
                switchVisibilityConfiguration={{name: 'FPSMonitor', visibilitySwitchState: false}}
                onTheScreenPosition={{x: 50, y: 10}}
                zIndex={1920}
            >
                <article
                    ref={FPSMonitorRef}
                    className={`${scss.host} display-inline-block`}/>
            </DraggableWindowComposition>
        </SystemComponentVisibilityComposition>
    )
}

export default FPSMonitorWindowMolecule
