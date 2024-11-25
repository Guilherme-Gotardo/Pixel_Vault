var express = require("express");
var router = express.Router();

var jogosController = require("../controllers/jogosController");

router.get("/listar", function (req, res) {
    jogosController.listar(req, res);
});

router.get("/estatisticas/:idJogo", function (req, res) {
    jogosController.listarEstatisticas(req, res);
});

module.exports = router;