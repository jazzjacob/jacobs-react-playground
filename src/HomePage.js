import { useState } from 'react'

import Box from './Components/Box'
import MousePosition from './Components/MousePosition'
import Column from './Components/Column'

const HomePage = () => {	
	const [columns, setColumns] = useState([1, 2, 3, 4, 5, 6, 7])
	
	function onColumnClick(index) {
		// Move value in array one step to the left
		let columnsCopy = [...columns]
		let startValue = columns[index]
		let valueAtNewIndex = columns[index + 1]
		columnsCopy[index] = valueAtNewIndex
		columnsCopy[index + 1] = startValue
		setColumns(columnsCopy)
		
		console.log(columnsCopy)
		
	}
	
	const columnsList = columns.map((item, index) => {
		return <Column onClick={() => onColumnClick(index)} key={index} number={item} />
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
			<Box />
			<MousePosition />
			<div className='columnsParent' style={columnsParentStyle}>
				{columnsList}
			</div>
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