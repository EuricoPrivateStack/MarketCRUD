window.refresh = async function refresh() {
    const resposta = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include"
    });

    return resposta.status === 200;
}