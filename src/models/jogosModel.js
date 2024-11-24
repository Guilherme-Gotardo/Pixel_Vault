var database = require("../database/config");

function listar() {
  var instrucaoSql = `SELECT * FROM jogo`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = { listar };