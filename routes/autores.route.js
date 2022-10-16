import express from "express";
import autoresController from "../controllers/autores.controller.js";

const router = express.Router();

router.post("/inserirAutor/", autoresController.inserirAutor);
router.post("/alterarAutor/", autoresController.alterarAutor);
router.get("/obterLista/", autoresController.obterAutores);
router.get("/obterAutor/:autor_id", autoresController.obterAutorPorId);
router.delete("/excluirAutor/:autor_id", autoresController.excluirAutor);


export default router;