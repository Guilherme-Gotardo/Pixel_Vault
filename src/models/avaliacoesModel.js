var database = require("../database/config")

function cadastrar(idUsuario, idJogo, nomeJogo) {
    return new Promise((resolve, reject) => {
        // Verifica se o usuário já tem um jogo favorito
        var instrucaoSqlVerificar = `
            SELECT (favorito) FROM avaliacao WHERE fkUsuario = ${idUsuario};
        `;

        database.executar(instrucaoSqlVerificar).then(resultados => {
            if (resultados.length > 0) {
                // Se o usuário já tem um favorito, faz o UPDATE
                var instrucaoSql = `
                    UPDATE avaliacao
                    SET favorito = CASE 
                        WHEN favorito = 1 THEN 0   
                        WHEN fkJogo = ${idJogo} AND favorito = 0 THEN 1
                    ELSE favorito 
                    END
                    WHERE fkUsuario = ${idUsuario};
                `;
                return database.executar(instrucaoSql);
            } else {
                // Se o usuário não tem um favorito, faz o INSERT
                var instrucaoSql = `
                    INSERT INTO avaliacao (fkUsuario, fkJogo, favorito)
                    VALUES (${idUsuario}, ${idJogo}, 1);
                `;
                return database.executar(instrucaoSql);
            }
        }).then(resultado => {
            resolve(resultado);
        }).catch(erro => {
            reject(erro);
        });
    });
}

function carregar(idUsuario) {
    return new Promise((resolve, reject) => {
        var instrucaoSql = `
            SELECT * FROM jogo
            JOIN avaliacao ON idJogo = fkJogo
            WHERE fkUsuario = 1 AND favorito = 1;
        `;

        // Chama a função para executar a consulta no banco, passando o idUsuario como parâmetro
        database.executar(instrucaoSql, [idUsuario])
            .then(function (resultado) {
                resolve(resultado);
            })
            .catch(function (erro) {
                console.error(erro);
                reject(erro);
            });
    });
}

function atribuirNota(idUsuario, idJogo, nota) {
    return new Promise((resolve, reject) => {
        // Verifica se o usuário já deu uma nota para esse jogo
        var instrucaoSqlVerificar = `
            SELECT (nota) FROM avaliacao WHERE fkUsuario = ${idUsuario} and fkJogo = ${idJogo};
        `;

        database.executar(instrucaoSqlVerificar).then(resultados => {
            if (resultados.length > 0) {
                // Se o usuário já deu uma nota a esse jogo, faz o UPDATE
                var instrucaoSql = `
                    UPDATE avaliacao SET nota = ${nota}
                    WHERE fkUsuario = ${idUsuario} AND fkJogo = ${idJogo}
                `;
                return database.executar(instrucaoSql);
            } else {
                // Se o usuário não deu uma nota ainda, faz o INSERT
                var instrucaoSql = `
                    INSERT INTO avaliacao (fkUsuario, fkJogo, nota)
                    VALUES (${idUsuario}, ${idJogo}, ${nota});
                `;
                return database.executar(instrucaoSql);
            }
        }).then(resultado => {
            resolve(resultado);
        }).catch(erro => {
            reject(erro);
        });
    });
}

function carregarNotas(idUsuario) {
    return new Promise((resolve, reject) => {
        var instrucaoSql = `
            SELECT jogo.idJogo, jogo.nome, avaliacao.nota
            FROM avaliacao
            JOIN jogo ON jogo.idJogo = avaliacao.fkJogo
            WHERE avaliacao.fkUsuario = ${idUsuario};
        `;

        // Chama a função para executar a consulta no banco, passando o idUsuario como parâmetro
        database.executar(instrucaoSql, [idUsuario])
            .then(function (resultado) {
                resolve(resultado);
            })
            .catch(function (erro) {
                console.error(erro);
                reject(erro);
            });
    });
}

module.exports = {
    cadastrar,
    carregar,
    atribuirNota,
    carregarNotas
};