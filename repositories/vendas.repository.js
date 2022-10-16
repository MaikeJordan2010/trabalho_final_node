import {connect } from "./db.js";

async function inserirVenda(venda){
    const conn = await connect();

    try{
        const sql = "INSERT INTO vendas(Valor, Data, Cliente_id, livro_id) VALUES ($1,$2,$3,$4) RETURNING * ";
        const parametros = [venda.valor, venda.data, venda.cliente_id, venda.livro_id];
        const res = await conn.query(sql, parametros);
    
        return res.rows[0];
    }
    catch(err){
        throw err;
    }
    finally{
        conn.release();
    }
}

async function alterarVenda(venda){
    const conn = await connect();
    try{
        const sql = "UPDATE vendas SET valor = $1, data = $2, cliente_id = $3, livro_id = $4 WHERE venda_id = $5";
        const parametros = [venda.valor, venda.data, venda.cliente_id, venda.livro_id, venda.venda_id];
        const res = conn.query(sql, parametros);
    
        return autor;
    }
    catch(err){
        throw err;
    }
    finally{
        conn.release();
    }
}

async function excluirVenda(venda_id){
    const conn = await connect();

    // validar se existe vendas
    try{
        const sql = "DELETE FROM vendas WHERE venda_id = $1";
        const parametros = [venda_id];
        await conn.query(sql, parametros);
    }
    catch(err){
        throw err;
    }
    finally{
        conn.release();
    }
}

async function obterVendas(){
    const conn = await connect();
    try{

        const sql = 'SELECT * FROM vendas ';
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

async function obterVendaPorID(venda_id){
    const conn = await connect();
    try{
        const sql = 'SELECT * FROM vendas WHERE venda_id = $1';
        const parametros = [venda_id];
        const resp = await conn.query(sql, parametros);;
        return resp.rows[0];
    }
    catch(err){
        Console.log(JSON.stringify(err.message));
    }
    finally{
        conn.release();
    }
}

async function obterVendaPorCliente(cliente_id){
    const conn = await connect();
    try{
        const sql = 'SELECT * FROM vendas WHERE cliente_id = $1';
        const parametros = [cliente_id];
        const resp = await conn.query(sql, parametros);;
        return resp.rows;
    }
    catch(err){
        Console.log(JSON.stringify(err.message));
    }
    finally{
        conn.release();
    }
}

async function obterVendaPorAutor(autor_id){
    const conn = await connect();
    try{
        const sql = 'SELECT * FROM vendas WHERE autor_id = $1';
        const parametros = [autor_id];
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


async function obterVendaPorLivro(livro_id){
    const conn = await connect();
    try{
        const sql = 'SELECT * FROM vendas WHERE livro_id = $1';
        const parametros = [livro_id];
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

export default{
    inserirVenda,
    alterarVenda,
    obterVendas,
    obterVendaPorID,
    excluirVenda,
    obterVendaPorAutor,
    obterVendaPorCliente,
    obterVendaPorLivro
}