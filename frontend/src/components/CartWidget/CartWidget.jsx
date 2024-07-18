import { TbGardenCart } from "react-icons/tb";
import { useCartContext } from "../context/CartContext";

const CartWidget = () => {
  const {totalProducts} = useCartContext();
  return (
    <div>
      <i><TbGardenCart /></i>
      <span className="qty-display">{totalProducts()}</span>
    </div>
  )
}

export default CartWidget

//Otra opcion de cart
// import { FaOpencart } from "react-icons/fa";
// <FaOpencart />