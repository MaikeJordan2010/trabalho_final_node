import { loggers } from "winston";
import  vendasServices  from "../services/vendas.services.js";

async function inserirVenda(req, res, next){
    try{
        let venda = req.body;

        if(!venda.valor || !venda.data || !venda.cliente_id || !venda.livro_id)
        {
            throw new Error("Valor, data, cliente_id e livro_id são obrigatórios");
        }

        const resp = await vendasServices.inserirVenda(venda);

        res.send(resp);
        loggers.info(`POST /vendas - ${ JSON.stringify(venda)}`)
    }
    catch(err){
        next(err.message);
    }
}

async function alterarVenda(req, res, next){
    try{
        let venda = req.body;

        if(!venda.valor || !venda.data || !venda.cliente_id || !venda.livro_id || !venda.venda_id)
        {
            throw new Error("Valor, data, cliente_id e livro_id são obrigatórios");
        }

        const resp = await vendasServices.alterarVenda(venda);

        res.send(resp);
        loggers.info(`PUT /vendas - ${ JSON.stringify(venda)}`)
    }
    catch(err){
        next(err.message);
    }
}


async function obterVendas(req, res, next){
    try{

        const resp = await vendasServices.obterVendas();
        if(resp){
            res.send(resp);
        }
        res.status(40).send("Erro");
    }
    catch(err){
        next(err.message);
    }
}

async function obterVendaPorId(req, res, next){
    
    try{

        var venda_id = req.params.venda_id;
        const resp = await vendasServices.obterVendaPorId(venda_id);

        if(resp){
            res.status(200).send(resp);
        }
        res.status(400).send({error: "erro ao obter lista"});
    }
    catch(err){
        next(err.message);
    }
}

async function obterVendasPorLivro(req, res, next){
    
    try{

        var livro_id = req.params.livro_id;
        var resp = await vendasServices.obterVendaPorLivro(livro_id);
        res.status(200).send(resp);
    }
    catch(err){
        next(err.message);
    }
}

async function obterVendasPorAutor(req, res, next){
    
    try{

        var autor_id = req.params.autor_id;
        var resp = await vendasServices.obterVendaPorAutor(autor_id);
        res.status(200).send(resp);

    }
    catch(err){
        next(err.message);
    }
}

async function obterVendasPorCliente(req, res, next){
    
    try{

        var cliente_id = req.params.cliente_id;
        var resp = await vendasServices.obterVendaPorCliente(cliente_id);
        res.status(200).send(resp);
    }
    catch(err){
        next(err.message);
    }
}

async function excluirVenda(req, res, next){
    
    try{

        var venda_id = req.params.venda_id;
        await clienteServices.excluirVendaPorId(venda_id);
        res.end();
        //res.status(400).send({error: "erro ao deletar cliente"});
    }
    catch(err){
        next(err.message);
    }
}

export default {
    inserirVenda,
    obterVendaPorId,
    obterVendas,
    obterVendasPorAutor,
    obterVendasPorCliente,
    obterVendasPorLivro,
    alterarVenda,
    excluirVenda
}