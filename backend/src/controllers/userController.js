import { userModel } from '../models/user.js';

export const getUsers = async () => {
    try {
        //Consulto usuarios
        const users = await userModel.find()
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send("Error al consultar usuarios:", error)
    }
}

export const sendDocuments = async (req, res) => {
    try {
        const { uid } = req.params
        const newDoc = req.body
        const user = await userModel.findByIdAndUpdate(uid, {  //Es un metodo POST que funciona comol PUT porque actualizo un documento
            $push: { //(Metodo de mongoDB) Pusheo dentro del array de documentos,  
                documents: {      
                    $each: newDoc //y voy recorriendo cada uno  de los documentos y por cada uno lo voy pusheando
                }
            }
        }, { new: true })
        if (!user) {
            res.status(404).send("Usuario not found.")
        } else {
            res.status(200).send(user) //Devuelvo user actualizado
        }

    } catch (error) {
        res.status(500).send("Error al enviar documento:", error)
    }
}

export const imagesProds = async (req, res) => {
    
}