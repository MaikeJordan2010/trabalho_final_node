import livrosRepository from "../repositories/livros.repository.js";

async function inserirLivro(livro){
    return await livrosRepository.inserirLivro(livro);
}

async function alterarLivro(livro){
    return await livrosRepository.alterarLivro(livro);
}

async function obterLivros(){
    return await livrosRepository.obterLivros();
}

async function obterLivroPorId(livro_id){
    return await livrosRepository.obterLivroPorId(livro_id);
}
async function obterLivroPorAutor(autor_id){
    return await livrosRepository.obterLivroPorAutor(autor_id);
}

async function excluirLivro(livro_id){
    return await livrosRepository.excluirLivro(livro_id);
}

export default{
    inserirLivro,
    obterLivros,
    obterLivroPorId,
    obterLivroPorAutor,
    excluirLivro,
    alterarLivro
}