import { useState, useEffect } from 'react'
import styles from './Box.module.css'

const Box = () => {
	const [clicked, setClicked] = useState(false)
	const [coordinates, setCoordinates] = useState({x: 0, y: 0})
	const [hoverState, setHoverState] = useState(null)
	
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
	
	
	const [boxStyle, setBoxStyle] = useState({
		position: 'absolute',
		top: `${coordinates.y}px`,
		left: `${coordinates.x}px`,
		width: '100px',
		height: '100px',
		backgroundColor: 'gold'
	})

	
	useEffect(() => {
		setBoxStyle({
			position: 'absolute',
			top: `${coordinates.y}px`,
			left: `${coordinates.x}px`,
			width: '100px',
			height: '100px',
			backgroundColor: 'gold'
		})
		
		if (25 < coordinates.x < 225) {
			setHoverState(0)
		}
		
	}, [coordinates])
	
	
	
	return (
		<div
			style={clicked ? boxStyle : altBoxStyle }
			className={styles.box}
			onClick={() => {
				setClicked(!clicked)
				console.log('Clicked!')
			}}>
		</div>
	)
}


const altBoxStyle = {
	width: '100px',
	height: '100px',
	backgroundColor: 'red'
}



export default Box;