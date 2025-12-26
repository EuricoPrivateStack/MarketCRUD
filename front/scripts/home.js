let mercadorias = [];

window.addEventListener("DOMContentLoaded", async () => {
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
    let resposta = await fetch(`${API_URL}/merch`, {
        method: "GET",
        credentials: "include"
    });

    if (resposta.status !== 200) {
        if (!(await refresh())) {
            alert("Acesso não autorizado!");
            window.location.href = "../pages/login.html";
            return;
        }

        resposta = await fetch(`${API_URL}/merch`, {
            method: "GET",
            credentials: "include"
        });
    }

    if (resposta.status !== 200) {
        throw new Error("Erro ao buscar mercadorias.");
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
        botaoEditar.id = "editar:" + mercadoria.nome;

        const iconeEditar = document.createElement("img");
        iconeEditar.src = "../assets/more.svg";
        iconeEditar.alt = "...";
        iconeEditar.classList.add("icone-botao");

        botaoEditar.appendChild(iconeEditar);
        item.appendChild(nomeSpan);
        item.appendChild(valorSpan);
        item.appendChild(botaoEditar);
        lista.appendChild(item);


        botaoEditar.addEventListener("click", () => {
            const overlay = createOverlay();

            const modal = createModal("Editar");

            modal.querySelector("#fecharModal").addEventListener("click", () => {
                overlay.remove();
            });

            modal.querySelector("#add-nome").value = mercadoria.nome;
            modal.querySelector("#add-valor").value = mercadoria.valor;
            modal.querySelector("#add-descricao").value = mercadoria.descricao;

            modal.querySelector("#botao-deletar").addEventListener("click", async () => {
                if (!confirm("Tem certeza que deseja excluir este produto?")) return;

                try {
                    let resposta = await fetch(`${API_URL}/merch/${mercadoria._id}`, {
                        method: "DELETE",
                        credentials: "include"
                    });

                    if (resposta.status === 401) {
                        if(!await refresh()) {
                            alert("Acesso não autorizado!");
                            window.location.href = "../pages/login.html";
                            return;
                        }

                        resposta = await fetch(`${API_URL}/merch/${mercadoria._id}`, {
                            method: "DELETE",
                            credentials: "include"
                        });
                    }

                    if (resposta.status !== 200) {
                        alert("Erro ao excluir o produto.");
                        return;
                    }

                    mercadorias = mercadorias.filter(m => m._id !== mercadoria._id);

                    exibirMercadorias(mercadorias);

                    overlay.remove();

                } catch (error) {
                    console.error(error);
                    alert("Erro ao conectar com o servidor.");
                }
            })


            modal.querySelector("#Editar").addEventListener("click", async () => {
                const nome = modal.querySelector("#add-nome").value
                const valor = modal.querySelector("#add-valor").value
                const descricao = modal.querySelector("#add-descricao").value

                if (!nome || !valor || !descricao) {
                    alert("Preencha todos os campos.");
                    return;
                }

                const merch = {
                    nome: nome,
                    valor: parseFloat(valor),
                    descricao: descricao
                };

                try {
                    let resposta = await fetch(`${API_URL}/merch/${mercadoria._id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(merch),
                        credentials: "include"
                    });

                    if (resposta.status === 401) {
                        if(!await refresh()) {
                            alert("Acesso não autorizado!");
                            window.location.href = "../pages/login.html";
                            return;
                        }

                        resposta = await fetch(`${API_URL}/merch/${mercadoria._id}`, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(merch),
                            credentials: "include"
                        });
                    }

                    if (resposta.status !== 200) {
                        alert("Nome ja em Uso!");
                        return;
                    }

                    mercadorias = mercadorias.map(m => {
                        if (m._id === mercadoria._id) {
                            return {
                                ...m,
                                nome: merch.nome,
                                valor: merch.valor,
                                descricao: merch.descricao
                            };
                        }
                        return m;
                    });

                    exibirMercadorias(mercadorias);

                    overlay.remove();

                } catch (error) {
                    console.error(error);
                    alert("Erro ao conectar com o servidor.");
                }
            })

            overlay.appendChild(modal);
            document.body.appendChild(overlay);
        });
    });
}

function createOverlay(){
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

    return overlay;
}

function createModal(aux){
    const modal = document.createElement("div");
    modal.classList.add("modal-add");
    modal.style.background = "#f2f2f2";
    modal.style.padding = "1rem";
    modal.style.borderRadius = "1rem";
    modal.style.boxShadow = "0 0 1rem rgba(0, 0, 0, 0.4)";
    modal.style.position = "relative";
    modal.innerHTML = `
        ${aux === "Editar" ? `
            
            <button id="botao-deletar" title="Excluir" class="botao-deletar">
                <img src="../assets/trash.svg" alt="Excluir" style="width: 2rem; height: 2rem;">
            </button>
        ` : ""}
        
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
            <button id="${aux}" class="botao-adicionar">${aux}</button>
        </div>
    `;

    return modal;
}


const addMerch = document.getElementById("add");

addMerch.addEventListener("click", () => {

    const overlay = createOverlay();

    const modal = createModal("Adicionar");

    modal.querySelector("#fecharModal").addEventListener("click", () => {
        overlay.remove();
    });


    modal.querySelector("#Adicionar").addEventListener("click", async () => {
        const nome = document.getElementById("add-nome").value;
        const valor = document.getElementById("add-valor").value;
        const descricao = document.getElementById("add-descricao").value;

        if (!nome || !valor || !descricao) {
            alert("Preencha todos os campos.");
            return;
        }

        const merch = {
            nome: nome,
            valor: parseFloat(valor),
            descricao: descricao
        };

        try {
            let resposta = await fetch(`${API_URL}/merch`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(merch),
                credentials: "include"
            });

            if (resposta.status === 401) {
                if(!await refresh()) {
                    alert("Acesso não autorizado!");
                    window.location.href = "../pages/login.html";
                    return;
                }

                resposta = await fetch(`${API_URL}/merch`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(merch),
                    credentials: "include"
                });
            }

            if (resposta.status !== 201) {
                alert("Nome de Produto inválido!");
                return;
            }

            mercadorias.push(await resposta.json());

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
