CREATE DATABASE pixel_vault;
USE pixel_vault;

CREATE TABLE jogo (
idJogo INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
descricao VARCHAR(500),
plataforma VARCHAR(45),
genero VARCHAR(45),
dtLancamento DATE,
urlBg VARCHAR(255),
urlCapa VARCHAR(255),
urlVideo VARCHAR(255)
);

CREATE TABLE usuario (
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
email VARCHAR(45),
senha VARCHAR(45),
descricaoUsuario VARCHAR(500)
);

CREATE TABLE avaliacao (
fkUsuario INT NOT NULL,
fkJogo INT NOT NULL,
nota TINYINT CHECK (nota >= 0 AND nota <= 10),
favorito BOOLEAN DEFAULT FALSE,
comentario VARCHAR(500),
dtAvaliacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    
PRIMARY KEY (fkUsuario, fkJogo),
FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
FOREIGN KEY (fkJogo) REFERENCES jogo(idJogo)
);