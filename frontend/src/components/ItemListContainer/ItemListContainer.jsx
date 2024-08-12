import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemList from '../ItemList/ItemList';

const ItemListContainer = ({ greeting }) => {

  const [item, setItem] = useState([])
  //Usa id para enrutamiento y filtrado
  const { category } = useParams();

  useEffect(() => {
    const actualizarProds = async () => {

      try {
        //Filtro segun categorias
        if (category) { //si hay id en la ruta de react(http://localhost:5173/categoria/Suplementos)
          // suplementos seria la id. Eso se ve en la ruta desde app.jsx
          await fetch(`http://localhost:8080/api/products/?filter=${category}`)
            .then(response => response.json()) //convierte la respuesta en json
            .then(data => setItem(data))       //setea el item  con la data que es response en json, lo pushea al array de useState
        }
        else {
          await fetch('http://localhost:8080/api/products')
            .then(response => response.json())
            .then(data => setItem(data))
        }

      } catch (error) {
        console.log('Error interno del servidor al actualizar producto:', error)
      }
    }
    actualizarProds() //Asi actualizo la lista de productos cada vez que hago un cambio,
  }, [category]); //[] si el useEffect falla




  return (
  <div>

     {/* Añadir producto es solo para el admin */}
            {/* {user.role === 'Admin' ?
              <Link to="/CrearProducto" className='text-decoration-none m-3 text-light '>Añadir producto</Link>
              : null} */}
  {/* <Button type="button" onClick={"/CrearProducto"} >Añadir producto</Button> */}
              

    <h3 className='d-flex justify-content-center mt-2'>{greeting}</h3>
    <div>
      <ItemList item={item} />
    </div>
    <hr />
  </div>
  )
}

export default ItemListContainer