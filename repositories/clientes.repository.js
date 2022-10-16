import {connect } from "./db.js";

async function insertCliente(cliente){
    const conn = await connect();

    try{
        const sql = "INSERT INTO clientes(Name, telefone, senha, endereco, email) VALUES ($1,$2,$3,$4,$5)";
        const parametros = [cliente.name, cliente.telefone, cliente.senha, cliente.endereco, cliente.email];
        const res = await conn.query(sql, parametros);
    
        return cliente;
    }
    catch(err){
        throw err;
    }
    finally{
        conn.release();
    }
}

async function alterarCliente(cliente){
    const conn = await connect();
    try{
        const sql = "UPDATE clientes SET nome = $1, telefone = $2, senha = $3, endereco = $4, email = $5 WHERE cliente_id = $6";
        const parametros = [cliente.nome, cliente.telefone, cliente.senha, cliente.endereco, cliente.email, cliente.cliente_id];
        const res = await conn.query(sql, parametros);
    
        return cliente;
    }
    catch(err){
        throw err;
    }
    finally{
        conn.release();
    }
}

async function excluirCliente(cliente_id){
    const conn = await connect();

    // validar se existe vendas
    try{
        const sql = "DELETE FROM clientes WHERE cliente_id = $1";
        const parametros = [cliente_id];
        await conn.query(sql, parametros);
    }
    catch(err){
        throw err;
    }
    finally{
        conn.release();
    }
}

async function obterClientes(){
    const conn = await connect();
    try{

        const sql = 'SELECT * FROM clientes LIMIT 100';
        const resp = await conn.query(sql);;
        return resp.rows;
    }
    catch(err){
        Console.log(JSON.stringify(err.message));
    }
    finally{
        conn.release();
    }
}

async function obterClientePorID(cliente_id){
    const conn = await connect();
    try{
        const sql = 'SELECT * FROM clientes WHERE cliente_id = $1';
        const parametros = [cliente_id];
        var resp = await conn.query(sql, parametros);;
        return resp.rows;
    }
    catch(err){
        Console.log(JSON.stringify(err.message));
    }
    finally{
        conn.release();
    }
}

async function autenticarCliente(username, password){
    const conn = await connect();
    try{
        const sql = 'SELECT * FROM clientes WHERE email = $1 AND senha = $2';
        const parametros = [username, password];
        var resp = await conn.query(sql, parametros);
        return resp.rows.length > 0 ? true : false;
    }
    catch(err){
        Console.log(JSON.stringify(err.message));
    }
    finally{
        conn.release();
    }
}


export default{
    insertCliente,
    obterClientes,
    obterClientePorID,
    alterarCliente,
    excluirCliente,
    autenticarCliente
}