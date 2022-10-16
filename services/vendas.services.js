import vendasRepository from "../repositories/vendas.repository.js";

async function inserirVenda(venda){
    return await vendasRepository.inserirVenda(venda);
}

async function alterarVenda(venda){
    return await vendasRepository.alterarVenda(venda);
}

async function obterVendas(){
    return await vendasRepository.obterVendas();
}

async function obterVendaPorId(venda_id){
    return await vendasRepository.obterVendaPorID(venda_id);
}

async function obterVendaPorAutor(autor_id){
    return await vendasRepository.obterVendaPorAutor(autor_id);
}
async function obterVendaPorCliente(cliente_id){
    return await vendasRepository.obterVendaPorCliente(cliente_id);
}
async function obterVendaPorLivro(livro_id){
    return await vendasRepository.obterVendaPorLivro(livro_id);
}

async function excluirClientePorId(venda_id){
    return await vendasRepository.excluirVenda(venda_id);
}
export default{
    inserirVenda,
    alterarVenda,
    obterVendas,
    obterVendaPorAutor,
    obterVendaPorCliente,
    obterVendaPorLivro,
    obterVendaPorId,
    excluirClientePorId
}