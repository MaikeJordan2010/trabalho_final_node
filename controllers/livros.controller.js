import { loggers } from "winston";
import  livrosServices  from "../services/livros.services.js";
import  vendasServices  from "../services/vendas.services.js";

async function inserirLivro(req, res, next){
    try{
        let livro = req.body;

        if(!livro.nome || !livro.valor || !livro.estoque || !livro.autor_id)
        {
            throw new Error("Nome, CPF, telefone e email são obrigatórios");
        }

        const resp = await livrosServices.inserirLivro(livro);

        res.send(resp);
        loggers.info(`POST /client - ${ JSON.stringify(livro)}`)
    }
    catch(err){
        next(err.message);
    }
}

async function alterarLivro(req, res, next){
    try{
        let livro = req.body;

        if(!livro.nome || !livro.valor || !livro.estoque || !livro.autor_id)
        {
            throw new Error("Nome, Valor, estoque e autor são obrigatórios");
        }

        const resp = await livrosServices.alterarLivro(livro);

        res.send(resp);
        loggers.info(`PUT /client - ${ JSON.stringify(livro)}`)
    }
    catch(err){
        next(err.message);
    }
}

async function obterLivros(req, res, next){
    try{

        const resp = await livrosServices.obterLivros();
        if(resp){
            res.send(JSON.stringify(resp));
        }
        res.status(400).send("Erro");
    }
    catch(err){
        next(err.message);
    }
}

async function obterLivroPorId(req, res, next){
    
    try{

        var livro_id = req.params.livro_id;
        const resp = await livrosServices.obterLivroPorId(livro_id);

            res.status(200).send(resp);
       
    }
    catch(err){
        next(err.message);
    }
}

async function obterLivroPorAutor(req, res, next){
    
    try{

        var autor_id = req.params.livro_id;
        const resp = await livrosServices.obterLivroPorAutor(autor_id);

        if(resp){
            res.status(200).send(resp);
        }
        res.status(400).send({error: "erro ao obter lista"});
    }
    catch(err){
        next(err.message);
    }
}

async function excluirLivro(req, res, next){
    
    try{
        var livro_id = req.params.livro_id;
        var vendas = await vendasServices.obterVendaPorLivro(livro_id);

        if(vendas.lenght > 0){
            const resp = await livrosServices.excluirLivro(livro_id);
            if(!resp){
                res.status(400).send("Erro ao excluir livro");
            }
            res.status(200).send(resp);
        }
        else{
            res.status(400).send({error: "Livro possui vendas realizadas!"});
        }
    }
    catch(err){
        next(err.message);
    }
}

export default {
    inserirLivro,
    obterLivros,
    obterLivroPorId,
    obterLivroPorAutor,
    excluirLivro,
    alterarLivro
}