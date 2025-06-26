window.addEventListener("pageshow", async () => {
    try {
        // const resposta = await fetch(`${API_URL}/merch` , {
        //     method: "GET",
        //     credentials: "include"
        // });
        //
        // if (resposta.status !== 200) {
        //     alert("Acesso não autorizado!");
        //     window.location.href = "../pages/login.html";
        //     return
        // }

        const lista = document.getElementById("mercadorias");
        lista.innerHTML = "";

        const mercadorias = [
            { nome: "Camiseta", valor: 100.0 },
            { nome: "Caneca", valor: 50.0 }
        ];

        mercadorias.forEach(mercadoria => {
            const item = document.createElement("li");
            item.classList.add("mercadoria-item");

            const nomeSpan = document.createElement("span");
            nomeSpan.classList.add("mercadoria-nome");
            nomeSpan.textContent = mercadoria.nome;

            const valorSpan = document.createElement("span");
            valorSpan.classList.add("mercadoria-valor");
            valorSpan.textContent = `R$ ${mercadoria.valor.toFixed(2)}`;

            const botaoEditar = document.createElement("button");
            botaoEditar.classList.add("botao-editar");

            const iconeEditar = document.createElement("img");
            iconeEditar.src = "../assets/more.png";
            iconeEditar.alt = "...";
            iconeEditar.classList.add("icone-botao");

            botaoEditar.appendChild(iconeEditar);
            item.appendChild(nomeSpan);
            item.appendChild(valorSpan);
            item.appendChild(botaoEditar);
            lista.appendChild(item);
        });

    } catch (error) {
        console.log(error);
        alert("Ocorreu um erro ao tentar se conectar ao servidor. Tente novamente mais tarde.");
        // window.location.href = "../index.html";
    }
});

