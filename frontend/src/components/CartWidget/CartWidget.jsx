import { TbGardenCart } from "react-icons/tb";
import { useCartContext } from "../context/CartContext";

const CartWidget = () => {
  const {totalProducts} = useCartContext();
  return (
    <div>
      <i ><TbGardenCart  size={30} /></i>
      <span className="qty-display fw-bolder h5 text-danger">{totalProducts()}</span>
    </div>
  )
}

export default CartWidget

//Otra opcion de cart
// import { FaOpencart } from "react-icons/fa";
// <FaOpencart />