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

INSERT INTO jogo (nome, descricao, plataforma, genero, dtLancamento, urlBg, urlCapa, urlVideo) VALUES 
('Super Mario World', 
 'Super Mario World segue a jornada de Mario e Luigi no vasto Dinosaur Land para resgatar a Princesa Peach das garras de Bowser. O jogo introduziu o dinossauro Yoshi, que adicionou novas mecânicas como engolir inimigos e cuspir fogo. Com mais de 96 saídas secretas, o jogo incentivava a exploração e se tornou um ícone do Super Nintendo. Curiosidade: Este foi o primeiro jogo a apresentar o Cape Feather, que permite Mario voar.', 
 'Super Nintendo',
 'Plataforma',
 '1990-11-21',
'https://i.pinimg.com/originals/27/0f/ef/270fefff29d824c81d0dd3c145cd8408.jpg',
'https://lh6.googleusercontent.com/proxy/FPug1ST4RBFwEl9SSD3VOuAuupBgXxCEc2vL_gayXDF3cQxC7WqKwfnxUwFe24kW34lS2sJOd7tCAxOxSK3ab0u3N2m2mrfmngjD0XT9L99BDii7Tt2P7fqe48_K35LKTc7B',
'./assets/video/marioGameplay.mp4'),

('The Legend of Zelda: A Link to the Past', 
 'A Link to the Past conta a saga de Link para salvar Hyrule e a Princesa Zelda, viajando entre dois mundos: o luminoso Hyrule e o sombrio Dark World. Este jogo estabeleceu muitos padrões da franquia, incluindo a Master Sword e as masmorras não lineares. Curiosidade: o jogo quase foi lançado como um RPG em turnos para aproveitar o sucesso de Final Fantasy, mas a Nintendo optou pelo estilo de ação e exploração em tempo real.', 
 'Super Nintendo', 
 'Ação e Aventura', 
 '1991-11-21',
 'https://pbs.twimg.com/media/GLDub0eXIAAsu3K?format=jpg&name=large',
 'https://sm.ign.com/ign_br/cover/t/the-legend/the-legend-of-zelda-a-link-to-the-past_x8mn.jpg',
 './assets/video/zeldaGameplay.mp4'),

('Sonic the Hedgehog', 
 'O jogo introduz Sonic, um ouriço azul super-rápido que corre pelos belos cenários de Green Hill Zone e enfrenta o maligno Dr. Robotnik. Sonic foi criado como um mascote para rivalizar com Mario e destacar a potência do Sega Genesis. Curiosidade: O design inicial de Sonic incluía dentes afiados e uma guitarra, mas foi suavizado para agradar ao público mais jovem.', 
 'Sega Genesis', 
 'Plataforma', 
 '1991-06-23',
 'https://i0.wp.com/news.xbox.com/en-us/wp-content/uploads/sites/2/2022/06/ORIGINS_SCREENSHOT_1-10a39355fd1b133be78d.jpg?resize=1920%2C1080&ssl=1',
 'https://s2-techtudo.glbimg.com/q4mEiNnuAjCV5sr8FA7Sh7Re-Uk=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2020/Z/N/eJacbQThSAlwvfBgYhfw/sonic-hedgehog-1991.jpg',
 './assets/video/sonic.mp4'),

('Chrono Trigger', 
 'Com viagens no tempo, batalhas estratégicas e finais alternativos, Chrono Trigger foi criado pela "Dream Team" composta por Hironobu Sakaguchi, Akira Toriyama e Yuji Horii. O jogo apresenta momentos memoráveis, como a reconstrução do mundo em várias eras. Curiosidade: o famoso chefão Lavos foi desenhado para ser derrotado em qualquer ponto do jogo, aumentando o desafio.', 
 'Super Nintendo', 
 'RPG', 
 '1995-03-11',
 'https://c4.wallpaperflare.com/wallpaper/822/246/571/action-anime-chrono-fantasy-wallpaper-preview.jpg',
 'https://preview.redd.it/xtwtloes2z331.jpg?width=640&crop=smart&auto=webp&s=2ed2e0a9847c4df06b0b6250992d2072fdbfd864',
 './assets/video/chronno trigger gameplay.mp4');


CREATE TABLE usuario (
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
email VARCHAR(45) UNIQUE,
senha VARCHAR(45),
descricaoUsuario VARCHAR(500)
);

CREATE TABLE avaliacao (
fkUsuario INT NOT NULL,
fkJogo INT NOT NULL,
nota TINYINT CHECK (nota >= 0 AND nota <= 10),
favorito BOOLEAN DEFAULT FALSE,
dtAvaliacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    
PRIMARY KEY (fkUsuario, fkJogo),
FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
FOREIGN KEY (fkJogo) REFERENCES jogo(idJogo)
);

CREATE TABLE comentario (
idComentario INT AUTO_INCREMENT,
fkJogo INT NOT NULL,
fkUsuario INT NOT NULL,
comentario VARCHAR(500),
dtComentario DATE,

CONSTRAINT pkCompostaComentario PRIMARY KEY (idComentario, fkJogo, fkUsuario),
CONSTRAINT fkJogoComentario FOREIGN KEY (fkJogo) REFERENCES jogo(idJogo),
CONSTRAINT fkUsuarioComentario FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario)
);

