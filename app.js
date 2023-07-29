import express from 'express'
import cors from "cors"
import routes from '../projeto-integrador/routes.js'

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

app.put("/bebidas/:id", async (req, res) => {
  try {
    const bebidaId = req.params.id;
    const { estoque } = req.body;

    // Validação para garantir que o estoque seja um número inteiro positivo
    if (!Number.isInteger(estoque) || estoque < 0) {
      return res.status(400).json({ message: "Estoque inválido" });
    }

    // Atualize o estoque da bebida no banco de dados
    await connection.execute(
      "UPDATE bebidas SET estoque = ? WHERE id = ?",
      [estoque, bebidaId]
    );

    res.status(200).json({ message: "Estoque atualizado com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar o estoque:", error);
    res.status(500).json({ message: "Erro ao atualizar o estoque" });
  }
});
