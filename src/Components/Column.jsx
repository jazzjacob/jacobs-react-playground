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
	
	return (
		<div style={style} className={styles.column} onClick={props.onClick}>
			{props.number}
		</div>
	)
}

export default Column