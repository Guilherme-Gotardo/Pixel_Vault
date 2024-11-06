const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

router.get('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({error: error})}
        conn.query(
            'SELECT * FROM produtos;',
            (error, resultado, fields) => {
                if(error) {return res.status(500).send({error: error})}

                const response = {
                    quantidade: resultado.length,
                    produtos: resultado.map(prod => {
                        return {
                            id_produto: prod.id_produto,
                            nome: prod.nome,
                            preco: prod.preco,
                            request: {
                                tipo: 'GET',
                                descricao: '',
                                url: 'http://localhost:3000/produtos/' + prod.idProdutos
                            }
                        }
                    })
                }

                return res.status(200).send({response})
            }
        )
    })
}); // aqui usamos o verbo get para pegar coisas que são mandadas para essa rota

router.post('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {

        if(error) {return res.status(500).send({error: error})}
        conn.query(
            'INSERT INTO produtos (nome, preco) VALUES (?,?)',
            [req.body.nome, req.body.preco],
            (error, resultado, field) => {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                res.status(201).send({
                    mensagem: 'Produto inserido com sucesso',
                });
            }
        )
    });
}); // comando para postar coisas nessa rota definida


// Retorna os dados de um produto
router.get('/:id_produto', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({error: error})}
        conn.query(
            'SELECT * FROM produtos WHERE idProdutos = ?;',
            [req.params.id_produto],
            (error, resultado, fields) => {
                if(error) {return res.status(500).send({error: error})}

                return res.status(200).send({response: resultado})
            }
        )
    });
}); // trazer os detalhes de apenas um produto 


router.patch('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {

        if(error) {return res.status(500).send({error: error})}
        conn.query(
            `UPDATE produtos 
                SET   nome       = ?,
                      preco      = ?
                WHERE idProdutos = ?`,
            [req.body.nome, req.body.preco, req.body.id_produto],

            (error, resultado, field) => {
                conn.release();

                if(error) {return res.status(500).send({error: error})}

                res.status(202).send({
                    mensagem: 'Produto alterado com sucesso',
                });
            }
        )
    });
});

router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {

        if(error) {return res.status(500).send({error: error})}
        conn.query(
            `DELETE FROM produtos WHERE idProdutos = ?`,
            [req.body.id_produto],

            (error, resultado, field) => {
                conn.release();

                if(error) {return res.status(500).send({error: error})}

                res.status(202).send({
                    mensagem: 'Produto removido com sucesso',
                });
            }
        )
    });
});


module.exports = router; // Importante fazer isso para exportas os módulos para esse caminho

