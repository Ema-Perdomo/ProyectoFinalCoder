import React from "react"
import { Link } from 'react-router-dom'


//Card Producto
const Item = ({ item }) => {
    return (
        <Link to={'/item/' + item._id} className='text-decoration-none' >
            <div className='card '>
                <div className="d-flex justify-content-center align-items-center">
                    <img src={item.thumbnail} className='card-img-top w-auto' alt={item.title} style={{ maxHeight: 20 + 'rem', width: 'auto' }} />
                </div>
                <div className='card-body text-center'>
                    <p children='card-text'>{item.title}</p>
                </div>
            </div>
        </Link>
    )
};

export default Item
