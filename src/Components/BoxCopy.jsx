import { useState, useEffect } from 'react'

const BoxCopy = (props) => {
	const [coordinates, setCoordinates] = useState({x: 0, y: 0})
	const [style, setStyle] = useState(
		{
			height: '100px',
			width: '100px',
			backgroundColor: 'coral'
		}
	)
	
	useEffect(() => {
		setStyle({
			height: props.boxSize.height,
			width: props.boxSize.width,
			backgroundColor: 'coral',
			position: 'absolute',
			top: `${props.coordinates.y - props.offset.y}px`,
			left: `${props.coordinates.x - props.offset.x}px`,
			margin: '0',
			cursor: 'grabbing'
		})
	}, [props.coordinates])
	
	function handleMouseUp() {
		console.log('MOUSE UP')
		props.onMouseUp();
	}
	
	return (
		<p
			style={style}
			onMouseUp={handleMouseUp}
		>
			I am the BoxCopy
			<b> {props.data}</b>
		</p>
	)
}

export default BoxCopy