import { useState, useEffect } from 'react'
import styles from './Box.module.css'

const Box = ({ dragging }) => {
	const [clicked, setClicked] = useState(false)
	const [coordinates, setCoordinates] = useState({x: 0, y: 0})
	const [offset, setOffset] = useState({x: 0, y: 0})
	const [hoverState, setHoverState] = useState(null)
	const [relativeCoordinates, setRelativeCoordinates] = useState({x: 0, y: 0})
	const [relativeOrigo, setRelativeOrigo] = useState([null])
	
	let boxClicked = false
	
	useEffect(() => {
		const handleWindowMouseMove = event => {
			setCoordinates({
				x: event.clientX,
				y: event.clientY,
			});
			
		};
		
		window.addEventListener('mousemove', handleWindowMouseMove);
	
		return () => {
			window.removeEventListener('mousemove', handleWindowMouseMove);
		};
	}, []);
	
	
	const [boxStyle, setBoxStyle] = useState({
		position: 'relative',
		top: `${coordinates.y - offset.y}px`,
		left: `${coordinates.x - offset.x}px`,
		width: '100px',
		height: '100px',
		backgroundColor: 'darkgray',
		cursor: 'grabbing'
	})

	
	useEffect(() => {
		setBoxStyle({
			position: 'relative',
			top: `${(coordinates.y - relativeOrigo.y) - offset.y}px`,
			// (250 - 15) = 235
			left: `${(coordinates.x - relativeOrigo.x) - offset.x}px`,
			width: '100px',
			height: '100px',
			backgroundColor: 'darkgray',
			cursor: 'grabbing'
		})
		
	}, [coordinates])
	
	const textStyle = {
		color: 'white',
		fontFamily: 'Helvetica'
	}
	
	function onMouseMove(event) {
		setOffset({
			x: event.clientX - event.target.offsetLeft,
			y: event.clientY - event.target.offsetTop
		})
		setRelativeOrigo({x: event.target.offsetLeft, y: event.target.offsetTop})
	}
	
	function onMouseDown(event) {
		setClicked(true)
		dragging(true)
	}
	
	function onMouseUp(event) {
		setClicked(false)
		setOffset({
			x: 0,
			y: 0
		})
		dragging(false)
	}
	
	useEffect(() => {
		
	}, [offset])
	
	
	
	return (
		<button
			style={clicked ? boxStyle : altBoxStyle }
			className={styles.box}
			onMouseDown={onMouseDown}
			onMouseUp={onMouseUp}
			onMouseMove={!clicked ? onMouseMove : null}
		>
			I am draggable
		</button>
	)
}


const altBoxStyle = {
	width: '100px',
	height: '100px',
	backgroundColor: 'blue'
}



export default Box;