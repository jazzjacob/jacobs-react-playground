import styles from './Box.module.css'
import { useState, useEffect } from 'react'

const DraggableBox = () => {
	const [clicked, setClicked] = useState(false)
	const [dragging, setDragging] = useState(false)
	const [coordinates, setCoordinates] = useState({x: 0, y: 0})
	const [offset, setOffset] = useState({x: 0, y: 0})
	const [hoverState, setHoverState] = useState(null)
	const [relativeCoordinates, setRelativeCoordinates] = useState({x: 0, y: 0})
	const [relativeOrigo, setRelativeOrigo] = useState([null])
	const [boxStyle, setBoxStyle] = useState({
		position: 'relative',
		top: `${coordinates.y - offset.y}px`,
		left: `${coordinates.x - offset.x}px`,
		width: '100px',
		height: '100px',
		backgroundColor: 'darkgray',
		cursor: 'grabbing'
	})
	const [boxCopyStyle, setboxCopyStyle] = useState({
		position: 'absolute',
		top: `${coordinates.y - offset.y}px`,
		left: `${coordinates.x - offset.x}px`,
		width: '100px',
		height: '100px',
		backgroundColor: 'darkgray',
		cursor: 'grabbing'
	})
	
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
	
	useEffect(() => {
		setBoxStyle({
			position: 'relative',
			top: `${(coordinates.y - relativeOrigo.y) - offset.y}px`,
			// (250 - 15) = 235
			left: `${(coordinates.x - relativeOrigo.x) - offset.x}px`,
			width: '100px',
			height: '100px',
			backgroundColor: 'darkgray',
			cursor: 'grabbing',
			opacity: '0'
		})
		
		setboxCopyStyle({
			position: 'absolute',
			top: `${(coordinates.y) - offset.y}px`,
			// (250 - 15) = 235
			left: `${(coordinates.x) - offset.x}px`,
			width: '100px',
			height: '100px',
			backgroundColor: 'darkgrey',
			cursor: 'grabbing',
			opacity: '1',
			color: 'white',
			fontFamily: 'monospace'
		})
		
	}, [coordinates])
	
	/*
	useEffect(() => {
		setboxCopyStyle({
			position: 'absolute',
			top: `0px`,
			// (250 - 15) = 235
			left: `${(coordinates.x - relativeOrigo.x) - offset.x}px`,
			width: '100px',
			height: '100px',
			backgroundColor: 'darkgrey',
			cursor: 'grabbing'
		})
		
	}, [coordinates])
	*/
	
	function handleDragStart() {
		console.log('Dragging started!')
		setDragging(true)
	}
	
	function handleDragEnd(e) {
		e.preventDefault()
		console.log('Dragging ended!')
		setDragging(false)
		setOffset({
			x: 0,
			y: 0
		})
	}
	
	function handleDrag(event) {
		setCoordinates({
			x: event.clientX,
			y: event.clientY,
		});
		event.preventDefault()
		console.log("X: " + event.clientX + " | Y: " + event.clientY)
	}
	
		
	function handleMouseMove(event) {
		setOffset({
			x: event.clientX - event.target.offsetLeft,
			y: event.clientY - event.target.offsetTop
		})
		setRelativeOrigo({x: event.target.offsetLeft, y: event.target.offsetTop})
	}
	
	function handleMouseDown(event) {
		setClicked(true)
		if (!dragging) {
			setDragging(true)
		}
		
	}
	
	function handleMouseUp(event) {
		setClicked(false)
		if (dragging) {
			setDragging(false)			
		}
		setOffset({
			x: 0,
			y: 0
		})
	}
	
	return (
		<>
			<button
				className={!dragging ? styles.draggableBox : styles.invisible}
				style={dragging ? boxStyle : null}
				draggable={true}
				onDragStart={handleDragStart}
				onDragEnd={handleDragEnd}
				onDrag={handleDrag}
				onMouseMove={!dragging ? handleMouseMove : null}
				//onMouseMove={!clicked ? handleMouseMove : null}
				onMouseDown={handleMouseDown}
				onMouseUp={handleMouseUp}
			>
				I am a draggable box
			</button>
			{dragging && (
				<button
					className={dragging ? styles.draggableBoxCopy : styles.invisible}
					style={dragging ? boxCopyStyle : null}
					onMouseUp={handleMouseUp}
				>
					I am just a copy
				</button>
			)}
		</>
	)
}

export default DraggableBox;