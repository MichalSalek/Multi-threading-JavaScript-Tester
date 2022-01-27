import React, { useEffect, useRef } from 'react'

import scss from './FPSMonitor.atom.module.scss'
import { DraggableItemComposition } from '@/layout/compositions/draggable-item/DraggableItem.composition'
import SystemComponentVisibilityComposition
    from '@/layout/compositions/system-component-visibility/SystemComponentVisibility.composition'



const FPSMonitorFloatingMolecule = (): JSX.Element => {

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
            <DraggableItemComposition
                componentUITitleBarName={'FPS monitor'}
                systemComponentName={'FPSMonitor'}
                onTheScreenPosition={{x: 500, y: 150}}>
                <article
                    ref={FPSMonitorRef}
                    className={`${scss.host} display-inline-block`}/>
            </DraggableItemComposition>
        </SystemComponentVisibilityComposition>
    )
}

export default FPSMonitorFloatingMolecule
