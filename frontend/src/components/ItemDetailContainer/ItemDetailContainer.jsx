import {useState,useEffect} from 'react';
import {useParams} from 'react-router-dom';
import ItemDetail from '../ItemDetail/ItemDetail';
import {getFirestore, doc, getDoc} from 'firebase/firestore';

const ItemDetailContainer = () => {

    const [item, setItem] = useState([])
    //Usa id para enrutamiento y filtrado
    const { id } = useParams();

    useEffect(() => {
        const queryDb = getFirestore();
        const queryDoc = doc(queryDb, 'item', id);
        getDoc(queryDoc).then((response)=>
        setItem({id: response.id, ...response.data() })
        )
      }, [id]) //id indica cuantas veces se ejecutas la logica dentro del componente

    return (
        <div>
            <div>
                <ItemDetail item={item} />
            </div>
        </div>
    )
}

export default ItemDetailContainer
