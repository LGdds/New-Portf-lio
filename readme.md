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
