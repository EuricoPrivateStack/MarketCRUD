const cadastrar = document.getElementById("Cadastro");

cadastrar.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const passwordC= document.getElementById("passwordComfirmacao").value;

    if (username === "" || password === "" || passwordC === "") return alert("Preencha todos os campos!");

    if (passwordC !== password) return alert("As senhas não coincidem!");

    const dados = {
        username: username,
        password: password
    };

    try {
        const resposta = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });

        if (resposta.status === 201) window.location.href = "../../pages/login.html";
        else alert("Username já existe!");
    } catch (error) {
        console.log(error);
        return alert("Ocorreu um erro ao tentar se conectar ao servidor. Tente novamente mais tarde.");
    }


});