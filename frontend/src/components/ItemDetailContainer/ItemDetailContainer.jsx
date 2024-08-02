import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetail from '../ItemDetail/ItemDetail';

const ItemDetailContainer = () => {

    const [item, setItem] = useState([])
    //Usa pid (product id dentro de mongo y backend) para enrutamiento y filtrado
    const { pid } = useParams();

    useEffect(() => {
        fetch(`http://localhost:8080/api/products/${pid}`)
            .then(response => response.json())
            .then(data => setItem(data))
        // useEffect(() => { TODO: Aca hago un fetch al current para saber el rol del user
        //  fetch() 

        // })

    }, [pid]) //id indica cuantas veces se ejecutas la logica dentro del componente

    return (
        <div>
            <div>
                <ItemDetail item={item} />
            </div>
        </div>
    )
}

export default ItemDetailContainer
