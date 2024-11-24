var express = require("express");
var router = express.Router();

var jogosController = require("../controllers/jogosController");

router.get("/listar", function (req, res) {
    jogosController.listar(req, res);
});

module.exports = router;