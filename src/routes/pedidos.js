const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

// RETORNA TODOS OS PEDIDOS
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM pedidos;',
            (error, resultado, fields) => {
                if (error) { return res.status(500).send({ error: error }) }

                const response = {
                    quantidade: resultado.length,
                    pedidos: resultado.map(pedido => {
                        return {
                            id_pedido: pedido.id_pedido,
                            id_produto: pedido.id_produto,
                            quantidade: pedido.quantidade,
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna os detalhes de um pedido específico',
                                url: 'http://localhost:3000/pedidos/' + pedido.id_pedido
                            }
                        }
                    })
                }

                return res.status(200).send(response)
            }
        )
    })
}); // aqui usamos o verbo get para pegar coisas que são mandadas para essa rota

// INSERE UM PEDIDO
router.post('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }

        conn.query('SELECT * FROM produtos WHERE idProdutos = ?',
            [req.body.id_produto],
            (error, resultado, field) => {
                if (error) { return res.status(500).send({ error: error }) }
                if (resultado.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Produto não encontrado'
                    })
                }
                conn.query(
                    'INSERT INTO pedidos (fkProduto, quantidade) VALUES (?,?)',
                    [req.body.id_produto, req.body.quantidade],
                    (error, resultado, field) => {
                        conn.release();

                        if (error) { return res.status(500).send({ error: error }) }

                        const response = {
                            mensagem: 'Pedido inserido com sucesso',
                            pedidoCriado: {
                                id_pedido: resultado.id_pedido,
                                id_produto: req.body.id_produto,
                                quantidade: req.body.quantidade,
                                request: {
                                    tipo: 'GET',
                                    descricao: 'Retorna todos os pedidos',
                                    url: 'http://localhost:3000/pedidos/'
                                }
                            }
                        }
                        return res.status(201).send(response);
                    }
                )
            })
    })
}); // comando para postar coisas nessa rota definida


// RETORNA OS DADOS DE UM PEDIDO
router.get('/:id_pedido', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM pedidos WHERE idPedidos = ?;',
            [req.params.id_pedido],
            (error, resultado, fields) => {
                if (error) { return res.status(500).send({ error: error }) }

                if (resultado.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Não foi encontrado nenhum pedido com esse ID'
                    })
                }

                const response = {
                    pedido: {
                        id_pedido: resultado[0].id_pedido,
                        id_produto: resultado[0].id_produto,
                        quantidade: resultado[0].quantidade,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna todos os pedidos',
                            url: 'http://localhost:3000/pedidos/'
                        }
                    }
                }
                return res.status(200).send(response);
            }
        )
    });
}); // trazer os detalhes de apenas um produto 


// EXCLUI UM PEDIDO
router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {

        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `DELETE FROM pedidos WHERE idPedidos = ?`,
            [req.body.id_pedido],

            (error, resultado, field) => {
                conn.release();

                if (error) { return res.status(500).send({ error: error }) }

                const response = {
                    mensagem: 'Pedido removido com sucesso',
                    request: {
                        tipo: 'POST',
                        descricao: 'Insere um pedido',
                        url: 'http://localhost:3000/pedido',
                        body: {
                            id_produto: 'Number',
                            quantidade: 'Number'
                        }
                    }
                }
                return res.status(202).send(response);
            }
        )
    });
});


module.exports = router; // Importante fazer isso para exportas os módulos para esse caminho

