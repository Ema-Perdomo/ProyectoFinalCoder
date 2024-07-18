import { Router } from 'express';
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js'

const productsRouter = Router()

productsRouter.get('/', getProducts); //VAN ASI PORQUE YA ESTAN IMPORTADOS EN EL CONTROLADOR
productsRouter.get('/:idProd', getProduct); // sin getProduct(idProducto), ya que en el controlador lo recibe como parametro desde el req.params.idProd
productsRouter.post('/', createProduct)
productsRouter.put('/:idProd', updateProduct)
productsRouter.delete('/:idProd', deleteProduct)

export default productsRouter