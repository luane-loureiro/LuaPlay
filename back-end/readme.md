# LuaPlay API

API de streaming de músicas e vídeos, com gerenciamento de usuários, playlists, mídias e categorias.

---

## 🔗 Links

- Documentação Swagger: `http://localhost:3000/api-docs`
- Repositório GitHub: [seu-link-aqui](https://github.com/luane-loureiro/LuaPlay)

---

## 🚀 Tecnologias
- **Node.js** + **Express**
- **MongoDB** (Mongoose)
- **JWT** para autenticação
- **Docker** (opcional)
- **Swagger** para documentação
- **Jest** / **Supertest** para testes

---

## 🛠️ Pré-requisitos

- Node.js ≥ 16  
- MongoDB rodando localmente ou em serviço remoto  
- (Opcional) Docker e Docker-Compose  

---

## ⚙️ Instalação

1. Clone o repositório  
   ```bash
   git clone https://github.com/luane-loureiro/LuaPlay.git
   cd luaplay-api

2. Instale as dependências

   ```bash
Copiar
Editar
npm install

3. Crie um arquivo de variáveis de ambiente .env na raiz, seguindo o exemplo .env.example:

   ```env
Copiar
Editar
PORT=3000
MONGO_URI=mongodb://localhost:27017/luaplay
JWT_SECRET=sua_chave_secreta

## 📦 Executar
   ```bash
npm start

 ```Docker
bash
Copiar
Editar
docker-compose up --build

## 📄 API
Swagger UI: http://localhost:3000/api-docs

Lá você encontra todos os endpoints, schemas e exemplos de requisição/resposta.

