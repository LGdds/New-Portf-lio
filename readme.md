use email;

CREATE TABLE emails (
    id INT AUTO_INCREMENT PRIMARY KEY,
    input_email VARCHAR(255) NOT NULL,
    input_text VARCHAR(255) NOT NULL
);

CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    nome VARCHAR(255) NOT NULL,        
    quantidade INT NOT NULL,           
    preco DECIMAL(10, 2) NOT NULL,     
    total DECIMAL(10, 2) GENERATED ALWAYS AS (quantidade * preco) stored 
);

INSERT INTO produtos (nome, quantidade, preco) VALUES
1	Yeezy Boost 350 V2 'Cream White / Triple White'	1	1200.00	1200.00
2	Travis Scott x Air Jordan 1 Low reverse Mocha	1	10000.00	10000.00
3	Yeezy Boost 350 V2 bone	1	1400.00	1400.00

UTILIZANDO DBEAVER COM MySQL

OBS: Tem que ter a pasta node_modules dentro da API, ter o XAMPP aberto com o MySQL e o apache rodando, e executar o node dentro do arquivo server.js com a opção "reveal in file explorer" e apos o nome api escrever cmd. Dentro do cmd iniciar o servidor com o comando npm start e esperar o banco de dados conectar após isso testar a caixa de texto de email e mensagem e no carrinho de compras.(as imagens do carrinho funcionam apenas quando o servidor esta conectado com o banco de dados e a pagina web).
