import autoresRepository from "../repositories/autores.repository.js";

async function inserirAutor(client){
    return await autoresRepository.insertAutor(client);
}

async function obterAutores(){
    return await autoresRepository.obterAutores();
}

async function obterAutorPorId(cliente_id){
    return await autoresRepository.obterAutorPorID(cliente_id);
}

async function alterarAutor(cliente_id){
    return await autoresRepository.alterarAutor(cliente_id);
}

async function excluirAutorPorId(cliente_id){
    return await autoresRepository.excluirAutor(cliente_id);
}
export default{
    inserirAutor,
    obterAutores,
    obterAutorPorId,
    alterarAutor,
    excluirAutorPorId
}