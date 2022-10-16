import pg from "pg";

async function connect(){
    try{
        if(global.connection){
            return global.connection.connect();
        }
        const pool = new pg.Pool({
            connectionString:""
        });

        global.connection = pool;
        return pool.connect();
    }
    catch(err)
    {
        
    }
}

export {
    connect
}