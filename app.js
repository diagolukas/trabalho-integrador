import express from 'express'
import cors from "cors"
import routes from '../projeto-integrador-back/routes.js'

import { sequelize } from './databases/conecta.js'
import { Bebidas } from './models/Bebidas.js'

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())
app.use(routes)

async function conecta_db() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com banco de dados feita com sucesso');

    await Bebidas.sync()

  } catch (error) {
    console.error('Erro na conexão com o banco: ', error);
  }
}
conecta_db()

app.get('/', (req, res) => {
  res.send('API Ratão Delivery')
})

app.use()

app.listen(port, () => {
  console.log(`Servidor Rodando na Porta: ${port}`)
})