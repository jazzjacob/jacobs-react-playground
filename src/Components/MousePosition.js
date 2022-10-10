import {useEffect, useState} from 'react';

export default function App() {
	const [coords, setCoords] = useState({x: 0, y: 0});

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

	return (
		<div>
			<h2>
				Coordinates: X: {coords.x} - Y: {coords.y}
			</h2>
		</div>
	);
}