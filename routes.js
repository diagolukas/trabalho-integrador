import { Router } from "express"
import { bebidasDestroy, bebidasCreate, bebidasIndex } from "../projeto-integrador/controllers/bebidasController.js"

const router = Router()

router.get('/bebidas', bebidasIndex)
      .post('/bebidas', bebidasCreate)
      .delete('/bebidas/:id', bebidasDestroy)


export default router