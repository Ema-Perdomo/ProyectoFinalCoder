import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, collection, getDocs, where, query } from 'firebase/firestore';
import ItemList from '../ItemList/ItemList';

const ItemListContainer = ({ greeting }) => {

  const [item, setItem] = useState([])
  //Usa id para enrutamiento y filtrado
  const { id } = useParams();

  useEffect(() => {
    const queryDb = getFirestore();
    const queryCollection = collection(queryDb, 'item');

    if (id) {
      //traigo
      const queryFilter = query(queryCollection, where('categoria', '==', id));
      getDocs(queryFilter).then((response) =>
        setItem(response.docs.map((p) => ({ id: p.id, ...p.data() })))
      );
    }else {
  getDocs(queryCollection).then((response) =>
    setItem(response.docs.map((p)=>({ id: p.id, ...p.data() })))
    );
}
  }, [id])

return (
  <div>
    <h3 className='d-flex justify-content-center mt-2'>{greeting}</h3>
    <div>
      <ItemList item={item} />
    </div>
    <hr/>
  </div>
)
}

export default ItemListContainer
