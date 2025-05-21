require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');  // Importa o app já criado com express e rotas
const { swaggerUi, specs } = require('./swagger'); 

// Configura o Swagger usando o app já importado
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/streamingdb';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Conectado ao MongoDB');
    app.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`));
  })
  .catch(err => {
    console.error('Erro de conexão ao MongoDB:', err);
  });
