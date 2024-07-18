//contador (Componentes II)
import React, {useEffect, useState} from 'react';   

const ItemCount = ({ initial, stock, onAdd }) => {
	const [count, setCount] = useState(parseInt(initial));
	const restar = () => {
		setCount(count - 1);
	};

	const sumar = () => {
		setCount(count + 1);
	};

	useEffect(() => {
		setCount(parseInt(initial));
	}, [initial]);

	return (
		<div className="counter">
			<button disabled={count <= 1} onClick={restar} className="btn btn-danger operacion">
				-
			</button>
			<span>{count}</span>
			<button disabled={count >= stock} onClick={sumar} className="btn btn-success operacion">
				+
			</button>
			
			<div>
				<button disabled={stock <= 0} onClick={() => onAdd(count)} className="btn btn-primary operacion">
					Agregar al carrito
				</button>
			</div>
		</div>
	);
};

export default ItemCount;
