const User = require('../models/User');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if(!email || !password) return res.status(400).json({ message: 'E-mail e senha necessários' });

    const userExists = await User.findOne({ email });
    if(userExists) return res.status(409).json({ message: 'O usuário já existe' });

    const user = new User({ email, password });
    await user.save();

    res.status(201).json({ message: 'Usuário Criado com Sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro no Servidor', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if(!email || !password) return res.status(400).json({ message: 'E-mail e senha necessários' });

    const user = await User.findOne({ email });
    if(!user) return res.status(401).json({ message: 'Login inválido' });

    const isMatch = await user.comparePassword(password);
    if(!isMatch) return res.status(401).json({ message: 'Login inválido' });

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Erro no Servidor', error: err.message });
  }
};
