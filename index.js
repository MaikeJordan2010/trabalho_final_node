import express from "express";
import clientsRouter from "./routes/clientes.route.js"
import livrosRouter from "./routes/livros.route.js"
import vendasRouter from "./routes/vendas.route.js"
import autoresRouter from "./routes/autores.route.js"
import clienteServices from "./services/clientes.services.js"
import basicAuth  from "express-basic-auth";
import cors from 'cors';
import winston from "winston";

const {combine, timestamp, label, printf} = winston.format;
const myFormat = printf(({level, message, label, timestamp}) => {
    return `${timestamp} [${label}] ${message}`;
})

global.logger = winston.createLogger({
    level:"silly",
    transports:[
        new (winston.transports.Console)(),
        new(winston.transports.File)({filename:"api.log"})
    ],
    format:combine(
        label({label: "api"}),
        timestamp(),
        myFormat
    )
});

const app = express();
app.use(express.json());

async function authorize(username, password, callback){

    if(username == "admin" && password == "1234"){
        return callback( null, true);
    }
    else{
        var cliente =  await clienteServices.autenticarCliente(username, password)
        console.log(cliente)
        return callback(null, cliente);
    }
    return callback(null, false);
}

app.use(basicAuth({
    authorizer: authorize,
    authorizeAsync: true
}))

app.use("/clientes", clientsRouter);
app.use("/livros", livrosRouter);
app.use("/vendas", vendasRouter);
app.use("/autores", autoresRouter);

app.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.baseUrl}`);
    res.status(400).send(JSON.stringify({error: err.message}));
});
app.listen(3000, () =>{
    console.log("API started!");
});