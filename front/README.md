# MarketCRUD-front
Um projeto frontend simples, com intuito apenas de apredizado, feito com html, css e javascript vanila!

## Deploy
O projeto fullstack esta hospedado no meu homelab, e pode ser acessado atraves do seguinte link: [MarketCRUD](https://mc.euricopersonal.info/) <br>
Link para repositorio do backend: [MarketCRUD-api](https://github.com/Eurico149/MarketCRUD-api.git)

## Como Rodar
Basta ter o Docker compose instalado e rodar os seguintes comandos:
``` sh
# Clonagem dos repositorios
git clone https://github.com/Eurico149/MarketCRUD-front.git
cd MarketCRUD-front

# Inicialização dos containers
docker compose up -d

echo "Running on: http://localhost:8080"
```

Para parar os containers e remover os volumes, basta rodar na raiz do projeto o seguinte comando:
``` sh
docker compose down -v
```

## Estrutura
```
MarketCRUD-front/
├── assets/
├── pages/
├── scripts/
│    └── auth/
├── styles/
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── index.html
├── nginx.conf
└── README.md
```