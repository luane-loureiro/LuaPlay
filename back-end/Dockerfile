FROM node:18

# Define diretório de trabalho no container
WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia todo o restante (inclusive o .env)
COPY . .

# Expõe a porta da aplicação
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
