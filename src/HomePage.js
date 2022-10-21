import { useState, useEffect } from 'react'

import Box from './Components/Box'
import MousePosition from './Components/MousePosition'
import Column from './Components/Column'
import DraggableBoxesContainer from './Components/DraggableBoxesContainer'

const HomePage = () => {	
	const [columns, setColumns] = useState([1, 2, 3, 4, 5, 6, 7])
	const [coordinates, setCoordinates] = useState({x: 0, y: 0})
	const [testClicked, setTestClicked] = useState(false)
	
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

	
	const columnsList = columns.map((item, index) => {
		
		return <Column index={index} xHover={(coordinates.x > 300)} onClick={() => onColumnClick(index)} key={index} number={item} coordinates={coordinates} />
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
	
	return (
		<div style={style}>
			<MousePosition />
			{testClicked && <p>Clicked!</p>}
			<div className='columnsParent' style={columnsParentStyle}>
				{columnsList}
			</div>
			<Box />
			<DraggableBoxesContainer />
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