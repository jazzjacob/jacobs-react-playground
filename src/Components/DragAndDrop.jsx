import { useState, useEffect, useRef } from 'react'

import styles from './DragAndDrop.module.css'

import Column from './Column'
import DraggableWithPlaceholderBehind from './DraggableWithPlaceholderBehind'
import Box2 from './Box2'
import BoxCopy from './BoxCopy'

const DragAndDrop = (props) => {
	const [boxes, setBoxes] = useState(
		[
			{ number: 1, dragging: false },
			{ number: 2, dragging: false},
			{ number: 3, dragging: false}
		]
	)
	const [dragging, setDragging] = useState(false)
	const [coordinates, setCoordinates] = useState({x: 0, y: 0})
	const [draggingStartIndex, setDraggingStartIndex] = useState(null)
	const [currentDraggingIndex, setCurrentDraggingIndex] = useState(null)
	const [dragOverNumber, setDragOverNumber] = useState(null)
	const [draggingBoxData, setDraggingBoxData] = useState(null)
	const [once, setOnce] = useState(false)
	const [offset, setOffset] = useState({x: 0, y: 0})
	const [boxList, setBoxlist] = useState(boxes.map((item, index) => {
		return (
			<Box2
				dragging={dragging}
				handleDrag={handleDrag}
				handleDragOver={(index) => handleDragOver(index)}
				index={index}
				onMouseEnter={() => {}}
				onClick={(event, index) => onBoxClick(event, index)}
				key={index}
				number={item.number}
				coordinates={props.coordinates}
				ref={(node) => {
					const map = getMap();
					if (node) {
						map.set(index, node);
					} else {
						map.delete(index);
					}
				}}
			/>
		)
	}))
	
	const childrenRef = useRef(null)
	
	let ONCE = false

	useEffect(() => {
		if (!props.dragging) {
			returnToArray()
		}
	}, [props.dragging])
	
	useEffect(() => {
		setBoxlist(boxes.map((item, index) => {
			if (item.dragging) {
				return (
					<div
						style={{
							height: '100px',
							width: '100px'
						}}
						className={styles.placeholder}
						onClick={returnToArray}
					>
					</div>
				)
			} else {
				return (
					<Box2
						dragging={dragging}
						handleDrag={handleDrag}
						handleDragOver={(index) => handleDragOver(index)}
						index={index}
						onMouseEnter={() => {}}
						onMouseDown={(event, index) => onBoxClick(event, index)}
						onClick={(event, index) => onBoxClick(event, index)}
						key={index}
						number={item.number}
						coordinates={props.coordinates}
						ref={(node) => {
							const map = getMap();
							if (node) {
								map.set(index, node);
							} else {
								map.delete(index);
							}
						}}
					/>
				)
			}
		}))
	}, [boxes])
	
	/*useEffect(() => {
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
	}, []);*/
	
	useEffect(() => {
		setCoordinates(coordinates)
		//console.log('YO')
	}, [props.coordinates])
	
	
	
	useEffect(() => {
		//console.log(boxes)
	}, [boxes])
	
	function getMap() {
		//console.log('getting map')
		if (!childrenRef.current) {
			// Initialize the Map on first usage.
			childrenRef.current = new Map();
		}
		return childrenRef.current;
	}
	
	useEffect(() => console.log('HERE IS ONCE: ' + once), [once]) 
	
	function handleDrag(event, dragging, index) {
		props.setDragging(true)
		console.log('offset x:')
		console.log(event.clientX - event.target.offsetLeft)
		console.log('offset y:')
		console.log(event.clientY - event.target.offsetTop)
		setDraggingBoxData(boxes[index])
		setOffset({
			x: event.clientX - event.target.offsetLeft,
			y: event.clientY - event.target.offsetTop
		})
		setDragging(dragging)
		setDraggingStartIndex(index)
		setCurrentDraggingIndex(index)
		if (dragging) {
			const boxesCopy = [...boxes]
			boxesCopy[index].dragging = true
			setBoxes(boxesCopy)
		} else {
			const boxesCopy = [...boxes]
			boxesCopy[index].dragging = false
			setBoxes(boxesCopy)	
		}
	}
	
	function handleDragOver(index) {
		//console.log('Setting once to false')
		//setOnce(false)
		//console.log('index: ' + index)
		//setCurrentDraggingIndex(index)
		if (index != null) {
			switchToIndex(index)
			console.log('handle drag over')			
		}
		/*
		setDragOverNumber(index)
		let boxesCopy = [...boxes]
		let dragOverValue = boxes[index]
		let dragValue = boxes[draggingStartIndex]
		boxesCopy[index] = dragValue
		boxesCopy[draggingStartIndex] = dragOverValue
		setBoxes(boxesCopy)
		*/
	}
	
	function onBoxEnter(index) {
		console.log(index)
	}
	
	function onBoxClick(event, index) {
		console.log(event)
		console.log('Hellooo')
		// Move value in array one step to the left
		let boxesCopy = [...boxes]
		let startValue = boxes[index]
		let valueAtNewIndex = boxes[index + 1]
		boxesCopy[index] = valueAtNewIndex
		boxesCopy[index + 1] = startValue
		setBoxes(boxesCopy)
	}
	
	
	function returnToArray() {
		props.setDragging(false)
		setDragging(false)
		console.log('returning')
		let boxesCopy = [...boxes]
		boxesCopy.map((item) => {
			item.dragging = false
		})
		setBoxes(boxesCopy)
	}
	
	function switchPlaces() {
		console.log('switching')
		console.log(draggingStartIndex)
		let boxesCopy = [...boxes]
		let startValue = boxes[currentDraggingIndex]
		if (currentDraggingIndex == boxes.length - 1) {
			let valueAtNewIndex = boxes[currentDraggingIndex - 1]
			boxesCopy[currentDraggingIndex] = valueAtNewIndex
			boxesCopy[currentDraggingIndex - 1] = startValue
			setCurrentDraggingIndex(currentDraggingIndex - 1)
			setBoxes(boxesCopy)		
		} else {
			let valueAtNewIndex = boxes[currentDraggingIndex + 1]
			boxesCopy[currentDraggingIndex] = valueAtNewIndex
			boxesCopy[currentDraggingIndex + 1] = startValue
			setCurrentDraggingIndex(currentDraggingIndex + 1)
			setBoxes(boxesCopy)		
		}
	}
	
	function switchToIndex(index) {
		
		if (index == null) {
			return
		}
		//console.log('switching to index ' + index)
		//console.log('current dragging index: ' + currentDraggingIndex)
		
		if (index == currentDraggingIndex) {
			return
		}
		
		/*
		if (once) {
			return
		}
		*/
		
		let boxesCopy = [...boxes]
		let startValue = boxes[currentDraggingIndex]
		let valueAtNewIndex = boxes[index]
		boxesCopy[currentDraggingIndex] = valueAtNewIndex
		boxesCopy[index] = startValue
		setBoxes(boxesCopy)
		setCurrentDraggingIndex(index)
		console.log('Setting once to true')
		setOnce(true)
	}
	
	return (
		<>
			<div className={styles.container}>
				<h3>I am DragAndDrop</h3>
				{false && <p>{draggingStartIndex}</p>}
				{dragging && <p>{dragOverNumber}</p>}
				{boxList}
				{props.dragging && <BoxCopy coordinates={props.coordinates} offset={offset} data={draggingBoxData.number} onMouseUp={returnToArray} />}
			</div>

			{props.dragging && (
				<>
					<p>{draggingBoxData.number}</p>
					<button onClick={switchPlaces}>switch places</button>
					<button onClick={returnToArray}>return to arrray</button>
					<button onClick={() => switchToIndex(0)}>switch with index 0</button>
					<button onClick={() => switchToIndex(1)}>switch with index 1</button>
					<button onClick={() => switchToIndex(2)}>switch with index 2</button>
				</>
			)}
		</>
	)
}

export default DragAndDrop