# MarketCRUD-front
Um projeto frontend simples, com intuito apenas de apredizado, feito com html, css e javascript vanila!

## Deploy
O projeto fullstack esta hospedado no meu homelab, e pode ser acessado atraves do seguinte link: [MarketCRUD](https://mc.euricopersonal.info/) <br>
Link para repositorio do backend: [MarketCRUD-api](https://github.com/Eurico149/MarketCRUD-api.git)

## Como Rodar
Basta ter o Docker instalado e rodar os seguintes comandos:
``` sh
# Clonagem dos repositorios
mkdir MarketCRUD
cd MarketCRUD
git clone https://github.com/Eurico149/MarketCRUD-front.git
git clone https://github.com/Eurico149/MarketCRUD-api.git

# Criando e executando a imagem do frontend
docker build -t marketcrud-front ./MarketCRUD-front
docker run -d --name marketcrud-front -p 8080:80 marketcrud-front

# Criando e executando a imagem do backend
cd MarketCRUD-api
docker compose up -d --build
cd ../../
echo "Running on: http://localhost:8080"
```

Para parar os containers e remover os volumes, basta rodar dentro da pasta `MarketCRUD` os seguinte comando:
``` sh
cd MarketCRUD-api
docker compose down -v

docker stop marketcrud-front
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
├── Dockerfile
├── index.html 
└── README.md
```