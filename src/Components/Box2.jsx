import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import styles from './Box2.module.css'

const Box2 = forwardRef((props, ref) => {
	useImperativeHandle(ref, () => ({
		onScroll: (event) => {
		 // Get the event from parent
		 console.log('parent scrollz')
		 updateRectangleCoordinates()
		 setWord("Yo")
		}
	}));
	
	const [clicked, setClicked] = useState(false)
	const [coordinates, setCoordinates] = useState({x: 0, y: 0})
	const [offset, setOffset] = useState({x: 0, y: 0})
	const [hoverState, setHoverState] = useState(null)
	const [relativeCoordinates, setRelativeCoordinates] = useState({x: 0, y: 0})
	const [relativeOrigo, setRelativeOrigo] = useState([null])
	const [active, setActive] = useState(false)
	const [coords, setCoords] = useState({x: 0, y: 0});
	const [rectangleCoordinates, setRectangleCoordinates] = useState({top: 0, right: 0, bottom: 0, left: 0})
	const [word, setWord] = useState("Hello")
	const [dragOver, setDragOver] = useState(false)
	const [xHover, setXHover] = useState(false);
	const [style, setStyle] = useState({
		width: '200px',
		flex: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100px',
		borderRadius: '12px',
		color: 'white'
	})
	const [boxStyle, setBoxStyle] = useState({
		position: 'absolute',
		top: `${coordinates.y - offset.y}px`,
		left: `${coordinates.x - offset.x}px`,
		width: '100px',
		height: '100px',
		backgroundColor: 'darkgray',
		cursor: 'grabbing'
	})
	
	const columnRef = useRef()
	
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
		setCoords({x: columnRef.current.offsetLeft})
		updateRectangleCoordinates()
		
		const elementRect = columnRef.current.getBoundingClientRect()
		//console.dir(elementRect)
		
		const handleWindowScroll = event => {
			//console.log('window scrolls')
		};
		
		window.addEventListener('scroll', handleWindowScroll);
	
		return () => {
			window.removeEventListener('scroll', handleWindowScroll);
		};
	}, []);
	
	useEffect(() => {
		setCoords({x: columnRef.current.offsetLeft})
	}, [props.scrolling])
	
	useEffect(() => {
		const mouseOverX = coordinates.x >= rectangleCoordinates.left && rectangleCoordinates.right >= coordinates.x;
		//console.log(rectangleCoordinates.left)
		//console.log('YOOOO')
		const mouseOverY = rectangleCoordinates.bottom >= coordinates.y && coordinates.y >= rectangleCoordinates.top;
		const mouseOverColumn = mouseOverX && mouseOverY
		
		// Handle weird "bug"
		if (coordinates.x == 0 && coordinates.y == 0) {
			return
		}
		
		/*if (!props.dragging) {
			return;
		}*/
		if (mouseOverColumn) {
			//console.log('MOUSE OVER BOX')
			if (!dragOver && props.dragging) {
				setDragOver(true)
				props.handleDragOver(props.index)
			}
		} else {
			if (dragOver) {
				setDragOver(false)
				props.handleDragOver(null)
			}
		}
	}, [coordinates])
	
	useEffect(() => {
		setBoxStyle({
			position: 'absolute',
			top: `${(coordinates.y - relativeOrigo.y) - offset.y}px`,
			top: `${coordinates.y - offset.y}px`,
			// (250 - 15) = 235
			left: `${(coordinates.x - relativeOrigo.x) - offset.x}px`,
			left: `${coordinates.x - offset.x}px`,
			width: '100px',
			height: '100px',
			backgroundColor: 'darkgray',
			cursor: 'grabbing',
			color: 'white',
			zIndex: '2'
		})
		
	}, [coordinates])
	
	useEffect(() => {
		if (dragOver && !props.dragging) {
			setDragOver(false)
		}
	}, [props.dragging])
	
	function onMouseMove(event) {
		//console.log(event)
		setOffset({
			x: event.clientX - event.target.offsetLeft,
			y: event.clientY - event.target.offsetTop
		})
		setRelativeOrigo({x: event.target.offsetLeft, y: event.target.offsetTop})
	}
	
	function onMouseDown(event) {
		setClicked(true)
		props.handleDrag(event, true, props.index)
	}
	
	function onMouseUp(event) {
		setClicked(false)
		/*setOffset({
			x: 0,
			y: 0
		})*/
		props.handleDrag(false, props.index)
	}
	
	function updateRectangleCoordinates() {
		const elementRect = columnRef.current.getBoundingClientRect()
		
		setRectangleCoordinates({
			top: elementRect.top,
			right: elementRect.right,
			bottom: elementRect.bottom,
			left: elementRect.left
		})
	}
	
	function handleScroll() {
		setCoords({x: columnRef.current.offsetLeft});
	}
	
	const altBoxStyle = {
		width: '100px',
		height: '100px',
		backgroundColor: 'blue',
		color: 'white'
	}
	
	function handleMouseOver() {
		setActive(true)
	}
	
	function handleMouseLeave() {
		setActive(false)
	}
	
	return (
		<>
			<button
				style={clicked ? boxStyle : altBoxStyle }
				onMouseDown={onMouseDown}
				onMouseUp={onMouseUp}
				onMouseMove={!clicked ? onMouseMove : null}
				
				onScroll={() => handleScroll}
				ref={columnRef}
				//style={style}
				className={styles.column}
				onMouseOver={() => {
					handleMouseOver()
					props.onMouseEnter()
				}}
				onMouseLeave={handleMouseLeave}
				//onClick={() => props.onClick}
			>
				{props.number}
				<p>_{rectangleCoordinates.left}_{rectangleCoordinates.right}</p>
				{dragOver && <p>DRAG OVER</p>}
				{active && <p>active</p>}
				{!active && props.dragging && (
					<p>dragging</p>
				)}
			</button>
			{active && props.dragging && false && (
				<div
					style={{
						height: '100px',
						width: '100px',
						backgroundColor: 'red'
					}}>
				</div>			
			)}
		</>
	)
})

export default Box2