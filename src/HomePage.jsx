import { useState, useEffect, useRef } from 'react'

import Box from './Components/Box'
import MousePosition from './Components/MousePosition'
import Column from './Components/Column'
import DraggableBoxesContainer from './Components/DraggableBoxesContainer'
import NewDraggableBoxContainer from './Components/NewDraggableBoxContainer'
import DraggableBox from './Components/DraggableBox'

const HomePage = () => {	
	const [columns, setColumns] = useState([1, 2, 3, 4, 5, 6, 7])
	const [coordinates, setCoordinates] = useState({x: 0, y: 0})
	const [testClicked, setTestClicked] = useState(false)
	const [scrolling, setScrolling] = useState(0)
	const [dragging, setDragging] = useState(false)
	
	const childRef = useRef()
	const childRefs = useRef([])
	
	const childrenRef = useRef(null);
	
	function getMap() {
		//console.log('getting map')
		if (!childrenRef.current) {
			// Initialize the Map on first usage.
			childrenRef.current = new Map();
		}
		return childrenRef.current;
	}
	
	
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

		// console.log(coordinates)
	}, [coordinates])
	
	
	// Window click event listener 
	/*useEffect(() => {
		const handleWindowClick = event => {
			console.log(event)
			setTestClicked(!testClicked)
		}
		
		window.addEventListener('click', handleWindowClick)
		
		return () => window.removeEventListener('click', handleWindowClick)
	}, [testClicked])*/
	
	function onColumnClick(index) {
		// Move value in array one step to the left
		let columnsCopy = [...columns]
		let startValue = columns[index]
		let valueAtNewIndex = columns[index + 1]
		columnsCopy[index] = valueAtNewIndex
		columnsCopy[index + 1] = startValue
		setColumns(columnsCopy)	
	}
	
	function onColumnEnter(index) {
		console.log(index)
	}
	
	const columnsList = columns.map((item, index) => {
		return (
			<Column
				dragging={dragging}
				index={index}
				onMouseEnter={() => onColumnEnter(index)}
				onClick={() => onColumnClick(index)}
				key={index}
				number={item}
				coordinates={coordinates}
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
	})
	
	const columnsParentStyle = {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		gap: '12px',
		backgroundColor: 'blue',
		padding: '8px',
		overflowX: 'auto'
	}
	
	function handleScroll() {
		//console.log('Scrolling!!')
		const map = getMap();
		//console.log(map)
		for (let i = 0 ; i < columns.length ; i++) {
			const node = map.get(i)
			//console.log(node)
			//console.log('Hello')
			node.onScroll()
		}
		
		//childRef.current.onScroll();
	}
	
	function handleDragOver(e) {
		e.preventDefault()
	}
	
	function handleDrag(dragging) {
		setDragging(dragging)
	}
	
	
	return (
		<div style={style} onDragOver={handleDragOver}>
			<MousePosition />
			<h2>Dragging: {dragging ? 'true' : 'false'}</h2>
			{testClicked && <p>Clicked!</p>}
			<div
				onScroll={handleScroll}
				className='columnsParent'
				style={columnsParentStyle}
			>
				{columnsList}
			</div>
			<Box dragging={handleDrag} />
			<DraggableBoxesContainer />
			<NewDraggableBoxContainer />
		</div>
	)
}

const style = {
	padding: '0',
	margin: '0',
	width: '100%',
	height: '100vh',
	color: 'gold',
	overflow: 'hidden'
}

export default HomePage