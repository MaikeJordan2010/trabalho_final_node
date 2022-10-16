import { loggers } from "winston";
import  autoresServices  from "../services/autores.services.js";
import livrosServices from "../services/livros.services.js";

async function inserirAutor(req, res, next){
    try{
        let autor = req.body;

        if(!autor.nome || !autor.email || !autor.telefone)
        {
            throw new Error("Nome, senha, telefone são obrigatórios");
        }

        const resp = await autoresServices.inserirAutor(autor);

        res.send(resp);
        loggers.info(`POST /client - ${ JSON.stringify(resp)}`)
    }
    catch(err){
        next(err.message);
    }
}

async function alterarAutor(req, res, next){
    try{
        let autor = req.body;

        if(!autor.nome || !autor.email || !autor.telefone || !autor.autor_id)
        {
            throw new Error("Nome, senha, telefone são obrigatórios");
        }

        const resp = await autoresServices.alterarAutor(autor);

        res.send(resp);
        loggers.info(`PUT /client - ${ JSON.stringify(resp)}`)
    }
    catch(err){
        next(err.message);
    }
}


async function obterAutores(req, res, next){
    try{

        const resp = await autoresServices.obterAutores();
        if(resp){
            res.send(resp);
        }
        res.status(400).send("Erro");
    }
    catch(err){
        next(err.message);
    }
}

async function obterAutorPorId(req, res, next){
    
    try{

        var autor_id = req.params.autor_id;
        const resp = await autoresServices.obterAutorPorId(autor_id);

        if(resp){
            res.status(200).send(resp);
        }
        res.status(400).send({error: "erro ao obter lista"});
    }
    catch(err){
        next(err.message);
    }
}

async function excluirAutor(req, res, next){
    
    try{

        var autor_id = req.params.autor_id;
        var listaLivros = await livrosServices.obterLivroPorAutor(autor_id);

        if(listaLivros.length == 0){
            const resp = await autoresServices.excluirAutorPorId(autor_id);
            if(resp){
                res.status(200).send(resp);
            }
        }
        else{
            res.status(400).send({error: "O autor possui livros cadastrados"});
        }
    }
    catch(err){
        next(err.message);
    }
}

export default {
    inserirAutor,
    obterAutores,
    obterAutorPorId,
    excluirAutor,
    alterarAutor
}