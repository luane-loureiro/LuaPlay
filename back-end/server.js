require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Conectado ao MongoDB');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erro de conexão ao MongoDB:', err);
  });