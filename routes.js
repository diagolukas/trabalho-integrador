import { Router } from "express"
import { bebidasDestroy, bebidasCreate, bebidasIndex } from "./controllers/bebidasController.js"
import upload from "./middlewares/FotoStore.js"

const router = Router()

router.get('/bebidas', bebidasIndex)
      .post('/bebidas', upload.single('foto'), bebidasCreate)
      .delete('/bebidas/:id', bebidasDestroy)


export default router