const { resgatar } = require("../controllers/usuarioController");
var database = require("../database/config")

function cadastrar(nome, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha) VALUES  
        ('${nome}', '${email}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT idUsuario, nome, email, senha FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function resgatarDados(idUsuario) {
    var instrucaoSql = `
        SELECT * FROM usuario WHERE idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarDescricao(idUsuario, descricao) {
    return new Promise((resolve, reject) => {
        // Verifica se o usuário já tem um jogo favorito
        var instrucaoSqlVerificar = `
            SELECT descricaoUsuario FROM usuario WHERE idUsuario = ${idUsuario};
        `;

        database.executar(instrucaoSqlVerificar).then(resultados => {
            if (resultados.length > 0) {
                // Se o usuário já tem uma descricao, faz o UPDATE
                var instrucaoSql = `
                    UPDATE usuario
                    SET descricaoUsuario = '${descricao}'
                    WHERE idUsuario = ${idUsuario};
                `;
                return database.executar(instrucaoSql);
            } else {
                // Se o usuário não tem um favorito, faz o INSERT
                var instrucaoSql = `
                    INSERT INTO usuario (idUsuario, descricao) VALUES (${idUsuario}, ${descricao}, 1);
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

function cadastrarComentario(idJogo, idUsuario, comentario) {
    var instrucaoSql = `
        INSERT INTO comentario (fkJogo, fkUsuario, comentario) VALUES (${idJogo}, ${idUsuario}, '${comentario}')
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function resgatarComentarios(idUsuario) {
    var instrucaoSql = `
        SELECT 
        DATE_FORMAT(dtComentario, '%d/%m/%Y') AS dtComentario,
        comentario
        FROM comentario WHERE fkUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar,
    autenticar,
    resgatarDados,
    atualizarDescricao,
    cadastrarComentario,
    resgatarComentarios
};