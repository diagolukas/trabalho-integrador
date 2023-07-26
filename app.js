import express from 'express'
import cors from "cors"
import routes from '../projeto-integrador/routes.js'
import multer from 'multer'


const app = express()
const port = 3000

app.use(express.json())
app.use(cors())
app.use(routes)

app.use('/public/assets/', express.static('./public/assets/'));

app.get('/',function(req,res){
    //__dirname retorna o diretorio raiz da aplicação. Aqui estamos pegando o caminho raiz mais o caminho de onde está o html
    res.sendFile('C:/arquivos de programação/Programador-Sistemas/projeto-integrador/projeto-integrador/public/index.html')
})

app.use("/images", express.static('./images'))

app.listen(port, () => {
  console.log(`Rodando em http://localhost:${port}/`);
});