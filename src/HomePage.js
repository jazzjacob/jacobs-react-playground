import Box from './Components/Box'
import MousePosition from './Components/MousePosition'
import Column from './Components/Column'

const HomePage = () => {
	const columns = [1, 1, 1, 1, 1, 1, 1]
	const columnsList = columns.map((item, index) => {
		return <Column key={index} />
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