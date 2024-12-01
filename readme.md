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
('Tênis Esportivo', 10, 150.00),
('Camiseta Casual', 20, 50.00),
('Mochila Escolar', 15, 120.00),
('Relógio Digital', 8, 300.00),
('Fone de Ouvido', 25, 80.00);

UTILIZANDO DBEAVER COM MySQL
