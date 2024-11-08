const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

const rotaProdutos = require('./routes/produtos');
const rotaPedidos = require('./routes/pedidos');


// request, resposta e quando quero chamar o próximo 
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false })); // apenas dados simples
app.use(bodyParser.json())                          // Será aceito somente arquivos json de entrada 

app.use((req, res, next) => {
    res.header('Acces-Control-Allow-Origin', '*');
    res.header(
        'Acces-Control-Allow-Header', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.header('Acces-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }

    next();
});

app.use('/pedidos', rotaPedidos);
app.use('/produtos', rotaProdutos);

app.use('/teste', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Ok, Deu certo'
    });
});

// QUANDO NÃO ENCONTRAR NENHUMA ROTA
app.use((req, res, next) => {
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    })
});

module.exports = app;

// começar com npm init para instalar os packages S