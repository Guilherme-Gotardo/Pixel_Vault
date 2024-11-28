var jogosModel = require("../models/jogosModel.js");

function listar(req, res) {
    jogosModel.listar().then((resultado) => {
        if (resultado.length > 0) {
            res.status(200).json(resultado); // Sucesso: retorna a lista de jogos
        } else {
            res.status(204).json([]); // Sem conteúdo
        }
    }).catch((erro) => {
        console.error("Houve um erro ao buscar os jogos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage); // Erro interno
    });
}

function listarEstatisticas(req, res) {
    const { idJogo } = req.params;  // Só o idUsuario é necessário para buscar as notas

    if (!idJogo) {
        return res.status(400).json({ error: "idUsuario não fornecido." });
    }

    jogosModel.listarEstatisticas(idJogo)
        .then(function (resultado) {
            if (resultado.length > 0) {
                // Se encontrar resultados, retorna as Notas
                res.status(200).json(resultado);
            } else {
                // Caso contrário, retorna uma resposta vazia (nenhum favorito encontrado)
                res.status(204).json([]);
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao buscar as notas! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function listarComentario(req, res) {
    const { idJogo } = req.params;

    jogosModel.listarComentario(idJogo)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).json([]);
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao buscar as notas! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    listar,
    listarEstatisticas,
    listarComentario
}