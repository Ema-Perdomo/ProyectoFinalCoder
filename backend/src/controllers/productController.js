//Movemos la lógica de las rutas a un controlador
import productModel from "../models/products.js"
export const getProducts = async (req, res) => { //ordQuery: orden del query
    try {
        const { limit, page, filter, ord } = req.query
        let metFilter
        const pag = page !== undefined ? page : 1
        const lim = limit !== undefined ? limit : 10
        if (filter == "true" || filter == "false") {
            metFilter = "status"
        } else {
            if (filter !== undefined) {
                metFilter = "category"
            }
        }
        const query = metFilter ? { [metFilter]: filter } : {}
        const ordQuery = ord !== undefined ? { price: ord } : {}
        const prods = await productModel.paginate(query, { limit: lim, page: pag, sort: ordQuery }); //Lim esd el limite de productos por pagina
        const prodsJSON = prods.docs.map(prod => prod.toJSON())
        res.send(prodsJSON)
    } catch (error) {
        res.status(500).send(`Error interno del servidor al consultar productos: ${error}`)
    }
}

export const getProduct = async (req, res) => {
    try {
        const idProducto = req.params.idProd
        const prod = await productModel.findById(idProducto)
        if (prod)
            res.status(200).send(prod)
        else
            res.status(404).send("Producto inexistente.")
    } catch (error) {
        res.status(500).send(`Error interno del servidor al consultar producto: ${error}`)
    }
}

export const createProduct = async (req, res) => {

    try {
        const product = req.body
        const mensaje = await productModel.create(product)
        res.status(201).send('Producto creado correctamente')
        return mensaje //WARNING: No se si va aca o con el .send
    } catch (error) {
        res.status(500).send(`Error interno del servidor al crear producto: ${error}`)
    }
}

export const updateProduct = async (req, res) => {
    try {
        if (req.user.role == 'Admin') {
            const idProducto = req.params.idProd
            const upProduct = req.body                                  //Consulto body
            const mensaje = await productModel.findByIdAndUpdate(idProducto, upProduct)
            res.status(200).send(mensaje)
            //return mensaje
        } else {
            res.status(403).send('Usuario no autorizado')
        }
    } catch (error) {
        res.status(500).send(`Error interno del servidor al actualizar producto: ${error}`)
    }
}

export const deleteProduct = async (req, res) => {
    try {
        if (req.user.role == 'Admin') {
            const idProducto = req.params.idProd
            const mensaje = await productModel.findByIdAndDelete(idProducto)
            res.status(200).send(mensaje)
            //return mensaje 
        } else {
            res.status(403).send('Usuario no autorizado')
        }
    } catch (error) {
        res.status(500).send(`Error interno del servidor al eliminar el producto: ${error}`)
    }
}