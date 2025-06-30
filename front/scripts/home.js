let mercadorias = [];

window.addEventListener("pageshow", async () => {
    try {
        await buscarMercadorias();

        exibirMercadorias(mercadorias);

    } catch (error) {
        console.log(error);
        alert("Ocorreu um erro ao tentar se conectar ao servidor. Tente novamente mais tarde.");
    }
});

document.getElementById("filtro").addEventListener("input", (e) => {
    const texto = e.target.value.toLowerCase();
    const filtradas = mercadorias.filter(m =>
        m.nome.toLowerCase().includes(texto)
    );
    exibirMercadorias(filtradas);
});

async function buscarMercadorias() {
    const resposta = await fetch(`${API_URL}/merch`, {
        method: "GET",
        credentials: "include"
    });

    if (resposta.status !== 200) {
        alert("Acesso não autorizado!");
        window.location.href = "../pages/login.html";
        return;
    }

    mercadorias = await resposta.json();
}

function exibirMercadorias(listaDeMercadorias) {
    const lista = document.getElementById("mercadorias");
    lista.innerHTML = "";

    listaDeMercadorias.forEach(mercadoria => {
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
}


const addMerch = document.getElementById("add");

addMerch.addEventListener("click", () => {
    if (document.getElementById("overlay")) return;

    const overlay = document.createElement("div");
    overlay.id = "overlay";
    overlay.style.position = "fixed";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.background = "rgba(0, 0, 0, 0.6)";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";

    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.style.background = "#f2f2f2";
    modal.style.padding = "1rem";
    modal.style.borderRadius = "1rem";
    modal.style.boxShadow = "0 0 1rem rgba(0, 0, 0, 0.4)";
    modal.innerHTML = `
    <div class="add-namevalue">
      <input id="add-nome" type="text" placeholder="Nome">
      <div>
          <label>R$</label>
          <input id="add-valor" type="number" placeholder="Valor">
      </div>
    </div>
    <div class="add-descricao">
      <textarea id="add-descricao" placeholder="Descrição"></textarea>
    </div>
    <div class="add-butons">
        <button id="fecharModal" class="fechar-modal">Fechar</button>
        <button id="adicionar" class="botao-adicionar">Adicionar</button>
    </div>
  `;

    modal.querySelector("#fecharModal").addEventListener("click", () => {
        overlay.remove();
    });


    modal.querySelector("#adicionar").addEventListener("click", async () => {
        const nome = document.getElementById("add-nome").value;
        const valor = document.getElementById("add-valor").value;
        const descricao = document.getElementById("add-descricao").value;

        if (!nome || !valor || !descricao) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        const merch = {
            nome: nome,
            valor: parseFloat(valor),
            descricao: descricao
        };

        try {
            const resposta = await fetch(`${API_URL}/merch`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(merch),
                credentials: "include"
            });

            if (resposta.status === 401) {
                alert("Acesso não autorizado!");
                window.location.href = "../pages/login.html";
                return;
            }

            if (resposta.status === 200) {
                alert("Nome de Produto inválido!");
                return;
            }

            mercadorias.push(merch);

            exibirMercadorias(mercadorias);

            overlay.remove();

        } catch (error) {
            console.error(error);
            alert("Erro ao conectar com o servidor.");
        }
    });

    overlay.appendChild(modal);
    document.body.appendChild(overlay);
});

