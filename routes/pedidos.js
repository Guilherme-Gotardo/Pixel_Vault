const express = require('express');
const router = express.Router();

// RETORNA TODOS OS PEDIDOS
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Retorna os pedidos'
    });
}); // aqui usamos o verbo get para pegar coisas que são mandadas para essa rota

// INSERE UM PEDIDO
router.post('/', (req, res, next) => {

    const pedido = {
        id_produto: req.body.id_produto,
        quantidade: req.body.quantidade
    }

    res.status(201).send({
        mensagem: 'O pedido foi criado',
        predidoCriado: pedido
    });
}); // comando para postar coisas nessa rota definida


// RETORNA OS DADOS DE UM PEDIDO
router.get('/:id_pedido', (req, res, next) => {
    const id = req.params.id_pedido

    res.status(200).send({
        mensagem: 'Detalhes do pedido',
        id_pedido: id
    });
}); // trazer os detalhes de apenas um produto 


// EXCLUI UM PEDIDO
router.delete('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Pedido excluido'
    });
});


module.exports = router; // Importante fazer isso para exportas os módulos para esse caminho

