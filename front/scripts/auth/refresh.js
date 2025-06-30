window.refresh = async function refresh() {
    try {
        const resposta = await fetch(`${API_URL}/auth/refresh`, {
            method: "POST",
            credentials: "include"
        });

        return resposta.status === 401;
    } catch (error) {
        console.error(error);
        alert("Erro ao conectar com o servidor.");
    }

}