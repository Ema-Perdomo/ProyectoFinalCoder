import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemList from '../ItemList/ItemList';

const ItemListContainer = ({ greeting }) => {

  const [item, setItem] = useState([])
  //Usa id para enrutamiento y filtrado
  const { id } = useParams();

  useEffect(() => {
    fetch('http://localhost:8080/api/products')
      .then(response => response.json())
      .then(data => setItem(data))
  }, [])
  
  return (
    <div>
      <h3 className='d-flex justify-content-center mt-2'>{greeting}</h3>
      <div>
        <ItemList item={item} />
      </div>
      <hr />
    </div>
  )
}

export default ItemListContainer
