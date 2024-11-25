var express = require("express");
var router = express.Router();

var avaliacoesController = require("../controllers/avaliacoesController");

router.post("/favoritos", function (req, res) {
    avaliacoesController.marcarFavorito(req, res);
})

router.get("/favoritos/:idUsuario", function (req, res) {
    avaliacoesController.carregarFavorito(req, res);
})

router.post("/notas", function (req, res) {
    avaliacoesController.atribuirNota(req, res);
})

router.get("/notas/:idUsuario", function (req, res) {
    avaliacoesController.carregarNotas(req, res);
})

module.exports = router;