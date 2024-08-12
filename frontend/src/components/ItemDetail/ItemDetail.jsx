import React, { useEffect, useState } from 'react';
import ItemCount from '../ItemCount/ItemCount';
import { Link } from 'react-router-dom';
import { useCartContext } from '../context/CartContext';
import { Route } from 'react-router-dom';
import { userModel } from '../../../../backend/src/models/user';
import { useUserContext } from '../UserContext/UserContext';
// import DeleteProduct from '../DeleteProduct/DeleteProduct'; 

//Descripcion clickeable del producto
const ItemDetail = ({ item }) => {

  //TODO: <Lo sig no se si iria
  const [goToCart, setGoToCart] = useState(false);
  const { user } = useUserContext();
  const { addProduct } = useCartContext()
  const onAdd = (cantidad) => {
    setGoToCart(true);
    addProduct(item, cantidad);
    item.stock = item.stock - cantidad;
  }

  const deleteProduct = async () => {
      {userModel.role === "admin" ? console.log("es admin") : console.log("no es admin")} //TODO: Hacer que habilite o no la edicion de productos segun rol
      fetch(`http://localhost:8080/api/products/${item._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${localStorage.getItem('authToken')}` //TODO: Verificar si esto es correcto, creo que no va con bearer 
      }
    })
    .then(res => res.json())
    .then(data => alert("Se elemino el producto " + data.title))
  }
  

  return (
    <div className>
      <div className='col-md-4 offset-md-4 '>
        <img src={item.thumbnail} className='img-fluid' alt={item.title} />
        <h2>{item.title}</h2>
        <p>{item.description}</p>
        <p> U$D {item.price}</p>
        <p> Cantidad: {item.stock}</p>
        {/* <p> eSTOY ACA</p> */}
      </div>
      <div>
        {goToCart ? <Link to='/cart'>Terminar compra</Link> : <ItemCount stock={item.stock} initial={1} onAdd={onAdd} />}
      </div>

      <div>
        <Link to={`/updateProduct/${item._id}`}> <button type="button">Update </button> </Link>
      </div>
      <div>
        <input className="btn btn-danger" type="button" value="Delete" onClick={deleteProduct} />
      </div>



      {/* <div>
        {role === 'Admin' ?
              <Route path={'/updateProducto'} element={<CrearProduct greeting='Actualizar producto' />} />
              : null
            }
      </div> */}

    </div>
  )
}

export default ItemDetail


