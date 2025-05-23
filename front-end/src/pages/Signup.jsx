// src/pages/Signup.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import styles from './Signup.module.css';
import { registerUser } from '../services/api'; // Ajuste o caminho conforme necessário


export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await registerUser(form); // envia para o backend
    console.log('Usuário cadastrado:', response); // 👈 Verifica aqui
    toast.success("Cadastro realizado com sucesso!");
    navigate("/login");
  } catch (err) {
    toast.error("Erro no cadastro: " + err.message);
  }
};

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>AluraFlix</h1>
        <p className={styles.subtitle}>Crie sua conta</p>

        <label htmlFor="name" className={styles.label}>Nome</label>
        <input
          id="name"
          name="name"
          type="text"
          className={styles.input}
          placeholder="Seu nome"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email" className={styles.label}>E-mail</label>
        <input
          id="email"
          name="email"
          type="email"
          className={styles.input}
          placeholder="seu@exemplo.com"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password" className={styles.label}>Senha</label>
        <input
          id="password"
          name="password"
          type="password"
          className={styles.input}
          placeholder="••••••••"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className={styles.button}>Cadastrar</button>

        <p className={styles.footerText}>
          Já tem uma conta?{' '}
          <span
            className={styles.link}
            onClick={() => navigate('/login')}
          >
            Faça login
          </span>
        </p>
      </form>
    </div>
  );
}
