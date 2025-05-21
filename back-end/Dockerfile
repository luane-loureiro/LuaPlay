# Use Node 18 LTS
FROM node:18

# Define diretório de trabalho
WORKDIR /usr/src/app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do código
COPY . .

# Expõe porta padrão
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
