import DraggableBox from './DraggableBox'

const NewDraggableBoxContainer = () => {
	const style = {
		padding: "10px",
		backgroundColor: "white"
	}
	
	function handleDragOver(e) {
		e.preventDefault()
	}
	
	return (
		<div
			style={style}
			onDragOver={handleDragOver}
		>
			<DraggableBox />
		</div>
	)
}

export default NewDraggableBoxContainer