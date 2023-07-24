import { Bebidas } from "../../projeto-integrador-back/models/Bebidas.js"

export const bebidasIndex = async (req, res) => {
  try {
    const bebidas = await Bebidas.findAll();
    res.status(200).json(bebidas)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const bebidasCreate = async (req, res) => {
  const { id, nome, preco, tipo, estoque, foto } = req.body

  if (!id || !nome || !preco || !tipo || !estoque || !foto) {
    res.status(400).json({ id: 0, msg: "Erro... Informe os dados" })
    return
  }

  try {
    const bebida = await Bebidas.create({
      id, nome, preco, tipo, estoque, foto
    });
    res.status(201).json(bebida)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const bebidasDestroy = async (req, res) => {
  const { id } = req.params

  try {
    await Bebidas.destroy({ where: { id } });

    res.status(200).json({ msg: "Ok! Removido com Sucesso" })
  } catch (error) {
    res.status(400).send(error)
  }
}
