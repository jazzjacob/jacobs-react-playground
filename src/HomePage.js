import Box from './Components/Box'
import MousePosition from './Components/MousePosition'

const HomePage = () => {
	return (
		<div style={style}>
			<Box />
			<MousePosition />
		</div>
	)
}

const style = {
	padding: '0',
	margin: '0',
	width: '100%',
	height: '100vh',
	color: 'gold'
}

export default HomePage