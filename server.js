// Incluir as informações de serviço e transição de HTTP utilizando a biblioteca do express (instalada com npm install --save express)
const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000 // declarando a porta local que vamos utilizar na máquina 
const server = http.createServer(app);
server.listen(port); // declarar qual porta o servidor vai escutar 
// localhost:3000 para quando eu for vizualizar em qual serviço o meu servidor vai estar procurando 


