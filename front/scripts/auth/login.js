const login = document.getElementById("login");

login.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "" || password === "") return alert("Preencha todos os campos!");

    const dados = {
        username: username,
        password: password
    };

    try {
        const resposta = await fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados),
            credentials: "include"
        });

        if (resposta.status !== 200) alert("Usuário ou senha inválidos!");
        else window.location.href = "../../pages/home.html";
    } catch (error) {
        console.log(error);
        alert("Ocorreu um erro ao tentar se conectar ao servidor. Tente novamente mais tarde.");
    }


});