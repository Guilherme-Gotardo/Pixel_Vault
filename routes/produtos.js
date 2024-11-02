const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Usando o GET dentro da rota de produtos'
    });
}); // aqui usamos o verbo get para pegar coisas que são mandadas para essa rota

router.post('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Usando o POST dentro da rota de produtos'
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

