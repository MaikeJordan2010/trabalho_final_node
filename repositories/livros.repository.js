import {connect } from "./db.js";

async function inserirLivro(livro){
    const conn = await connect();

    try{
        const sql = "INSERT INTO livros(nome, valor, autor, autor_id) VALUES ($1,$2,$3,$4)";
        const parametros = [livro.name, livro.valor, livro.autor, livro.autor_id];
        const res = await conn.query(sql, parametros);
        return livro;
    }
    catch(err){
        throw err;
    }
    finally{
        conn.release();
    }
}

async function alterarLivro(livro){
    const conn = await connect();

    try{
        const sql = "UPDATE livros SET nome = $1, valor = $2, autor = $3 WHERE livro_id = $4)";
        const parametros = [livro.name, livro.valor, livro.autor, livro.autor_id];
        const res = await conn.query(sql, parametros);
        return livro;
    }
    catch(err){
        throw err;
    }
    finally{
        conn.release();
    }
}

async function obterLivros(){
    const conn = await connect();
    try{

        const sql = 'SELECT * FROM Livros';
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

async function obterLivroPorId(livro_id){
    const conn = await connect();
    try{
        const sql = 'SELECT * FROM livros WHERE livro_id = $1';
        const parametros = [livro_id];
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

async function obterLivroPorAutor(autor_id){
    const conn = await connect();
    try{
        const sql = 'SELECT * FROM livros WHERE autor_id = $1';
        const parametros = [autor_id];
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

async function excluirLivro(livro_id){
    const conn = await connect();
    try{
        const sql = 'DELETE FROM livros WHERE livro_id = $1';
        const parametros = [livro_id];
        await conn.query(sql, parametros);;
    }
    catch(err){
        Console.log(JSON.stringify(err.message));
    }
    finally{
        conn.release();
    }
}

export default{
    inserirLivro,
    obterLivros,
    obterLivroPorId,
    obterLivroPorAutor,
    excluirLivro,
    alterarLivro
}