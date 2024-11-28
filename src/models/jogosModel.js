var database = require("../database/config");

function listar() {
  var instrucaoSql = `SELECT * FROM jogo`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function listarEstatisticas(idJogo) {
  return new Promise((resolve, reject) => {
    var instrucaoSql = `
        SELECT 
            jogo.nome,
            jogo.descricao,
            jogo.urlCapa,
            jogo.urlBg,
            jogo.urlVideo,
            jogo.plataforma,
            DATE_FORMAT(dtLancamento, '%d/%m/%Y') AS dtLancamento,
            jogo.genero,
            nota,
            ROUND(avg(nota)) AS 'mediaNotas',
            SUM(favorito) AS 'qtdeFavorito', 
            COUNT(*) AS quantidade
        FROM avaliacao
        JOIN jogo ON idJogo = fkJogo
        WHERE idJogo = ${idJogo}
        GROUP BY nota
        ORDER BY nota;
          `;

    // Chama a função para executar a consulta no banco, passando o idUsuario como parâmetro
    database.executar(instrucaoSql, [idJogo])
      .then(function (resultado) {
        resolve(resultado);
      })
      .catch(function (erro) {
        console.error(erro);
        reject(erro);
      });
  });
}

function carregarKpi(idJogo) {
  return new Promise((resolve, reject) => {
    var instrucaoSql = `
        SELECT 
	        TRUNCATE(avg(nota),2) AS 'mediaNotas',
          SUM(favorito) AS 'qtdeFavorito',
          COUNT(*) AS quantidade
        FROM avaliacao
        JOIN jogo ON idJogo = fkJogo
        WHERE idjogo = ${idJogo}
        GROUP BY nome;;
          `;

    // Chama a função para executar a consulta no banco, passando o idUsuario como parâmetro
    database.executar(instrucaoSql, [idJogo])
      .then(function (resultado) {
        resolve(resultado);
      })
      .catch(function (erro) {
        console.error(erro);
        reject(erro);
      });
  });
}

function listarComentario(idJogo) {
  var instrucaoSql = `SELECT 
                        usuario.nome AS nomeUsuario, 
                        comentario 
                      FROM comentario 
                      JOIN usuario ON usuario.idUsuario = comentario.fkUsuario
                      WHERE fkJogo = ${idJogo}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  listar,
  listarEstatisticas,
  listarComentario,
  carregarKpi
};