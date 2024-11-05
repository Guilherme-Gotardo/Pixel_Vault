const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Usando o GET dentro da rota de produtos'
    });
}); // aqui usamos o verbo get para pegar coisas que são mandadas para essa rota

router.post('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
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
                    id_produto: resultado.insertId
                });
            }
        )
    });
}); // comando para postar coisas nessa rota definida


// Retorna os dados de um produto
router.get('/:id_produto', (req, res, next) => {
    const id = req.params.id_produto

    if (id == 'especial') {
        res.status(200).send({
            mensagem: 'Você descobriu o ID especial',
            id: id
        })

    } else {
        res.status(200).send({
            mensagem: 'Você passou um ID'
        })
    }

    res.status(200).send({
        mensagem: 'Usando o GET de um produto exclusivo',
        id: id
    });
}); // trazer os detalhes de apenas um produto 


router.patch('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Usando o PATCH'
    })
});

router.delete('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Usando o DELETE'
    });
});


module.exports = router; // Importante fazer isso para exportas os módulos para esse caminho

