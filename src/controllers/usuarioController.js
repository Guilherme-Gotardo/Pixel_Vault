var usuarioModel = require("../models/usuarioModel.js");

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Sua empresa a vincular está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua empresa a vincular está undefined!");
    } else {

        console.log('Cadastrar na controller')
        usuarioModel.cadastrar(nome, email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                        res.json({
                            idUsuario: resultadoAutenticar[0].idUsuario,
                            nome: resultadoAutenticar[0].nome,
                            email: resultadoAutenticar[0].email,
                            senha: resultadoAutenticar[0].senha,
                        });

                        console.log(resultadoAutenticar);
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }

            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


function resgatarDados(req, res) {
    const { idUsuario } = req.params;

    usuarioModel.resgatarDados(idUsuario)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).json([]);
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao buscar o Usuario! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function atualizarDescricao(req, res) {

    var idUsuario = req.body.idUsuario;
    var descricao = req.body.descricao;

    console.log('Cadastrar na controller')
    usuarioModel.atualizarDescricao(idUsuario, descricao)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao atualizar a descrição (CONTROLLER)! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function cadastrarComentario(req, res) {
    var idJogo = req.body.idJogo
    var idUsuario = req.body.idUsuario;
    var comentario = req.body.comentarioServer;

    console.log('Cadastrar comentário na controller')
    usuarioModel.cadastrarComentario(idJogo, idUsuario, comentario)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao cadastrar o comentário! (CONTROLLER) ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function resgatarComentarios(req, res) {
    const { idUsuario } = req.params;

    usuarioModel.resgatarComentarios(idUsuario)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).json([]);
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao buscar os comentários do Usuário! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    cadastrar,
    autenticar,
    resgatarDados,
    atualizarDescricao,
    cadastrarComentario,
    resgatarComentarios
}