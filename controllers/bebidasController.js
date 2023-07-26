// import { Bebidas } from "../models/Bebidas.js";
import dbKnex from "../databases/db_config.js";

export const bebidasIndex = async (req, res) => {
  try {
    const bebidas = await dbKnex.select("*").from('bebidas');
    res.status(200).json(bebidas);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const bebidasCreate = async (req, res) => {
  const foto = req.file.path;

  if (
    (req.file.mimetype != "image/jpeg" && req.file.mimetype != "image/png") ||
    req.file.size > 2048 * 2048
  ) {
    res
      .status(400)
      .json({ msg: "Formato inválido amigão, tenta outra imagem" });
    return;
  }

  const { id, nome, preco, tipo, estoque } = req.body;

  if (!id || !nome || !preco || !tipo || !estoque || !foto) {
    res.status(400).json({ id: 0, msg: "Erro... Informe os dados" });
    return;
  }

  try {
    const novo = await dbKnex('bebidas').insert({
      id,
      nome,
      preco,
      tipo,
      estoque,
      foto
    });
    
    res
      .status(201)
      .json({ id: novo[0], msg: "Certo, bebida inserida com sucesso pae" });
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};

export const bebidasDestroy = async (req, res) => {
  const { id } = req.params;

  try {
    await dbKnex('bebidas').where({id}).del();
    res.status(200).json({ msg: "Ok! Removido com Sucesso" });
  } catch (error) {
    res.status(400).send(error);
  }
};
