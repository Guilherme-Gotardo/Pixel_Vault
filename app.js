const express = require('express');
const app = express();
const rotaProdutos = require('./routes/produtos');
const rotaPedidos = require('./routes/pedidos');


// request, resposta e quando quero chamar o próximo 

app.use('/pedidos', rotaPedidos);
app.use('/produtos', rotaProdutos);

app.use('/teste', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Ok, Deu certo'
    });
});

module.exports = app;

// começar com npm init para instalar os packages S