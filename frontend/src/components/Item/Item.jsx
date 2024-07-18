import React from "react"
import { Link } from 'react-router-dom' 


//Card Producto
const Item = ({item}) => {
    return (
        
        <Link to={'/item/' + item.id} className='text-decoration-none' > 
            <div className='card '>
                <div className="d-flex justify-content-center align-items-center">
                    <img src={item.imagen} className='card-img-top w-auto' alt={item.nombre} style={{maxHeight: 20 + 'rem', width: 'auto'}} />
                </div>                
                <div className='card-body text-center'>
                    <p children='card-text'>{item.nombre}</p>
                </div>
            </div>
        </Link>
)
};

export default Item
