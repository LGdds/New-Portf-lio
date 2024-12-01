async function carregarProdutos() {
    const feedback = document.getElementById("feedback");
    const container = document.getElementById("carrinho");
    const totalGeralDiv = document.getElementById("totalGeral"); // Seleciona a div do total geral
    let totalGeral = 0; // Variável para acumular o total geral

    const images = [
        {id: 1, name: "./images/tenis3.jpeg"},
        {id: 2, name: "./images/tenis1.jpeg"},
        {id: 3, name: "./images/tenis3.jpeg"},
    ];

    try {
        feedback.textContent = 'Carregando produtos...';
        const response = await fetch('http://localhost:3000/get-produtos', {
            method: "GET"
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar produtos, status: ' + response.status);
        }

        const produtos = await response.json();
        feedback.textContent = '';

        console.log(produtos);
        produtos.forEach(produto => {
            // Garantir que preco seja um número
            const preco = parseFloat(produto.preco);
            if (isNaN(preco)) {
                console.error(`Preço inválido para o produto ${produto.nome}`);
                return;
            }

            // Seleciona a imagem correspondente ao produto com base no ID
            const produtoImagem = images.find(img => img.id === produto.id);
            const imagemProduto = produtoImagem ? produtoImagem.name : "./images/tenis3.jpeg"; // Fallback para imagem padrão

            const produtoDiv = document.createElement("div");
            produtoDiv.className = 'produto';
            produtoDiv.innerHTML = `
                <img src="${imagemProduto}" alt="${produto.nome}">
                <h2>${produto.nome}</h2>
                <p>Preço: R$ ${preco.toFixed(2)}</p>
                <label for="quantidade-${produto.id}">Quantidade:</label>
                <input 
                    type="number" 
                    id="quantidade-${produto.id}" 
                    value="${produto.quantidade}" 
                    min="1"
                    data-id="${produto.id}" 
                >
                <p>Total: R$ ${(produto.quantidade * preco).toFixed(2)}</p>
            `;

            // Adiciona evento para atualizar quantidade
            const inputQuantidade = produtoDiv.querySelector(`#quantidade-${produto.id}`);
            inputQuantidade.addEventListener("change", async (event) => {
                const novaQuantidade = event.target.value;
                const idProduto = event.target.getAttribute("data-id");

                try {
                    const updateResponse = await fetch("http://localhost:3000/update-quantidade", {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ id: idProduto, quantidade: novaQuantidade })
                    });

                    if (!updateResponse.ok) {
                        throw new Error("Erro ao atualizar quantidade.");
                    }

                    const resultado = await updateResponse.json();
                    console.log(resultado.message);

                    // Atualizar o total
                    const total = (novaQuantidade * preco).toFixed(2);
                    produtoDiv.querySelector("p:nth-of-type(2)").textContent = `Total: R$ ${total}`;

                    // Atualiza o total geral
                    atualizarTotalGeral();
                } catch (error) {
                    console.error("Erro ao atualizar quantidade:", error);
                }
            });

            // Acumula o total
            totalGeral += produto.quantidade * preco;

            container.appendChild(produtoDiv);
        });

        // Exibe o total geral inicialmente
        totalGeralDiv.querySelector("h2").textContent = `Total Geral: R$ ${totalGeral.toFixed(2)}`;
        
    } catch (error) {
        feedback.textContent = 'Erro ao carregar produtos. Por favor, tente novamente mais tarde.';
        console.error('Erro ao carregar produtos:', error);
    }

    // Função para atualizar o total geral quando a quantidade for alterada
    function atualizarTotalGeral() {
        totalGeral = 0; // Reseta o total
        document.querySelectorAll('.produto').forEach(produtoDiv => {
            const preco = parseFloat(produtoDiv.querySelector('p').textContent.replace('Preço: R$ ', '').replace(',', '.'));
            const quantidade = parseInt(produtoDiv.querySelector('input').value, 10);
            totalGeral += preco * quantidade; // Acumula o total
        });

        // Atualiza o total na div totalGeral
        totalGeralDiv.querySelector("h2").textContent = `Total Geral: R$ ${totalGeral.toFixed(2)}`;
    }
}

carregarProdutos();
function alerta(){
    alert("Compra finalizada com sucesso!");
}