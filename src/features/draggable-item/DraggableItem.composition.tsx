import Draggable, {ControlPosition} from 'react-draggable'
import React, {JSXElementConstructor, ReactElement} from 'react'
import {AppProps} from 'next/app'

interface IProps {
	children: ReactElement<AppProps, JSXElementConstructor<unknown>>
	initialPosition?: ControlPosition
}

export const DraggableItemComposition = ({children, initialPosition = {x:0, y:0}}: IProps): JSX.Element => {

	const nodeRef = React.createRef<HTMLDivElement>()

	return (
		<Draggable nodeRef={nodeRef} handle="strong" defaultPosition={initialPosition}>
			<div ref={nodeRef} className={'drag-item'}>
				<strong>
					<span>Drag here</span>
				</strong>
				{children}
			</div>
		</Draggable>
	)

}
