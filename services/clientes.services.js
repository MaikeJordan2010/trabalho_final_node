import clienteRepository from "../repositories/clientes.repository.js";

async function inserirCliente(client){
    return await clienteRepository.insertCliente(client);
}

async function obterClientes(){
    return await clienteRepository.obterClientes();
}

async function obterClientePorId(cliente_id){
    return await clienteRepository.obterClientePorID(cliente_id);
}

async function alterarCliente(cliente_id){
    return await clienteRepository.alterarCliente(cliente_id);
}

async function excluirClientePorId(cliente_id){
    return await clienteRepository.excluirCliente(cliente_id);
}

async function autenticarCliente(username, password){
    return await clienteRepository.autenticarCliente(username, password);
}

export default{
    inserirCliente,
    obterClientes,
    obterClientePorId,
    alterarCliente,
    excluirClientePorId,
    autenticarCliente
}