import styles from './Column.module.css'

const Column = (props) => {
	let number = props.number
	if (!number) {
		number = 1
	}
		
	const style = {
		width: '200px',
		flex: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100px',
		borderRadius: '12px'
	}
	return (
		<div style={style} className={styles.column} onClick={props.onClick}>
			{number}
		</div>
	)
}

export default Column