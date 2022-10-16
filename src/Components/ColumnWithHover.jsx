import { useState, useEffect } from 'react'
import styles from './Column.module.css'

const Column = (props) => {
	const [coords, setCoords] = useState({x: 0, y: 0});
	const [style, setStyle] = useState({
		width: '200px',
		flex: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100px',
		borderRadius: '12px'
	})
	
	const [xHover, setXHover] = useState(false);
	
	useEffect(() => {
		console.log(props.index)
	}, [])
	
	useEffect(() => {
		const handleWindowMouseMove = event => {
			setCoords({
				x: event.clientX,
				y: event.clientY,
			});
		};
		
		window.addEventListener('mousemove', handleWindowMouseMove)
	
		return () => {
			window.removeEventListener('mousemove', handleWindowMouseMove)
		};
	}, []);
	
	const xHoverStyle = {
		width: '200px',
		flex: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100px',
		borderRadius: '12px',
		backgroundColor: 'pink'
	}
	
	let number = props.number
	if (!number) {
		number = 1
	}
	
	useEffect(() => {
		if (props.index == 0) {
			if ((20 < coords.x) && (coords.x < 200)) {
				setXHover(true)
			} else {
				setXHover(false)
			}
		} else {
			setXHover(false)
		}
	}, [coords])
	
	// style={!((20 < coords.x) && (coords.x < 200) && props.index == 0) ? style : xHoverStyle}
	return (
		<div style={!xHover ? style : xHoverStyle} className={styles.column} onClick={props.onClick}>
			{number}
		</div>
	)
}

export default Column