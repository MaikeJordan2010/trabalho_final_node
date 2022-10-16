import express from "express";
import clienteController from "../controllers/clientes.controller.js";

const router = express.Router();

router.post("/inserirCliente/", clienteController.inserirCliente);
router.post("/alterarCliente/", clienteController.alterarCliente);
router.get("/obterLista/", clienteController.obterClientes);
router.get("/obterCliente/:cliente_id", clienteController.obterClientePorId);
router.delete("/excluirCliente/:cliente_id", clienteController.excluirCliente);


export default router;