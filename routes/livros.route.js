import express from "express";
import livrosController from "../controllers/livros.controller.js";

const router = express.Router();

router.post("inserir/", livrosController.inserirLivro);
router.put("alterar/", livrosController.alterarLivro);
router.get("obterLista/", livrosController.obterLivros);
router.get("obterLivroPorId/:livro_id", livrosController.obterLivroPorId)
router.get("obterLivroPorAutor/:autor_id", livrosController.obterLivroPorAutor)
router.delete("deletarLivro/:livro_id", livrosController.excluirLivro)


export default router;