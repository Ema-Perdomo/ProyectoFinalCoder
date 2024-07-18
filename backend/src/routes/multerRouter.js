import { Router } from "express";
import { uploadImage } from '../controllers/multerController.js'
import { uploadDocs, uploadProds, uploadProfiles } from '../config/multer.js'


const multerRouter = Router()

multerRouter.post('/profiles', uploadProfiles.single('profile'), uploadImage)
multerRouter.post('/docs', uploadDocs.single('doc'), uploadImage)
multerRouter.post('/products', uploadProds.single('product'), uploadImage)

export default multerRouter

