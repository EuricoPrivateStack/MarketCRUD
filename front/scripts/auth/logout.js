const logout = document.getElementById("logout");

logout.addEventListener("click", async (event) => {
    event.preventDefault();

    try {
        const resposta = await fetch(`${API_URL}/auth/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        if (resposta.status === 200) window.location.href = "../../index.html";
    } catch (error) {
        console.log(error);
        alert("Ocorreu um erro ao tentar se conectar ao servidor. Tente novamente mais tarde.");
    }
});