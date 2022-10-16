import { loggers } from "winston";
import  clienteServices  from "../services/clientes.services.js";
import  vendasServices  from "../services/vendas.services.js";

async function inserirCliente(req, res, next){
    try{
        let cliente = req.body;

        if(!cliente.nome || !cliente.senha || !cliente.telefone || !cliente.email || cliente.endereco)
        {
            throw new Error("Nome, senha, telefone, email e endereço são obrigatórios");
        }

        const resp = await clienteServices.inserirCliente(cliente);

        res.send(resp);
        loggers.info(`POST /client - ${ JSON.stringify(cliente)}`)
    }
    catch(err){
        next(err.message);
    }
}

async function alterarCliente(req, res, next){
    try{
        let cliente = req.body;

        if(!cliente.nome || !cliente.senha || !cliente.telefone || !cliente.email || cliente.endereco)
        {
            throw new Error("Nome, senha, telefone, email e endereço são obrigatórios");
        }

        const resp = await clienteServices.alterarCliente(cliente);

        res.send(resp);
        loggers.info(`POST /client - ${ JSON.stringify(cliente)}`)
    }
    catch(err){
        next(err.message);
    }
}


async function obterClientes(req, res, next){
    try{

        const resp = await clienteServices.obterClientes();
        if(resp){
            res.send(resp);
        }
        res.status(40).send("Erro");
    }
    catch(err){
        next(err.message);
    }
}

async function obterClientePorId(req, res, next){
    
    try{

        var cliente_id = req.params.cliente_id;
        const resp = await clienteServices.obterClientePorId(cliente_id);
        res.status(200).send(resp);
    }
    catch(err){
        next(err.message);
    }
}


async function excluirCliente(req, res, next){
    
    try{

        var cliente_id = req.params.cliente_id;

        var vendas = await vendasServices.obterVendaPorCliente(cliente_id);

        if(vendas.lenght > 0){
            const resp = await clienteServices.excluirClientePorId(cliente_id);
            if(!resp){
                res.status(400).send("Erro ao excluir cliente");
            }
            res.status(200).send(resp);
        }
        else{
            res.status(400).send({error: "Cliente possui vendas em seu nome!"});
        }
    }
    catch(err){
        next(err.message);
    }
}

export default {
    inserirCliente,
    obterClientes,
    obterClientePorId,
    excluirCliente,
    alterarCliente
}