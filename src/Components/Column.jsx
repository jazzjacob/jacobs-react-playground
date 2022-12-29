import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import styles from './Column.module.css'

const Column = forwardRef((props, ref) => {
	useImperativeHandle(ref, () => ({
		onScroll: (event) => {
		 // Get the event from parent
		 console.log('parent scrollz')
		 updateRectangleCoordinates()
		 setWord("Yo")
		}
	}));
	 
	const [coords, setCoords] = useState({x: 0, y: 0});
	const [rectangleCoordinates, setRectangleCoordinates] = useState({top: 0, right: 0, bottom: 0, left: 0})
	const [word, setWord] = useState("Hello")
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
	
	const columnRef = useRef()
	
	useEffect(() => {
		//console.log(props.index)
		//console.dir(columnRef)
		setCoords({x: columnRef.current.offsetLeft})
		updateRectangleCoordinates()
	}, [])
	
	useEffect(() => {
		const elementRect = columnRef.current.getBoundingClientRect()
		console.dir(elementRect)
		
		const handleWindowScroll = event => {
			console.log('window scrolls')
		};
		
		window.addEventListener('scroll', handleWindowScroll);
	
		return () => {
			window.removeEventListener('scroll', handleWindowScroll);
		};
	}, []);
	
	function updateRectangleCoordinates() {
		const elementRect = columnRef.current.getBoundingClientRect()
		
		setRectangleCoordinates({
			top: elementRect.top,
			right: elementRect.right,
			bottom: elementRect.bottom,
			left: elementRect.left
		})
	}
	
	/*
	useEffect(() => {
		const handleParentScroll = event => {
			console.log('parent scrolls')
		};
		
		columnRef.parentNode.addEventListener('scroll', handleParentScroll);
	
		return () => {
			columnRef.parentNode.removeEventListener('scroll', handleParentScroll);
		};
	}, []);
	*/
	
	useEffect(() => {
		//console.log('Hello there')
		//console.log(props.scrolling)
		setCoords({x: columnRef.current.offsetLeft})
		//console.log(columnRef.current.offsetLeft)
	}, [props.scrolling])
	
	function handleScroll() {
		console.log('Scrolling!!!')
		console.log(columnRef)
		setCoords({x: columnRef.current.offsetLeft});
	}
	
	return (
		<div
			onScroll={() => handleScroll}
			ref={columnRef}
			style={style}
			className={styles.column}
			onMouseOver={props.onMouseEnter}
			onClick={props.onClick}
		>
			{props.number}
			<p>---{rectangleCoordinates.left}</p>
			<p>_{word}</p>
		</div>
	)
})

export default Column