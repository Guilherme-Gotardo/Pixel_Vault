CREATE DATABASE pixel_vault;
USE pixel_vault;

CREATE TABLE jogo (
idJogo INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
descricao VARCHAR(200),
plataforma VARCHAR(45),
dtLancamento DATE,
urlBg VARCHAR(255),
urlCapa VARCHAR(255)
);

INSERT INTO jogo (nome, descricao) VALUES 
('Chronno Trigger', 'Jogo de RPG'),
('Super Mario World', 'Jogo de Plataforma');
