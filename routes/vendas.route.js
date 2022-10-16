import express from "express";
import vendasController from "../controllers/vendas.controller.js";

const router = express.Router();

router.post("/inserirVenda/", vendasController.inserirVenda);
router.post("/alterarVenda/", vendasController.alterarVenda);
router.get("/obterLista/", vendasController.obterVendas);
router.get("/obterVendaPorId/:venda_id", vendasController.obterVendaPorId);
router.get("/obterVendaPorCliente/:cliente_id", vendasController.obterVendasPorCliente);
router.get("/obterVendaPorLivro/:livro_id", vendasController.obterVendasPorLivro);
router.get("/obterVendaPorAutor/:autor_id", vendasController.obterVendasPorAutor);
router.delete("/excluirVenda/:venda_id", vendasController.excluirVenda);


export default router;