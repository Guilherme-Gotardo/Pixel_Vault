var avaliacoesModel = require("../models/avaliacoesModel.js");

function marcarFavorito(req, res) {

    console.log("Dados recebidos:", req.body);
    const { idJogo, idUsuario } = req.body;

    if (!idJogo || !idUsuario) {
        return res.status(400).json({
            mensagem: "Os campos idJogo e idUsuario são obrigatórios."
        });
    }

    console.log(`Tentando marcar favorito com idJogo=${idJogo} e idUsuario=${idUsuario}`);

    avaliacoesModel.cadastrar(idUsuario, idJogo)
        .then((resultado) => {
            res.status(201).json({
                mensagem: "Jogo favorito cadastrado com sucesso.",
                resultado
            });
        })
        .catch((erro) => {
            console.error("Erro ao cadastrar favorito:", erro.sqlMessage || erro);
            res.status(500).json({
                mensagem: "Erro ao cadastrar o jogo favorito. Tente novamente."
            });
        });
}

function carregarFavorito(req, res) {
    const { idUsuario } = req.params;  // Só o idUsuario é necessário para buscar o favorito

    // Chama o método do modelo que vai retornar o jogo favorito
    avaliacoesModel.carregar(idUsuario)
        .then(function (resultado) {
            if (resultado.length > 0) {
                // Se encontrar resultados, retorna os jogos favoritos
                res.status(200).json(resultado);
            } else {
                // Caso contrário, retorna uma resposta vazia (nenhum favorito encontrado)
                res.status(204).json([]);
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao buscar o jogo favorito! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function atribuirNota(req, res) {

    console.log("Dados recebidos:", req.body);
    const { idUsuario, idJogo, nota  } = req.body;

    if (!idJogo || !idUsuario) {
        return res.status(400).json({
            mensagem: "Os campos idJogo e idUsuario são obrigatórios."
        });
    }

    console.log(`Tentando atribuir nota idJogo=${idJogo} e idUsuario=${idUsuario}`);

    avaliacoesModel.atribuirNota(idUsuario, idJogo, nota)
        .then((resultado) => {
            res.status(201).json({
                mensagem: "Jogo favorito cadastrado com sucesso.",
                resultado
            });
        })
        .catch((erro) => {
            console.error("Erro ao cadastrar favorito:", erro.sqlMessage || erro);
            res.status(500).json({
                mensagem: "Erro ao cadastrar o jogo favorito. Tente novamente."
            });
        });
}

function carregarNotas(req, res) {
    const { idUsuario } = req.params;  // Só o idUsuario é necessário para buscar as notas

    if (!idUsuario) {
        return res.status(400).json({ error: "idUsuario não fornecido." });
    }

    // Chama o método do modelo que vai retornar o jogo favorito
    avaliacoesModel.carregarNotas(idUsuario)
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


module.exports = {
    marcarFavorito,
    carregarFavorito,
    atribuirNota,
    carregarNotas
}