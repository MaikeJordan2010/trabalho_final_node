import {connect } from "./db.js";

async function insertAutor(autor){
    const conn = await connect();

    try{
        const sql = "INSERT INTO autores(Nome, Email, Telefone) VALUES ($1,$2,$3)";
        const parametros = [autor.nome, autor.telefone, autor.email];
        const res = await conn.query(sql, parametros);
    
        return autor;
    }
    catch(err){
        throw err;
    }
    finally{
        conn.release();
    }
}

async function alterarAutor(autor){
    const conn = await connect();
    try{
        const sql = "UPDATE autores SET nome = $1, telefone = $2, email = $3 WHERE autor_id = $4";
        const parametros = [autor.nome, autor.telefone, autor.email, autor.autor_id];
        const res = await conn.query(sql, parametros);
    
        return autor;
    }
    catch(err){
        throw err;
    }
    finally{
        conn.release();
    }
}

async function excluirAutor(autor_id){
    const conn = await connect();

    // validar se existe vendas
    try{
        const sql = "DELETE FROM autores WHERE autor_id = $1";
        const parametros = [autor_id];
        await conn.query(sql, parametros);

    }
    catch(err){
        throw err;
    }
    finally{
        conn.release();
    }
}

async function obterAutores(){
    const conn = await connect();
    try{

        const sql = 'SELECT * FROM autores ';
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

async function obterAutorPorID(autor_id){
    const conn = await connect();
    try{
        const sql = 'SELECT * FROM autores WHERE autor_id = $1';
        const parametros = [autor_id];
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


export default{
    insertAutor,
    alterarAutor,
    obterAutorPorID,
    obterAutores,
    excluirAutor
}