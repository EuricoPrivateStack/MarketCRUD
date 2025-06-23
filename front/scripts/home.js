window.addEventListener("DOMContentLoaded", async () => {

    try {
        const resposta = await fetch("http://localhost:8080/merch", {
            method: "GET",
            credentials: "include"
        });

        if (resposta.status !== 200) {
            alert("Acesso não autorizado!");
            window.location.href = "../pages/login.html";
            return
        }

        const mercadorias = await resposta.json();

        const lista = document.getElementById("mercadorias");

        mercadorias.forEach(mercadoria => {
            const item = document.createElement("li");
            item.textContent = `${mercadoria.nome} - R$ ${mercadoria.valor}`;
            lista.appendChild(item);
        });
    } catch (error) {
        console.log(error);
        alert("Ocorreu um erro ao tentar se conectar ao servidor. Tente novamente mais tarde.");
        // window.location.href = "../index.html";
    }
});

