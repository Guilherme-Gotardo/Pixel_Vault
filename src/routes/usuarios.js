var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/atualizar-descricao", function (req, res) {
    usuarioController.atualizarDescricao(req, res);
});

router.post("/cadastrar-comentario", function (req, res) {
    usuarioController.cadastrarComentario(req, res);
});

router.get("/resgatarDados/:idUsuario", function (req, res) {
    usuarioController.resgatarDados(req, res);
});

router.get("/resgatarComentarios/:idUsuario", function (req, res) {
    usuarioController.resgatarComentarios(req, res);
});

module.exports = router;