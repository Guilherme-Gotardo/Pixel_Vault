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


module.exports = {
    listar,
}