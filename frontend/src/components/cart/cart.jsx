import React from 'react';
import { Link } from 'react-router-dom';
import { useCartContext } from '../context/CartContext';
import ItemCart from '../ItemCart/ItemCart';
// import { getFirestore, collection, addDoc } from 'firebase/firestore';



const cart = () => {
  const { cart, totalPrice } = useCartContext();



  const insertProductCart = async (pid, quantity) => { //Agregar producto al carrito
  }
  const deleteProductFromCart = async (pid) => { //Eliminar producto del carrito
  }
  const createTicket = async () => {

  }


  //   const orden = {
  //     buyer:{
  //       name:'Jhon Doe',
  //       email:'jd@gmail.com',
  //       phone:'098765432',
  //       adress:'Calle Repecho 123.'
  //     },
  //     items: cart.map((item)=>({
  //       id: item.id,
  //       nombre: item.nombre,
  //       precio: item.precio,
  //       quantity: item.quantity,
  //     })),
  //     total: totalPrice(),
  //   }
  // //De mi coleccion orders agregalo como documento, agregale la order y dame el id de la orden
  //   const handleClick = () =>{
  //     const db = getFirestore();
  //     const ordersCollection = collection(db, "ordenes");
  //     addDoc(ordersCollection, orden).then(({id}) => console.log(id))
  //   }

  if (cart.length === 0) {
    return (
      <div>
        <p>El carrito esta vacío</p>
        <Link to="/">Continuar comprando.</Link>
      </div>
    );
  }

  // <button onClick={handleClick} className='btn'>Finalizar Compra </button>
  return (
    <div>
      {cart.map((item) => (
        <ItemCart key={item.id} item={item} />
      ))}
      <p>Total U$D {totalPrice()}</p>

      <Link to="/checkout">
        {' '}
        <button className="btn-total">Finalizar Compra</button>

      </Link>
    </div>
  );
};

export default cart;
