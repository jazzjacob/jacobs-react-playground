import Box from './Box'

const EmptyBox = () => {
	const style = {
		width: '100px',
		height: '100px',
		backgroundColor: 'lightgray'
	}
	
	return (
		<div style={style}>
			
		</div>
	)
}

const DraggableBoxesContainer = () => {
	const onClick = () => {
		console.log('Clicked!')
	}
	
	const boxes = [{box: true} , {box: false}]
	
	
	const containerStyle = {
		backgroundColor: 'white',
		color: 'black',
		padding: '1rem',
		marginTop: '1rem',
		width: 'fit-content',
		fontFamily: 'monospace'
	}
	
	const containerHeader = {
		fontSize: '1rem',
		fontWeight: 'normal'
	}
	
	const draggableBoxes = {
		display: 'flex',
		gap: '12px'
	}
	
	return (
		<div style={containerStyle}>
			<h2 style={containerHeader}>I am DraggableBoxContainer</h2>
			<div style={draggableBoxes}>
				{boxes.map((boxData, index) => boxData.box ? <Box key={index} /> : <EmptyBox key={index} />)}
			</div>
		</div>
	)
}

export default DraggableBoxesContainer